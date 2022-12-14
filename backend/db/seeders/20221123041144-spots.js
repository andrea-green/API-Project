'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId:1,
        address:'123 Avenue',
        city:'Lehman Township',
        state:'Pennsylvania',
        country:'United States',
        lat:41.108130,
        lng:-75.036468,
        name:'The Bushkill House',
        description:'The Bushkill House is a mountain escape located in the heart of the Poconos.',
        price:130
      },
      {
        ownerId:2,
        address:'45 Street',
        city:'Denver',
        state:'Colorado',
        country:'United States',
        lat:39.750305,
        lng:-104.984630,
        name:'Colter Cottage',
        description:'Welcome to the Colter Cottage - urban cottage meets European charm.',
        price:150
      },
      {
        ownerId:3,
        address:'67 Road',
        city:'Bushkill',
        state:'Pennsylvania',
        country:'United States',
        lat:41.119569,
        lng:-75.055324,
        name:'Ridge House',
        description: 'The Ridge House is a mountain escape located in the heart of the Poconos.',
        price:143
      }
    ],{});
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Spots';
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options,{
    id: { [Op.in]: [1,2,3]}
   },{});
  }
};
