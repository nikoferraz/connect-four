  //Board model 
  function Board(rows, columns, board_size){
    this.canvas = document.getElementById('canvas0');
    this.context = this.canvas.getContext('2d');
    this.board_data = { 
      background : 'blue',
      num_rows: rows,
      num_columns: columns,
      size_of_piece: board_size,  
      padding: 12 ,
      get width() {
        return this.size_of_piece * this.num_columns;
      },
      get height() {
        return this.size_of_piece * this.num_rows;
      }
    }; 
    this.canvas.width = this.board_data.width; 
    this.canvas.height = this.board_data.height; 
    this.canvas.style.background = this.board_data.background; 
  }


  Board.prototype.initializer = function(){
    this.board = [];
    var rows = this.board_data.num_rows;
    var cols = this.board_data.num_columns;
    var temp;
    var array = [];
    //initialize new board 
    for (var row = 0; row < rows; row++) {
      temp = [];
      for (var col = 0; col < cols; col++) {
        temp[col] = '';
      }
      array[row] = temp;
    }
    this.board = array;
  }; 

  ///////////////////////////////////
 ///   Draw methods for canvas   ///
///////////////////////////////////

Board.prototype.draw = function (x, y, color) {
    this.context.beginPath();
    this.context.arc(x, y, ((this.board_data.size_of_piece / 2) - this.board_data.padding), 0, 2 * Math.PI);
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    if (color === '') {
      this.context.fillStyle = 'white';
    } else {
      this.context.fillStyle = color;
    }
    this.context.fill();
    this.context.stroke();
}; 
Board.prototype.drawAtSlot = function(row, col, color) {
  var x = (this.board_data.size_of_piece / 2) + (this.board_data.size_of_piece * col);
  var y = (this.board_data.size_of_piece / 2) + (this.board_data.size_of_piece * row);
  this.draw(x, y, color);
};

Board.prototype.drawBoard = function() {
  this.context.clearRect(0, 0, this.board_data.width, this.board_data.height);
  var row, col;
  for (row = 0; row < this.board.length; row++) {
    for (col = 0; col < this.board[row].length; col++) {
      this.drawAtSlot(row, col, this.board[row][col]);
    }
  }
};

Board.prototype.is_empty = function(row, col){
  if(this.board[row][col] === '')
    return true; 
  return false;
};




   