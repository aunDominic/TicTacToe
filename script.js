const gameBoard = (() => {
    // Populate board with 0,1,2. 
    // 0 = empty;
    // 1 = player 1 (green);
    // 2 = player 2 (red)
    var board = [];
    var turns = 1;
    const setBoard = () => {
        for (let i = 0; i < 9;i++) board[i] = 0;
        turns = 1;
    };

    const getTurns  = () => turns;

    // Update board;
    const updateBoard = (index, playerID) => {
        if (board[index] === 0) board[index] = playerID; 
        else return;
        let winner = theWinner();
        turns += 1;
        if (winner !==  0){
            return winner;
        }
        else if (turns === 10){
            return 0;
        }
    };
    // Check if win;
    const theWinner = () => {
        //  Check rows
        for (let i = 0; i <= 6; i = i + 3){
            if (board[i] !== 0  && board[i] === board[i+1] && board[i+1] === board[i+2]){
                return board[i];
            }
        }
        // check cols
        for(let i = 0 ; i < 3; i++){
            if (board[i] !== 0 && board[i] === board[i+3] && board[i+3] === board[i+6]){
                return board[i];
            }
        }
        // Check diags
        if (board[0] !== 0 && board[0] === board[4] && board[4] === board[8]) return board[0];
        if (board[2] !== 0 && board[2] === board[4] && board[4] === board[6]) return board[2];
        return 0;
    };

    // Return public methods and variables
    return {updateBoard,setBoard,board,turns,getTurns}

})();

const displayController = (() =>{
    let board = gameBoard.board;
    const render = () =>{
        for (let i = 0; i < 9; i++){
            if (board[i]=== 0){
                document.getElementById(String(i)).style.backgroundColor = 'darkgrey';
            }
            if (board[i] === 1){
                document.getElementById(String(i)).style.backgroundColor = 'green';
            }
            if(board[i] === 2){
                document.getElementById(String(i)).style.backgroundColor= 'red';
            }
        }
        let currentPlayer = document.getElementById('currentPlayer')
        if (gameBoard.getTurns() % 2 == 0)
        {
            currentPlayer.style.backgroundColor = "red";
        }
        else{
            currentPlayer.style.backgroundColor = "green";
        }
    }
    return {render};
})();



const Player = (name, id) =>{
    return {name,id};
}

const p1 = Player("Player 1", 1);
const p2 = Player("Player 2", 2);

gameBoard.setBoard();
let boxes = document.getElementsByClassName('box');
for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click', function(){
        
        if (gameBoard.getTurns() % 2 == 0){
            var res = gameBoard.updateBoard(i,p2.id);
        }
        else{
            var res = gameBoard.updateBoard(i,p1.id);
        }
        displayController.render();
        if (res == 1){
            // player 1 wins;
            document.getElementsByClassName('winner')[0].classList.toggle('open');
        }
        if (res == 2){
            // player 2 wins;
            document.getElementsByClassName('winner')[0].classList.toggle('open');
        }
        if (res == 0){
            document.getElementsByClassName('winner')[0].children[0].innerHTML= "nobody won lol";

            document.getElementsByClassName('winner')[0].classList.toggle('open');


        }
    })
}
document.getElementsByClassName('restart')[0].addEventListener('click', function()
{
    gameBoard.setBoard();
    displayController.render();
    document.getElementsByClassName('winner')[0].classList.toggle('open');
});
