
var board = [];
var hasConflicted = [];
var score = 0;


$(function(){
    newgame();
});

function newgame(){
    init();
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    for (i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0的话,设置数字格为高宽都为0
            if (board[i][j] === 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            }
            //如果棋盘格的值不为0的话,设置数字格的高宽并设置背景色和前景色及数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "40px");
}

function generateOneNumber(){
    if (nospace(board)) {
        return false;
    }
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    ShowNumberWithAnimation(randx, randy, randNumber);
    return true;
}
