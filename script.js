const height = 20;

const width = 10;

let board;

let running = false;

let block = 
{
    tetromino: "",
    rotation: 0,
    height: height
};

const tetrominos = 
{
    "I":
    {
        shape:
        [
            ["block", "block", "block", "block"]
        ],
        color: "lightBlue"
    },
    "J":
    {
        shape:
        [
            ["block", "", "", ""],
            ["block", "block", "block", "block"]
        ],
        color: "blue"
    },
    "L":
    {
        shape:
        [
            ["", "", "", "block"]
            ["block", "block", "block", "block"]
        ],
        color: "orange"
    },
    "O":
    {
        shape:
        [
            ["block", "block"]
            ["block", "block"]
        ],
        color: "yellow"
    },
    "S":
    {
        shape:
        [
            ["", "block", "block"],
            ["block", "block", ""]
        ],
        color: "green"
    },
    "Z":
    {
        shape:
        [
            ["block", "block", ""],
            ["", "block", "block"]
        ],
        color: "red"
    },
    "T":
    {
        shape:
        [
            ["", "block", ""],
            ["block", "block", "block"]
        ],
        color: "purple"
    }
};

const gameButton = document.getElementById("gameButton");

const gameBody = document.getElementById("gameBody");

const generateBoard = () => 
{
    boardHTML = "";

    board = [];

    for(let i = 0; i <= height; i++)
    {
        boardHTML += '<div class="container horizontal">';

        if(i < height) 
        {
            board.push([]);
        }
        
        for(let j = -1; j <= width; j++)
        {
            if(i < height && j >= 0 && j < width) 
            {
                board[i].push("black");
            }

            boardHTML += `<div id="${i == height || j < 0 || j == width ? '' : i + '' + j}" class=${i == height || j < 0 || j == width ? '"block gray"' : '"black"'}></div>`;
        }

        boardHTML += '</div>';
    }

    gameBody.innerHTML = boardHTML;

    updateGame();
}

const changeGameState = (evt) =>
{
    running = !running;
    gameButton.innerText = running ? "Stop Game" : "Start Game";

    if(running) 
    {
        generateBoard();
    }
}

const updateGame = () =>
{
    for(let i = 0; i < board.length; i++)
    {
        for(let j = 0; j < board[i].length; j++)
        {
            let div = document.getElementById(i + '' + j);

            console.log(div.classList);

            if(board[i][j] !== div.className)
            {
                div.className = board[i][j];
            }

            else
            {
                div.className = board[i][j];
            }
        }
    }
}

gameButton.addEventListener("click", changeGameState);

