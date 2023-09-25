export const saveGameLocal = ({board, turn}) => {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetGameLocal = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')  
}