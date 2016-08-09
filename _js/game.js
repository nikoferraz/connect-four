$(function() {
  var rows = $("#rows").val();
  var columns = $("#columns").val();
  var board_size = $("#size").val();
  var player_1 = $("#player_1").val();
  var player_2 = $("#player_2").val();
  var AI = $("input:radio[name=AI]:checked").val();
  game = new Game(); 
  game.initialize_board();
});


function refresh_input(){
  rows = $("#rows").val();
  columns = $("#columns").val();
  board_size = $("#size").val();
  player_1 = $("#player_1").val();
  player_2 = $("#player_2").val();
  AI = $("input:radio[name=AI]:checked").val();
  game.restart(); 
}

function Game(){
  //Default Board model with 6 rows, 7 columns, and piece size of 80. 
  this.board = new Board(6, 7, 80);
  //Default Current_Game model. First player is red, second player yellow. The last argument, 1, represents human versus AI option 
  this.current_game = new Current_Game('red', 'yellow', 3);
  this.initialize_board = function(){
      this.board.initializer();   
      this.board.drawBoard(); 
  };
}

Game.prototype.restart = function(){
  this.board = new Board(this.rows, this.columns, this.board_size); 
  this.current_game = new Current_Game(player_1, player_2, this.AI); 
  this.board.initializer();  
  this.board.drawBoard();
};


Game.prototype.won = function (){
  window.alert("Congratulations!"+"Player "+this.current_game.turn+" won!");
  if(confirm("Would you like to start a new game?"))
    game.restart(); 
};
Game.prototype.draw = function (){
  window.alert("Draw!");
  if(confirm("Would you like to start a new game?"))
    game.restart();
};

var restart_button = $("#restartBtn").bind("click", function(){
  if (confirm('Are you sure you want to start a new game?')) 
      game.restart();  
}); 


Game.prototype.ai_play = function(){

}

Game.prototype.play = function (column){
  //If play is successful -- i.e. recorded in the board model -- it returns true 
  var played = this.current_game.play(this.board, column);
  if(played){
    this.board.drawBoard(); 
    var check_win = this.current_game.check_win(this.board);
    if(check_win){
      this.won(); 
      return; 
    }
    else if(check_win === 0){
      this.draw(); 
      return; 
    }
    this.current_game.change_turn(); 
  }
  return played;
}; 


Game.prototype.click_on_column = $("#canvas0").bind("click", function(){
  //If AI v. AI 
  console.log(this.AI);
  if(this.AI == 3){return false};
  var x = event.x;
  //Offset for canvas coordinates
  x -= game.board.canvas.offsetLeft;
  //Determine which column was clicked on 
  var column = Math.floor(x/game.board.board_data.size_of_piece); 
  if (column >= 0 && column < game.board.board_data.num_columns){
    game.play(column);
  }
  if(this.AI==1 && game.current_game.turn === 2){
    game.ai_play("easy"); 
  }
}); 



