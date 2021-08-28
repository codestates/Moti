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
      advice: '훌륭한 사람과 어리석은 사람의 차이는 불과 한 걸음 차이다.',
      author: '나폴레옹',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '탐욕은 일체를 얻고자 욕심내어서 도리어 모든 것을 잃어버린다.',
      author: '몽테뉴',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: 'stay hungry, stay foolish',
      author: '스티브 잡스',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '백 권의 책에 쓰인 말보다, 한 가지 성실한 마음이 더 크게 사람을 움직인다.',
      author: '스티브 잡스',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '최대 다수의 최대 행복을 얻는 행동이 최선이다.',
      author: '허치슨',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '돈이 없는 것은 슬픈 일이다. 하지만 남아도는 것은 그 두 배나 슬픈일이다.',
      author: '톨스토이',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '오늘이라는 날은 두 번 다시 오지 않는다는 것을 잊지 말라',
      author: '단테',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '만약 제군이 돈의 가치를 알고 싶으면 나가서 얼마간의 돈을 빌려 보라',
      author: '프랭클린',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      advice: '할 수 있는 한 훌륭한 인생을 만들라. 인생은 짧고 곧 지나간다.',
      author: '오울디즈',
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
