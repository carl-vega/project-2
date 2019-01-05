//winning combinations
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

function newBoard() {
   let gameArray = [];
   for(let i=0; i<9; i++) {
      gameArray.push("");
   }
   return gameArray;
}

function checkWin() {

}
function displayBoard(gameBoard) {
   $("#board tr td").each( (index) => {
      $("tr #"+index).text(gameBoard[index]);
   });
}

//function to initialize gameplay
function main() {
   let move = 0;  //max 8 moves
   let play = true;
   let turn = true;

   //init Array for new game
   let gameBoard = newBoard();
   console.log(gameBoard); 

   $("#board tr td").click(function() {
      if (gameBoard[$(this).attr("id")] === "" && play) {
        if ((move%2)==1) {
         gameBoard[$(this).attr("id")] = "O";
         console.log(gameBoard);
         displayBoard(gameBoard);   
        } 
        else { 
         gameBoard[$(this).attr("id")] = "X";
         console.log(gameBoard);
         displayBoard(gameBoard);
        }
        move++;
      }
    });

   $("#reset").click(function() {
      if(!play) {
         $("#board tr td").text("");
      }
   });
}

$(document).ready(function(){
   main();
});