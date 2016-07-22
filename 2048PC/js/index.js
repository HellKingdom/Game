

//游戏初始化

fn.newgame();

$(document).keydown(function (event){
	switch(event.keyCode){
		case 37://left
			if(fn.moveLeft(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		case 38://up
			if(fn.moveUp(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		case 39://right
			if(fn.moveRight(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		case 40://down
			if(fn.moveDown(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		default:break;		
	}
})
