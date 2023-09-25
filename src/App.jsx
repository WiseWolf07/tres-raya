import { useEffect, useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkWinner, checkTie } from './logic/board'
import { Board } from './components/Board'
import { saveGameLocal, resetGameLocal } from './logic/storage/local-storage'

function App() {

  const [winner, setWinner] = useState(null)
  const [board, setBoard] = useState(() => {
    const boardFromLocal = window.localStorage.getItem('board')
    return boardFromLocal ? JSON.parse(boardFromLocal) : Array(9).fill(null)
  })  
  const [turn, setTurn] = useState(() => {
    const turnFromLocal = window.localStorage.getItem('turn')
    return turnFromLocal ?? TURNS.x
  });

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    resetGameLocal()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  }

  const updateBoard = (index) => {
    if(board[index] || winner || winner===false) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)

    saveGameLocal({board:newBoard, turn:newTurn})
    
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }
    const isFull = checkTie(newBoard)
    if(isFull){
      setWinner(!isFull)
    }
  }

  return(
    <Board board={board} resetGame={resetGame} updateBoard={updateBoard} turn={turn} winner={winner}/>
  )
}

export default App
