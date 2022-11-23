'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options,[
      {
        spotId:1,
        userId:1,
        review:"Cozy and warm!",
        stars:5
      },
      {
        spotId:2,
        userId:2,
        review:"We had an amazing time. The place is beautiful and a great location.",
        stars:5
      },
      {
        spotId:3,
        userId:3,
        review:"Great place to stay when exploring Bushkill Falls!",
        stars:5
      }
    ],{})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options,{
    id: { [Op.in]: [1,2,3]}
   },{});

  }
};
