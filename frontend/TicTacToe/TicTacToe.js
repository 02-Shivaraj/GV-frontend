var board;
var names = ['',''];

var count = 0;
var flag = 0;

var c = 0;
function validateForm() {
    var player1 = document.getElementById('player1').value.trim();
    var player2 = document.getElementById('player2').value.trim();

    if (player1 === '' || player2 === '') {
        alert('Please enter names for both players.');
        return false; 
    }    username = req.body.username;


    names = [player1,player2];
    console.log(names);

    setgame();
    return false;
}
function checkname(){
    let person1 = document.getElementById("player1");
    names[0] = person1.value;

    let person2 = document.getElementById("player2");
    names[1] = person2.value;

    console.log(names)
}


var player0 = 'O';
var player1 = 'X';
var curplayer = player0;
var gameover = false;

window.onload = async function() {
    try {
        await new Promise(resolve => setTimeout(resolve, 0));
        
        setgame();
    } catch (error) {
        console.error('Error in window.onload:', error);
    }
};

function setgame(){
    let dabbi = document.getElementById("board");
    dabbi.style.visibility = "visible";
    
    board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ]

    for(let r=0; r<3; r++){
        for(let c=0; c<3; c++){
            
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            tile.classList.add("tile");

            if(r==0||r==1||r==2){
                tile.classList.add("horizontal-line");
            }

            if(c==0||c==1||c==2){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click",setTile);
            document.getElementById("board").append(tile);
        }
    }
}

function setTile(){

    if(gameover){
        return;
    }
    var coord = this.id.split("-");
    let r = parseInt(coord[0]);
    let c = parseInt(coord[1]);
    if(board[r][c]!=' '){
        return;
    }
    if(curplayer == player0){
        let tile = document.getElementById(r.toString()+"-"+c.toString());
        tile.classList.add("playerO")
    }
    if(curplayer == player1){
        let tile = document.getElementById(r.toString()+"-"+c.toString());
        tile.classList.add("playerX")
    }
    board[r][c] = curplayer;
    this.innerText = curplayer;
    count++;
    if(curplayer==player0){
        curplayer=player1;
    }
    else{
        curplayer = player0; 
    }

    checkwinner();
    if(count==9){
        flag = 1;
        winner_name();
    }
}

function checkwinner(){

    for(let r=0; r<3; r++){
        if(board[r][0]==board[r][1] && board[r][1]==board[r][2] && board[r][0]!=' '){
            for(let i=0; i<3; i++){
                hide();
                let tile = document.getElementById(r.toString()+"-"+i.toString());
                tile.classList.add("winner");
            }
            gameover = true;
            winner_name();
            return;
        }
    }

    for(let c=0; c<3; c++){
        if(board[0][c]==board[1][c] && board[1][c]==board[2][c] && board[0][c]!=' '){
            for(let i=0; i<3; i++){
                hide();
                let tile = document.getElementById(i.toString()+"-"+c.toString());
                tile.classList.add("winner");
            }
            gameover = true;
            winner_name();
            return;
        }
    }

    if(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[0][0]!=' '){
        hide();
        for(let i=0; i<3; i++){
            let tile = document.getElementById(i.toString()+"-"+i.toString());
            tile.classList.add("winner");
        }
        gameover = true;
        winner_name();
        return;
    }

    if(board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[0][2]!=' '){
        hide();
        for(let i=0; i<3; i++){
            let j = 0;
            if(i<2){
                j=2-i;
            }
            let tile = document.getElementById(i.toString()+"-"+j.toString());
            tile.classList.add("winner");
        }
        gameover = true;
        winner_name();
        return;
    }
}

function winner_name(){
    let banner = document.getElementsByClassName("winner-banner")[0];
    let replay_quit = document.getElementById("replay-exit");
    let replay = document.getElementById("replay");
    let quit = document.getElementById("quit");

    if(flag==1){
        banner.innerText = " Match Tie ";
        banner.style.visibility="visible";
        replay_quit.style.visibility="visible";
        next();
        return;
    }
    let name;
    if(curplayer=='O'){
        name = names[1];
    }
    else{
        name = names[0];
    }
    console.log(names);
    console.log(name);
    banner.innerText = name + " wins !!!  ";
    banner.style.visibility="visible";
    replay_quit.style.visibility="visible";
    next();
    count--;
    return;
}

function hide(){
    let z = document.getElementById("board");
    z.style.visibility = "hidden";
}

function next(){
    let replay = document.getElementById("replay");
    let quit = document.getElementById("exit");

    replay.addEventListener("click",playagain);
    quit.addEventListener("click",back);
}

function playagain(){
    window.location.reload();   
}

function back(){
    window.location.href = "../options/options.html";
}
