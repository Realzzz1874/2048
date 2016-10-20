function getPosTop(i, j){
	return 20 + i*120;
}
function getPosLeft(i, j){
	return 20 + j*120;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}


function canMoveLeft(board){
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                //当前数字格的左边第一个值为0的或者当前数字格的值与左边第一个数字格的值相等
                if (board[i][j - 1] === 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return fasle;
}

function noBlokHorizontalCol(row, col1, col2, board){
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== 0) {
            return false;
        }
    }
    return true;
}