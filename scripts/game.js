var score = 0;

var startx = 0;
var starty = 0;
var endx =0;
var endy =0;

$(document).keydown(function (event) {
	switch (event.keyCode) {
		case 37://left
			if (moveLeft()) {
	            setTimeout(generateOneNumber, 210);
	            setTimeout(isgameover, 300);
	        }
			break;
		case 38://up
			if(moveUp()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		case 39://right
			if(moveRight()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		default:
			break;
	}
});

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	var dx = endx - startx;
	var dy = endy - starty;

	if(Math.abs(dx) >= Math.abs(dy)){  //在x方向滑动
		if (dx > 0) {
			if(moveRight()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}else {
			if (moveLeft()) {
	            setTimeout(generateOneNumber, 210);
	            setTimeout(isgameover, 300);
	        }
		}
	}else {   //在y方向滑动
		if (dy <0) {
			if(moveUp()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}else {
			if(moveDown()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}
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
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
						continue;
                    }else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
                        continue;
                    }
				}
			}
		}
	}
	setTimeout(updateBoardView,200);
	return true;
}
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] ===0 && noBlokHorizontalCol(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlokHorizontalRow(k, i, j, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlokHorizontalRow(i, k, j, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
    return true;
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
function gameover(){
	alert("智商已经到达上限:"+score+" ,请充值后再继续。");
}
