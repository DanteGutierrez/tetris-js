const height = 20;

const width = 10;

let board;

let running = false;

let timer;

let currentPiece = 
{
    tetrimino: "",
    currentState: [],
    rotation: 0,
    y: 0,
    x: width / 2,
    deltaX: 0,
    deltaY: 0,
    deltaRotation: 0,
};

let holdPiece = "";

let bag;

const tetriminos = 
{
    "I":
    {
        shape:
        [
            ["","","",""],
            ["block", "block", "block", "block"],
            ["","","",""],
            ["","","",""]
        ],
        color: "lightBlue"
    },
    "J":
    {
        shape:
        [
            ["block", "", ""],
            ["block", "block", "block"],
            ["","",""]
        ],
        color: "blue"
    },
    "L":
    {
        shape:
        [
            ["", "", "block"],
            ["block", "block", "block"],
            ["","",""]
        ],
        color: "orange"
    },
    "O":
    {
        shape:
        [
            ["block", "block"],
            ["block", "block"]
        ],
        color: "yellow"
    },
    "S":
    {
        shape:
        [
            ["", "block", "block"],
            ["block", "block", ""],
            ["","",""]
        ],
        color: "green"
    },
    "Z":
    {
        shape:
        [
            ["block", "block", ""],
            ["", "block", "block"],
            ["","",""]
        ],
        color: "red"
    },
    "T":
    {
        shape:
        [
            ["", "block", ""],
            ["block", "block", "block"],
            ["","",""]
        ],
        color: "purple"
    }
};

const gameButton = document.getElementById("gameButton");

const leftButton = document.getElementById("leftButton");

const rightButton = document.getElementById("rightButton");

const leftRotButton = document.getElementById("leftRotButton");

const rightRotButton = document.getElementById("rightRotButton");

const gameBody = document.getElementById("gameBody");

// Function courtesy from: https://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const refillBag = () => 
{
    bag = [];

    for(let key in tetriminos)
    {
        bag.push(key);
    }

    shuffle(bag);
}

const pickNewPiece = () => 
{
    currentPiece.tetrimino = holdPiece;

    holdPiece = bag.pop();

    if(bag.length == 0)
    {
        refillBag();
    }

    currentPiece.currentState = tetriminos[currentPiece.tetrimino].shape;

    currentPiece.rotation = 0;
    
    currentPiece.x = width / 2;

    currentPiece.y = 0;

    currentPiece.deltaX = 0;

    currentPiece.deltaY = 0;

    currentPiece.deltaRotation = 0;

    console.log(currentPiece);
}

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

const prepareGame = () => 
{
    refillBag();

    holdPiece = bag.pop();

    pickNewPiece();

    generateBoard();

    timer = setInterval(() => {currentPiece.deltaY++; updateGame()}, 500);
}

const updateGame = () =>
{
    movePiece();
    
    renderFrame();
}

const TogglePieceVisibility = on => 
{    
    for(let i = 0; i < currentPiece.currentState.length; i++)
    {
        for(let j = 0; j < currentPiece.currentState[i].length; j++)
        {
            if(currentPiece.currentState[i][j] !== "")
            {
                board[currentPiece.y + i][currentPiece.x - Math.ceil(currentPiece.currentState[i].length / 2) + j] = on ? currentPiece.currentState[i][j] + " " + tetriminos[currentPiece.tetrimino].color : "black";
            }
        }
    }
}

// Left: boolean for clockwise / counterclockwise
// true: counterclockwise | false: clockwise
const RotateCurrentPiece = left =>
{
    let tempArray = [];

    for(let i = 0; i < currentPiece.currentState[0].length; i++)
    {
        let row = [];

        for(let j = 0; j < currentPiece.currentState.length; j++)
        {
            row.push("");
        }

        tempArray.push(row);
    }

    if(left)
    {
        

        for(let y = 0; y < currentPiece.currentState.length; y++)
        {
            for(let x = 0; x < currentPiece.currentState[y].length; x++)
            {
                tempArray[tempArray.length - 1 - x][y] = currentPiece.currentState[y][x];
            }
        }
    }
    else
    {
        for(let y = 0; y < currentPiece.currentState.length; y++)
        {
            for(let x = 0; x < currentPiece.currentState[y].length; x++)
            {
                tempArray[x][tempArray[x].length - 1 - y] = currentPiece.currentState[y][x];
            }
        }
    }

    currentPiece.currentState = tempArray;
}

// Direction: The way the piece is moving (Delta)
// -1: Left | 0: Down | 1: Right
const checkCollision = direction =>
{
    let currentTetrimino = tetriminos[currentPiece.tetrimino];

    let profile = [];

    if(direction === 0)
    {
        
    }
}

const movePiece = () =>
{
    // De-render piece
    
    let currentTetrimino = tetriminos[currentPiece.tetrimino];
    
    // SRS
    
    // Always round to left
    
    let locked = false;
    
    // boundary check

    for(let i = 0; i < currentTetrimino.shape[0].length; i++)
    {
        if(currentPiece.y + currentTetrimino.shape.length >= height || (currentTetrimino.shape[currentTetrimino.shape.length - 1][i] !== "" && board[currentPiece.y + currentTetrimino.shape.length][currentPiece.x - Math.ceil(currentTetrimino.shape[0].length / 2) + i] !== "black"))
        {
            locked = true;
            
            break;
        }
    }
    
    if(locked)
    {
        pickNewPiece();
        
        currentTetrimino = tetriminos[currentPiece.tetrimino];
    }  
    
    else
    {
        TogglePieceVisibility(false);
        
        currentPiece.x += currentPiece.deltaX;
        
        currentPiece.deltaX = 0;
        
        currentPiece.y += currentPiece.deltaY;
        
        currentPiece.deltaY = 0;

        if(currentPiece.deltaRotation != 0) RotateCurrentPiece(currentPiece.deltaRotation > 0);

        currentPiece.deltaRotation = 0;
    }
    
    // re-render piece
    
    TogglePieceVisibility(true);
}

const renderFrame = () =>
{
    for(let i = 0; i < board.length; i++)
    {
        for(let j = 0; j < board[i].length; j++)
        {
            let div = document.getElementById(i + '' + j);
            
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

const changeGameState = (evt) =>
{
    running = !running;

    gameButton.innerText = running ? "Stop Game" : "Start Game";

    if(running) 
    {
        prepareGame();
    }
    else
    {
        clearInterval(timer);
    }
}

gameButton.addEventListener("click", changeGameState);

leftButton.addEventListener("click", evt => {currentPiece.deltaX--; updateGame();})

rightButton.addEventListener("click", evt => {currentPiece.deltaX++; updateGame();})

leftRotButton.addEventListener("click", evt => {currentPiece.deltaRotation++; updateGame();})

rightRotButton.addEventListener("click", evt => {currentPiece.deltaRotation--; updateGame();})