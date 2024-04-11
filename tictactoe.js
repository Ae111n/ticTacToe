const XCLASS = 'x'
const OCLASS = 'o'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
const board = document.getElementById('board')
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageElement = document.getElementById('winningmessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let OTurn

startGame()

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once:true})
})
function handleClick(e) {
const cell = e.target
const currentClass = OTurn ? OCLASS : XCLASS


    // placeMark
    placeMark(cell, currentClass)
    //check for win
    if(checkWin(currentClass)) {
        endGame(false)
    }else if (isDraw()){
        endGame(true)
    }else{
     //switch Turns 
    swapTurns()
    setBoardHoverClass()
    }
    
   
  
}

function endGame(draw){
    if(draw) {
        winningMessageTextElement.innerText = 'DRAW !'
    } else {
        winningMessageTextElement.innerText = `${OTurn ? "O'S" : "X'S"} WIN!`
    }
    winningMessageElement.classList.add('show')
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass) 
}
function swapTurns() {
    OTurn = !OTurn
}
function setBoardHoverClass() {
board.classList.remove(XCLASS)
board.classList.remove(OCLASS)

if (OTurn) {
    board.classList.add(OCLASS)
}else{
    board.classList.add(XCLASS)
}
}

restartButton.addEventListener('click', startGame)

function startGame(){
    OTurn = false
    cellElements.forEach(cell => {
      
        cell.classList.remove(XCLASS)
        cell.classList.remove(OCLASS)
        cell.removeEventListener('click', handleClick)
   

        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function checkWin(currentClass) {
return WINNING_COMBINATIONS.some(combinations => {
    return combinations.every(index=>{
        return cellElements[index].classList.contains(currentClass)
    })
})
}

//check for draw 
function isDraw() {
return [...cellElements].every(cell => {
    return cell.classList.contains(XCLASS) || cell.classList.contains(OCLASS)
} )
}