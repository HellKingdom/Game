

//游戏初始化

fn.newgame();
var startx=0,
	starty=0,
	endx=0,
	endy=0;
$(document).keydown(function (event){
	switch(event.keyCode){
		case 37://left
			event.preventDefault();
			if(fn.moveLeft(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		case 38://up
			event.preventDefault();
			if(fn.moveUp(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		case 39://right
			event.preventDefault();
			if(fn.moveRight(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		case 40://down
			event.preventDefault();
			if(fn.moveDown(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
			break;
		default:break;		
	}
})

//手机触控事件
document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX
	starty=event.touches[0].pageY
	
})
document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX
	endy=event.changedTouches[0].pageY
	//方向判断
	var delatx=endx-startx;
	var delaty=endy-starty;
	if( Math.abs(delatx)<0.3*documentWidth && Math.abs(delaty)<0.3*documentWidth )
		return;
	if( Math.abs(delatx) > Math.abs(delaty) ){
		//x轴方向滑动
		if( delatx > 0){
			//右划
			if(fn.moveRight(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
		}
		else{
			//左划
			if(fn.moveLeft(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
		}
	}
	else{
		//y轴方向滑动
		
		if( delaty > 0){
			//下划
			if(fn.moveDown(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
		}
		else{
			//上划
			if(fn.moveUp(board)){
				fn.generateNumber();
				fn.isGameover(board);
			}
		}
	}
	
})