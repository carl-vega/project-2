module.exports = function(sequelize, DataTypes) {
  const TicTacToe = sequelize.define("TicTacToe", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return TicTacToe;
};
