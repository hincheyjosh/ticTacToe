const Player = (symbol) => {    
    this.symbol = symbol
    
    const getSymbol = () => symbol

    return { getSymbol }
}


const GameBoard = (() => {
    let gameArray = [[null,null,null],[null,null,null],[null,null,null]]

    const createGameBoard = () => {
        const boardDiv = document.querySelector(".gameBoard")
        for (let i = 0; i < 3; i++) {
            let newRow = document.createElement("div")
            newRow.className = "row"
            for (let j = 0; j < 3; j++) {
                let newCell = document.createElement("div")
                newCell.className = 'cell'
                newCell.id = `${i}${j}`
                newRow.appendChild(newCell)
            }
            boardDiv.appendChild(newRow)
        }
        const cells = document.querySelectorAll(".cell") 
        cells.forEach(cell => {
            cell.addEventListener('click', event => {
                gameController.playRound(event.target.id)
            })
        })
    }

    const updateDisplay = () => {
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell) => {
            [firstIndex, secondIndex] = cell.id.split('')
            if (gameArray[firstIndex][secondIndex] != null) {
                cell.textContent = gameArray[firstIndex][secondIndex]
            }
        })
    }

    const updateBanner = (message) => {
        const banner = document.querySelector(".banner")
        banner.textContent = message
    }

    const markBoard = (cellId, playerSymbol) => {
        [firstIndex, secondIndex] = cellId.split('')
        gameArray[firstIndex][secondIndex] = playerSymbol
        updateDisplay()
    }

    const checkWinner = () => {
        let winner;
        if (gameArray[0][0] === 'X' && gameArray[0][1] === 'X' && gameArray[0][2] === 'X') {
            winner = 'X'
        } else if (gameArray[0][0] === '0' && gameArray[0][1] === 'O' && gameArray[0][2] === 'O') {
            winner = 'O' 
        } else if (gameArray[1][0] === 'X' && gameArray[1][1] === 'X' && gameArray[1][2] === 'X') {
            winner = 'X'
        } else if (gameArray[1][0] === 'O' && gameArray[1][1] === 'O' && gameArray[1][2] === 'O') {
            winner = 'O'
        } else if (gameArray[2][0] === 'X' && gameArray[2][1] === 'X' && gameArray[2][2] === 'X') {
            winner = 'X'
        } else if (gameArray[2][0] === 'O' && gameArray[2][1] === '0' && gameArray[2][2] === 'O') {
            winner = 'O'
        } else if (gameArray[0][0] === 'X' && gameArray[1][0] === 'X' && gameArray[2][0] === 'X') {
            winner = 'X'
        } else if (gameArray[0][0] === 'O' && gameArray[1][0] === 'O' && gameArray[2][0] === 'O') {
            winner = 'O'
        } else if (gameArray[0][1] === 'X' && gameArray[1][1] === 'X' && gameArray[2][1] === 'X') {
            winner = 'X'
        } else if (gameArray[0][1] === 'O' && gameArray[1][1] === 'O' && gameArray[2][1] === 'O') {
            winner = 'O'
        } else if (gameArray[0][2] === 'X' && gameArray[1][2] === 'X' && gameArray[2][2] === 'X') {
            winner = 'X'
        } else if (gameArray[0][2] === 'O' && gameArray[1][2] === 'O' && gameArray[2][2] === 'O') {
            winner = 'O'
        } else if (gameArray[0][0] === 'X' && gameArray[1][1] === 'X' && gameArray[2][2] === 'X') {
            winner = 'X'
        } else if (gameArray[0][0] === 'O' && gameArray[1][1] === 'O' && gameArray[2][2] === 'O') {
            winner = 'O'
        } else if (gameArray[2][0] === 'X' && gameArray[1][1] === 'X' && gameArray[0][2] === 'X') {
            winner = 'X'
        } else if (gameArray[2][0] === 'O' && gameArray[1][1] === 'O' && gameArray[0][2] === 'O') {
            winner = 'O'
        }
        return winner
     }

    return { gameArray, createGameBoard, updateDisplay, markBoard, checkWinner, updateBanner }

})()

const gameController =(() => {
    const playerX = Player("X")
    const playerO = Player("O")
    let round = 1
    let gameOver = false

    GameBoard.createGameBoard()

    const resetGame = () => {
        window.location.reload(true)
    }

    const playRound = (cellId) => {
        GameBoard.markBoard(cellId, getCurrentPlayer())
        if (GameBoard.checkWinner()) {
            GameBoard.updateBanner(`Player ${getCurrentPlayer()} has won`)
            gameOver = true
            return
        }
        if (round === 9) {
            GameBoard.updateBanner("Draw")
            gameOver = true
            return
        }
        round++
        GameBoard.updateBanner(`Player ${getCurrentPlayer()}'s turn.`)
    }

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? playerX.getSymbol() : playerO.getSymbol()
    }

    return { playRound, getCurrentPlayer }
})()