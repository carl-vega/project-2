//winning combinations

function newBoard() {
   let gameArray = [];
   for(let i=0; i<9; i++) {
      gameArray.push("");
   }
   return gameArray;
}

function checkForWinner() {
   var space1 = $("#board tr:nth-child(1) td:nth-child(1)").text();
   var space2 = $("#board tr:nth-child(1) td:nth-child(2)").text();
   var space3 = $("#board tr:nth-child(1) td:nth-child(3)").text();
   var space4 = $("#board tr:nth-child(2) td:nth-child(1)").text();
   var space5 = $("#board tr:nth-child(2) td:nth-child(2)").text();
   var space6 = $("#board tr:nth-child(2) td:nth-child(3)").text();
   var space7 = $("#board tr:nth-child(3) td:nth-child(1)").text();
   var space8 = $("#board tr:nth-child(3) td:nth-child(2)").text();
   var space9 = $("#board tr:nth-child(3) td:nth-child(3)").text();
   // check rows
   if      ((space1==space2) && (space2==space3)) { return space3; }
   else if ((space4==space5) && (space5==space6)) { return space6; }	
   else if ((space7==space8) && (space8==space9)) { return space9; }
   // check columns
   else if ((space1==space4) && (space4==space7)) { return space7; }
   else if ((space2==space5) && (space5==space8)) { return space8; }
   else if ((space3==space6) && (space6==space9)) { return space9; }
   // check diagonals
   else if ((space1==space5) && (space5==space9)) { return space9; }
   else if ((space3==space5) && (space5==space7)) { return space7; }
   // no winner
   return -1;
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
   displayBoard(gameBoard);
   $("#reset").click(function() {
      main();

   });
   $("#board tr td").click(function() {
      if (gameBoard[$(this).attr("id")] === "" && play) {
        if ((move%2)==1) {
         gameBoard[$(this).attr("id")] = "O";
         displayBoard(gameBoard);
         move++
         if (checkForWinner()!=-1 && checkForWinner()!="") { 
            if (checkForWinner()=="X") { $("#alert").text("Player 1 wins!"); }
                 else { $("#alert").text("Player 2 wins!"); }
                 play = false; 
               }
        }
        else { 
         gameBoard[$(this).attr("id")] = "X";
         displayBoard(gameBoard);
        move++;
        if (checkForWinner()!=-1 && checkForWinner()!="") { 
         if (checkForWinner()=="X") { $("#alert").text("Player 1 wins!"); }
              else { $("#alert").text("Player 2 wins!"); }
              play = false; 
            }
         }
      }
    });

   $("#reset").click(function() {
      if(!play) {
         main();
         $("#board tr td").text("");
      }
      
   });
}

$(document).ready(function(){
   main();
});