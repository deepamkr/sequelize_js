'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post,{foreignKey:'userId',as:'posts'})
    }
    toJSON(){
      return { ...this.get(),id: undefined}
    }
  }
  User.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //validators in controller level
      //parent child model
      //new task for typescript
      // make a array for array
      //check for user deleted then post is deleted
      //3 field status  message data
      validate:{
        notNull: { msg : 'User must have a name'},
        notEmpty: { msg : 'Name must not be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: { msg : 'User must have a email'},
        notEmpty: { msg : 'Email must not be empty'},
        isEmail:{ msg: 'Must be a valid email address'}
      }
    },
    role: {
     
      type: DataTypes.STRING,
      allowNull: false,
      notNull: { msg : 'User must have a role'},
      notEmpty: { msg : 'Role must not be empty'}
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};