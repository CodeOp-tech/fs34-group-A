'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     // game belongs to user and has many participants
    static associate(models) {
      Game.belongsTo(models.User, { foreignKey: 'userId' });
      Game.belongsToMany(models.User, {
        through: models.Participation,
        foreignKey: 'gameId',
        as: 'players'
      });
      // game belongs to many users through participants
    }
  }
  Game.init({
    solution: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};