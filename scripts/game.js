$(document).keydown(function (event) {
	switch (event.keyCode) {
		case 37://left
		/*
            moveLeft()方法
                * 完成向左移动的逻辑
                * 返回值是Boolean类型,判断是否可以向左移动.
             */
            if (moveLeft()) {
                //重新地随机生成两个数字
                generateOneNumber();
                //判断当这次的移动完成之后,游戏是否结束了
                //isgameover();
            }
			break;
		case 38://up

			break;
		case 39://right

			break;
		case 40://down

			break;
		default:

	}
});

function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}

	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(board[i][j]!==0){
				for(var k=0; k<j; k++){
					if(board[i][k] === 0 && noBlokHorizontalCol(i, k, j, board)){
                        //才能向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board)){
                        //才能向左移动
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                    }
				}
			}
		}
	}
	setTimeout("updateBoardView();",200);
	return true;
}
