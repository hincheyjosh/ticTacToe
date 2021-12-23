const Player = (symbol) => {
    return { symbol }
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
    }

    return { gameArray, createGameBoard }

})()

GameBoard.createGameBoard()
