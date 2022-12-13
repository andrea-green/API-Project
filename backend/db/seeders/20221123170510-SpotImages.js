'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options,[
      {
        spotId:1,
        url:'https://a0.muscache.com/im/pictures/feeb336d-f553-4585-8ae7-797c6e6878e9.jpg?im_w=1200',
        preview:true,
      },
      {
        spotId:2,
        url:'https://a0.muscache.com/im/pictures/590c3404-1cc2-4738-a934-6f41098bf612.jpg?im_w=1200',
        preview:true,
      },
      {
        spotId:3,
        url:'https://a0.muscache.com/im/pictures/a41e07a6-72ac-4795-94b4-5ca75751c116.jpg?im_w=1440',
        preview:true,
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options,{
    id: { [Op.in]: [1,2,3]}
   },{});

  }
};
