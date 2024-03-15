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
    static associate(models) {
      User.hasMany(models.Game, { foreignKey: 'userId' });
      // belongsMa
      User.belongsToMany(models.Game, { through: models.Participation, foreignKey: 'userId',
        as: 'rounds' });
        User.hasMany(models.Participation, {foreignKey: 'userId'});  
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};