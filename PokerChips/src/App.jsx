import './App.css'
import Game from './Game/Game'

function App() {
  return (
    <main className='content'>
      <h1 className='title'>CHIPPIES</h1>
      <Game />
    </main>
  )
}

// General info:
// Current number of cards turned over
// Current pot amount
// Buttons for calling/checking betting and folding
// 
// Info per player:
// Players name and chips
// 
// Keep track of:
// Chips, Phase, Bet per player, Current Player

export default App
