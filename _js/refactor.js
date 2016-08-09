var draw = function () {
  this.draw = function(x, y, color) {
    context.beginPath();
    context.arc(x, y, ((game.board_data.size_of_piece / 2) - game.board_data.padding), 0, 2 * Math.PI);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    if (color === '') {
      context.fillStyle = 'white';
    } else {
      context.fillStyle = color;
    }
    context.fill();
    context.stroke();
  };
}; 
Draw.prototype.drawAtSlot = function(row, col, color) {
  var x = (game.board_data.size_of_piece / 2) + (game.board_data.size_of_piece * col);
  var y = (game.board_data.size_of_piece / 2) + (game.board_data.size_of_piece * row);
  this.draw(x, y, color);
};

Draw.prototype.drawBoard = function() {
  context.clearRect(0, 0, Board.canvas.width, Board.canvas.height);
  var row, col;
  for (row = 0; row < game.Board.length; row++) {
    for (col = 0; col < game.Board[row].length; col++) {
      this.drawAtSlot(row, col, game.Board[row][col]);
    }
  }
};

Player = function (){
  this.one_color = 'red';
  this.two_color = 'yellow';
  this.turn = 1; 
}; 

  function ConnectFourController(){ 
    new Board(); 
    this.play = function (column) 
    {
      if( game_has_started === true)
      {
        var color = 'red';
        var played = false;
        if (this.turn === 1) {
          color = 'yellow'
        }
        for (var i = this.board_data.num_rows - 1; i >= 0; i--) {
          if (this.board[i][column] === '' && !played) {
            this.board[i][column] = color;
            played = true;
          }
        }
        if (played && this.turn === 0) {
          this.turn = 1;
        } else if (played && this.turn === 1) {
          this.turn = 0;
        }

        // this.checkWin();
        view.drawBoard();
      }
      else 
        started = true; 
    }
  }

  ConnectFourController.prototype.startBtn = function() {
    canvas.style.background = game.board_data.backgroundColor;
    canvas.width = game.board_data.width;
    canvas.height = game.board_data.height;
    view.drawBoard();
  }

  ConnectFourController.prototype.clickAt = function(column) {
    game.play(column);
  }

  


  

