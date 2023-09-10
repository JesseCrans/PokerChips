import './App.css'
import Game from './Game/Game'

function App() {
  return (
    <main className='content'>
      <nav>
        <h1 className='title'>CHIPPIES</h1>
        <button
          className='clear-storage'
          onClick={() => {
            if (confirm('Are you sure?')) {
              sessionStorage.clear()
              window.location.reload()
            }
          }} // clear session storage and reload page
        >
          Clear Storage
        </button>
      </nav>
      <Game />
    </main>
  )
}

export default App
