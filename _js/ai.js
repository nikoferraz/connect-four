function AI(board){
	this.board_state = new Board(); 
	this.board_state.board = board.board; 
}

AI.prototype.best_move = function (){
	var best_move = minimax(); 
	return best_move; 
}

AI.prototype.minimax = function(){
	this.board_state.check

}
