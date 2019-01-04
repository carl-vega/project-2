module.exports = function(sequelize, DataTypes) {
   var TicTacToe = sequelize.define("TicTacToe", {
     text: DataTypes.STRING,
     description: DataTypes.TEXT
   });
   return TicTacToe;
 };
 