'use strict';
//SEEDER IS USED TO HAVE DEMO INPUT IN DATABASE TO CHECK
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('usera', [{
      name: 'John Doe',
      email: "john@eamil.com",
      uuid: "ffd3cd39-38f9-4ea3-b694-2dd53459a6d5",
      role: "developer",
      createdAt:"2023-02-01 12:35:35.659+05:30",
      updatedAt:"2023-02-01 12:35:35.659+05:30"
    },{
      name: 'Jene Doe',
      email: "jene@eamil.com",
      uuid: "ffd3cd39-38f9-4ea3-b694-2dd55419a6d5",
      role: "admin",
      createdAt:"2023-02-01 12:35:35.659+05:30",
      updatedAt:"2023-02-01 12:35:35.659+05:30"
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * 
     */
    //mention the table name in which you want to insert the data here user
    await queryInterface.bulkDelete('users', null, {});
  }
};
