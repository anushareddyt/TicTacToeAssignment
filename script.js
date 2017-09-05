var gamestate;
var maxrow = 3,
    maxcol = 3;
var turn = 'X';
var counter = 0;
var gameFinished = false;

function myFunction(btn) {
//	alert(btn.className);
    var clsname = btn.className;
    if (clsname != "btndisable button" && gameFinished == false) {
        counter++;
        btn.className = 'btndisable button';
        btn.disabled = true;
        validateAndAlert(btn.id, btn)
        toggleTurn();
    } else {
        if (gameFinished) {
            alert('Please hit Play Again');
        }
    }
    return false;
}

function validateAndAlert(cell, btn) {
    gamestate[cell[0] - 1][cell[1] - 1] = turn;
    btn.innerText = turn;
    var win = doCheck();
    if (win == true) {
        gameFinished = true;
        alert(turn + ' Win!! play again!!');
    } else {
        if (counter == 9 && win != true) {
            gameFinished = true;
            alert(' Draw!! Play Again !!!!!');
        }
    }
}

function toggleTurn() {
    if (turn == 'X') {
        turn = '0';
    } else {
        turn = 'X';
    }
}

//To intialize values
function initializeGameState() {
    gamestate = new Array(3)
    for (i = 0; i < 3; i++) {
        gamestate[i] = new Array();
        for (j = 0; j < 3; j++) {
            gamestate[i][j] = 'A'; //Pushed a initial value to prevent code from "undifined" error
        }
    }
}

function Play() {

    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.className = 'btnclickable button';
        button.disabled = false;
        button.innerHTML = "";

    }
    location.reload();
}



function doCheck() {
    var result = false;

    //First Check over rows and cols
    for (index = 0; index < maxrow; index++) {
        if (gamestate[index][0] != 'A' && gamestate[index][0] === gamestate[index][1] && gamestate[index][1] === gamestate[index][2]) {
            result = true;
            break;
        } else if (gamestate[0][index] != 'A' && gamestate[0][index] === gamestate[1][index] && gamestate[1][index] === gamestate[2][index]) {
            result = true;
            break;
        } else {
            result = false;
        }
    }

    //If Row wise and col wise checked check cros
    if (!result) {
        if (gamestate[1][1] != 'A') // In cros case center element must not initial value
        {
            if (gamestate[0][0] === gamestate[1][1] && gamestate[1][1] === gamestate[2][2]) {
                result = true;
            } else if (gamestate[0][2] === gamestate[1][1] && gamestate[1][1] === gamestate[2][0]) {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = false;
        }

    }
    return result;
}

initializeGameState();