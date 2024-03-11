'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // participant belongs to a user and belongs to a game
    static associate(models) {
      Participation.belongsTo(models.User, { foreignKey: 'userId' });
      Participation.belongsTo(models.Game, { foreignKey: 'gameId' });
    }
  }
  Participation.init({
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    startedAt: DataTypes.DATE,
    completedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Participation',
  });
  return Participation;
};