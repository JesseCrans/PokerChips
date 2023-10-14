import './App.css'
import Game from './Game/Game'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCoins } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <main className='main-content'>
      <nav>
        <h1 className='website-title'>
          <FontAwesomeIcon icon={faCoins} />
        </h1>
        <button
          title='Make a new game'
          className='make-new-game'
          onClick={() => {
            if (confirm('Are you sure?')) {
              sessionStorage.clear()
              window.location.reload()
            }
          }} // clear session storage and reload page
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </nav>
      <Game />
    </main>
  )
}

export default App
