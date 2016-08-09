function Current_Game(player_1, player_2, AI){
    this.turn = 1; 
    //Records player, row, and column of last play
    this.player = [player_1, player_2]; 
    this.last_play = [this.player[0],'','']; 
    this.AI = AI; 
}
Current_Game.prototype.change_turn = function(){
  if (this.turn === 1)
    this.turn = 2; 
  else 
    this.turn = 1; 
};

Current_Game.prototype.play = function (board, column){
  var color = this.player[0];
  var rows = board.board_data.num_rows; 
  //var played = false;
  if (this.turn === 2){
    color = this.player[1]; 
  }
  //Check for available slots in selected column 
  for (var row = rows - 1; row >= 0; row--) {
    if (board.is_empty(row, column)) {
      board.board[row][column] = color;
      this.last_play = [color,row,column]; 
      return true;
      //Test 
    }
  }
  return false; 
};
Current_Game.prototype.check_vertical = function(board, num_rows, row, col){
  var match = 0; 
  if(row>(num_rows-4))
    return false; 
  for(row; row <= (num_rows - 2); row++){
    //Slot is not empty and is same color
    if(!(board.board[row+1][col]===this.last_play[0]))
      break; 
    match++; 
    if(match === 3)
      return true;
  }
  return false; 
};
Current_Game.prototype.check_horizontal = function(board, num_columns, row, col){
  var match = 0; 
  //Left-right check 
  for(var i = col; i <= (num_columns - 2); i++){
    //Slot is not empty and is same color
    if(!(board.board[row][i+1]===this.last_play[0]))
      break; 
    match++; 
    if(match === 3)
      return true;
  }
  //Right-left check 
  for(var i = col; i >= 1; i--){
    //Slot is not empty and is same color
    if(!(board.board[row][i-1]===this.last_play[0]))
      break; 
    match++; 
    if(match === 3)
      return true;
  }
  return false; 
};
Current_Game.prototype.check_diagonal = function(board, num_rows, num_columns, row, col){
  var match = 0; 
  var x = col+1; 
  var y = row+1; 
  while(x >= 0 && x < num_columns && y >= 0 && y < num_rows){
    if(!(board.board[y][x]===this.last_play[0]))
      break; 
    match++; 
    x++;
    y++; 
    if(match === 3)
      return true;
  }
  var x = col-1; 
  var y = row-1;
  while(x >= 0 && x < num_columns && y >= 0 && y < num_rows){
    if(!(board.board[y][x]===this.last_play[0]))
      break; 
    match++;
    x--;
    y--; 
    if(match === 3)
      return true;
  }
  match = 0; 
  var x = col+1; 
  var y = row-1;
  while(x >= 0 && x < num_columns && y >= 0 && y < num_rows){
    if(!(board.board[y][x]===this.last_play[0]))
      break; 
    match++;
    x++;
    y--; 
    if(match === 3)
      return true;
  }
  var x = col-1; 
  var y = row+1;
  while(x >= 0 && x < num_columns && y >= 0 && y < num_rows){
    if(!(board.board[y][x]===this.last_play[0]))
      break; 
    match++;
    x--;
    y++; 
    if(match === 3)
      return true;
  }
  return false; 
};
Current_Game.prototype.check_stalemate = function(board){
  var columns = board.board_data.num_columns; 
  var is_full = true; 
  for(var column=0; column < columns; column++){
    if(board.is_empty(0,column))
      is_full = false;
  }
  return is_full; 
}
Current_Game.prototype.check_win = function(board){
  var rows = board.board_data.num_rows; 
  var columns = board.board_data.num_columns; 
  var row = this.last_play[1]; 
  var col = this.last_play[2]; 
  if(this.check_vertical(board, rows, row, col))
    return true; 
  else if(this.check_horizontal(board, columns, row, col))
    return true;
  else if(this.check_diagonal(board, rows, columns, row, col)) 
    return true;      
  else if(this.check_stalemate(board))
    return 0; 
  return false; 
};
