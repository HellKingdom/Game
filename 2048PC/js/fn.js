var board=new Array(),
	score=0,
	flagArr=new Array();
fn={
	getPosTop:function(i,j)	{
		return 20 + 120 * i
	},
	getPosLeft:function(i,j){
		return 20 + 120 * j
	},
	newgame:function(){
		//界面初始化
		fn.init();
		
		//产生两个随机数
		fn.generateNumber();
		fn.generateNumber();
	},
	init:function(){
		for(var i=0;i<4;i++){
			board[i]=new Array();//转化成二位数组
			flagArr[i]=new Array();
			for (var j=0; j<4;j++) {
				var gridCell=$("#grid-cell-"+i+"-"+j)
				gridCell.css({"top":fn.getPosTop(i,j)})
				gridCell.css({"left":fn.getPosLeft(i,j)})
				
				board[i][j]=0//对格子初始化值为0
				flagArr[i][j]=false;
			}
		}
		fn.updateBoardView();
	},
	updateBoardView:function(){
		$(".number-cell").remove();
		for(var i=0;i<4;i++){			
			for (var j=0; j<4;j++) {
				$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
				var theNumberCell=$("#number-cell-"+i+"-"+j);
				if(!board[i][j]){
					theNumberCell.css({
						"width":"0px",
						"height":"0px",
						"top":fn.getPosTop(i,j)+50,
						"left":fn.getPosLeft(i,j)+50
					})
				}
				else{
					theNumberCell.css({
						"width":100,
						"height":100,
						"top":fn.getPosTop(i,j),
						"left":fn.getPosLeft(i,j),
						"backgroundColor":fn.getNumberBackgroundColor(board[i][j]),
						"color":fn.getNumberColor(board[i][j])
					}).text(board[i][j])
					
				}
				flagArr[i][j]=false;//标记重置
			}
		}
	},
	getNumberBackgroundColor:function(num){
		switch(num){
			case 2:
				return "#eee4da";
				break;
			case 4:
				return "#ede0c8";
				break;
			case 8:
				return "#f2b179";
				break;
			case 16:
				return "#f59563";
				break;
			case 32:
				return "#f67c5f";
				break;
			case 64:
				return "#f65e3b";
				break;
			case 128:
				return "#edcf72";
				break;
			case 256:
				return "#edcc61";
				break;
			case 512:
				return "#9c0";
				break;
			case 1024:
				return "#33b5e5";
				break;
			case 2048:
				return "#09c";
				break;
			case 4096:
				return "#a6c";
				break;
		}
		return "#000"
	},
	getNumberColor:function(num){
		if(num<=4)
			return "#776e65"	
		return "#fff"

	},
	generateNumber:function(){
		if( fn.nospace(board) )
			return false;
		//随机产生一个位置
		var randx=parseInt( Math.floor(Math.random() * 4 ) )
		var randy=parseInt( Math.floor(Math.random() * 4 ) )
		while(true){
			if(board[randx][randy]==0)
				break;
			var randx=parseInt( Math.floor(Math.random() * 4 ) )
			var randy=parseInt( Math.floor(Math.random() * 4 ) )
		}
		//随机产生一个数
		var randnumber=Math.random()>0.5?2:4;
		board[randx][randy]=randnumber;
		fn.showNUmberWithAnimation(randx,randy,randnumber);
		return true;
	},
	nospace:function(arr){
		for (var i=0 ; i<4 ;i++) {
			for (var j=0 ; j<4 ;j++) {
				if(arr[i][j]==0)
					return false
			}
			
		}
		return true;
	},
	showNUmberWithAnimation:function(x,y,n){
		var numberCell=$("#number-cell-"+x+"-"+y);
		numberCell.css({
			"backgroundColor":fn.getNumberBackgroundColor(n),
			"color":fn.getNumberColor(n)
		}).text(n).animate({
			"width":"100px",
			"height":"100px",
			"top":fn.getPosTop(x,y),
			"left":fn.getPosLeft(x,y)	
		})
	},
	moveLeft:function(board){
		if( !fn.canMoveLeft(board) )
			return false;
		for (var i=0;i<4;i++) {
			for (var j=1; j<4;j++) {
				if( board[i][j] !=0 ){
					for (var k=0;k<j;k++) {
						if( board[i][k]==0 && fn.noBlock(i,k,j,board) ){
							//move
							fn.showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j]
							board[i][j]=0;
						}
						else if(board[i][j]== board[i][k] && fn.noBlock(i,k,j,board) && !flagArr[i][k] ){
							fn.showMoveAnimation(i,j,i,k);
							board[i][k]+=board[i][j]
							board[i][j]=0;
							flagArr[i][k]=true;
							score+=board[i][k];
							fn.updateScore();
						}
					}
				}
			}
		}
		setTimeout(fn.updateBoardView,200)
		return true;
	},
	canMoveLeft:function(arr){
		for (var i=0;i<4;i++) {
			for (var j=1; j<4;j++) {
				if( arr[i][j-1]==0 || arr[i][j-1] == arr[i][j] )
					return true;
			}
		}
		return false;
	},
	moveRight:function(board){
		if( !fn.canMoveRight(board) )
			return false;
		for (var i=0;i<4;i++) {
			for (var j=2; j>=0;j--) {
				if( board[i][j] !=0 ){
					for (var k=3;k>j;k--) {
						if( board[i][k]==0 && fn.noBlock(i,j,k,board) ){
							//move
							console.log(k)
							fn.showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j]
							board[i][j]=0;
						}
						else if(board[i][j]== board[i][k] && fn.noBlock(i,j,k,board) &&!flagArr[i][k] ){
							console.log(k)
							fn.showMoveAnimation(i,j,i,k);
							board[i][k]+=board[i][j]
							board[i][j]=0;
							flagArr[i][k]=true;
							score+=board[i][k];
							fn.updateScore();
						}
						
					}
				}
			}
		}
		setTimeout(fn.updateBoardView,200)
		return true;
	},
	canMoveRight:function(arr){
		for (var i=0;i<4;i++) {
			for (var j=0; j<3;j++) {
				if( arr[i][j+1]==0 || arr[i][j+1] == arr[i][j] )
					return true;
			}
		}
		return false;
	},
	noBlock:function(row,col1,col2,arr){
		for (var i=col1+1;i<col2;i++) {
			if( arr[row][i]!=0)
				return false;
		}
		return true;
	},
	moveUp:function(board){
		if( !fn.canMoveUp(board) )
			return false;
		for (var i=1;i<4;i++) {
			for (var j=0; j<4;j++) {
				if( board[i][j] !=0 ){
					for (var k=0;k<i;k++) {
						if( board[k][j]==0 && fn.noBlock1(k,i,j,board) ){
							//move
							fn.showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j]
							board[i][j]=0;
						}
						else if(board[i][j]== board[k][j] && fn.noBlock1(k,i,j,board) && !flagArr[k][j] ){
							fn.showMoveAnimation(i,j,k,j);
							board[k][j]+=board[i][j]
							board[i][j]=0;
							flagArr[k][j]=true;
							score+=board[k][j];
							fn.updateScore();
						}
						
					}
				}
			}
		}
		setTimeout(fn.updateBoardView,200)
		return true;
	},
	canMoveUp:function(arr){
		for (var i=1;i<4;i++) {
			for (var j=1; j<4;j++) {
				if( arr[i-1][j]==0 || arr[i-1][j] == arr[i][j] )
					return true;
			}
		}
		return false;
	},
	moveDown:function(board){
		if( !fn.canMoveDown(board) )
			return false;
		for (var i=2;i>=0;i--) {
			for (var j=0; j<4;j++) {
				if( board[i][j] !=0 ){
					for (var k=3;k>i;k--) {
						if( board[k][j]==0 && fn.noBlock1(i,k,j,board) ){
							//move
							fn.showMoveAnimation(i,j,k,j);
							board[k][j]=board[i][j]
							board[i][j]=0;
						}
						else if(board[i][j]== board[k][j] && fn.noBlock1(i,k,j,board) && !flagArr[k][j] ){
							fn.showMoveAnimation(i,j,k,j);
							board[k][j]+=board[i][j]
							board[i][j]=0;
							flagArr[k][j]=true;
							score+=board[k][j];
							fn.updateScore();
						}
					}
				}
			}
		}
		setTimeout(fn.updateBoardView,200)
		return true;
	},
	canMoveDown:function(arr){
		for (var i=0;i<3;i++) {
			for (var j=0; j<4;j++) {
				if( arr[i+1][j]==0 || arr[i+1][j] == arr[i][j] )
					return true;
			}
		}
		return false;
	},
	noBlock1:function(row1,row2,col,arr){
		for (var i=row1+1;i<row2;i++) {
			if( arr[i][col]!=0)
				return false;
		}
		return true;
	},
	showMoveAnimation:function(fromx,fromy,tox,toy){
		var numberCell=$("#number-cell-"+fromx+"-"+fromy)
		numberCell.animate({
			"top":fn.getPosTop(tox,toy),
			"left":fn.getPosLeft(tox,toy)
		},200)
	},
	isGameover:function(arr){
		if( fn.nospace(arr) && fn.noMove(arr) ){
			alert( "GAMEOVER" )
		}
		else if( $('#score').val() >=2048){
			alert("恭喜您完成2048")
			
		}	
	},
	updateScore:function(){
		$('#score').text(score);
	},
	noMOve:function(arr){
		if(canMoveLeft(arr) || canMoveRight(arr) || canMoveUp(arr) || canMoveDown(arr))
			return false;
		return true
	}
	
	
}





