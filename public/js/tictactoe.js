class Board {
   constructor(player1, player2) {
      this.positions;
      this.player1 = player1;
      this.player2 = player2;
      this.turn = player1;
   }
   initGame() {
      let gameArray = [];
      for(let i = 0; i < 9; i++) {
         gameArray.push("-");
      }
      this.positions = gameArray;
   }
   playTurn(letter, position) {
      this.positions[position] = letter;
      if(this.turn === player1) {
         this.turn = player2;
      } else {
         this.turn = player1;
      }
   }
}

function playGame() {
   let gameBoard = new Board;
   gameBoard.initGame();
}