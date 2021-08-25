'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('RandomAdvices', [{
      advice: '너 자신을 알라.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '유튜브 볼 때가 아니다.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: 'stay hungry, stay foolish',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('RandomAdvices', null, {});
  }
};
