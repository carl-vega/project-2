module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    online: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
  });
  return User;
};
