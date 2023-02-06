const express= require('express')
const { sequelize,User,Post }= require('./models')

const app= express()
app.use(express.json())
app.post('/user',async(req,res)=>{
    const {name,email,role}= req.body
    try{
        const user =await User.create({name,email,role})
        return res.json(user)
    }
    catch(err){
            console.log(err)
            return res.status(500).json(err)
    }
})
//read
app.get('/user',async(req,res)=>{
    try{
        const user= await User.findAll()
        return res.json(user)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong!'})
    }
})
//find one
app.get('/user/:uuid',async(req,res)=>{
    const uuid =req.params.uuid
    try{
        const user= await User.findOne({
            where:{uuid: uuid},
            include:'posts'
        })
        return res.json(user)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong!'})
    }
})
//delete for a user
app.delete('/user/:uuid',async(req,res)=>{
    const uuid =req.params.uuid
    try{
        const user= await User.findOne({
            where:{uuid: uuid}
        })
        await user.destroy()
        return res.json({message:' User deleted'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong!'})
    }
})
//update
app.put('/user/:uuid',async(req,res)=>{
    const uuid =req.params.uuid
    const {name,email,role}= req.body
    try{
        const user= await User.findOne({ where:{uuid: uuid}})
        
        user.name=name
        user.email=email
        user.role=role
        await user.save()
        res.status(200).json({message:"User Updated"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: 'Something went wrong!'})
    }
})
//for posts to create post
app.post('/posts',async(req,res)=>{
    const {userUuid,body}=req.body
    try{
        const user =await  User.findOne({Where:{uuid:userUuid}})
        const post= await Post.create({body,userId:user.id})
        return res.json(post)

    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//get all post
app.get('/post',async(req,res)=>{
    
    try{
        
        // const post= await Post.findAll({include :[ {model:User,as:'user'} ] } )
        const post= await Post.findAll({include :'user'} )
        return res.json(post)

    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
app.listen({port:5000},async()=>{
    console.log('Server up on http://localhost:5000/user')
    await sequelize.authenticate()
    console.log('Database Connected!')
})
    
