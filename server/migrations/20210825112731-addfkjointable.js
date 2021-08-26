'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint('Post_emotions', {
      fields: ['Post_Id'],
      type: 'foreign key',
      name: 'FK_Post',
      references: {
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('Post_emotions', {
      fields: ['emotion_Id'],
      type: 'foreign key',
      name: 'FK_emotion',
      references: {
        table: 'emotions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('Post_emotions', 'FK_Post');
     await queryInterface.removeConstraint('Post_emotions', 'FK_emotion');
  }
};
