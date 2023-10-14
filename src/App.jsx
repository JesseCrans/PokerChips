import './App.css'
import Game from './Game/Game'

import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCoins } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [buttonText, setButtonText] = useState('<');
  const [navClassName, setNavClassName] = useState('show');

  function showMenu() {
    setNavClassName(navClassName === 'show' ? '' : 'show'); // toggle nav class
    setButtonText(buttonText === '>' ? '<' : '>'); // toggle button text
  }

  return (
    <main className='main-content'>
      <nav className={navClassName}> {/* nav class is toggled */}
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
        <button
          className='show-menu'
          onClick={showMenu}
        >
          {buttonText}
        </button>
      </nav>
      <Game />
    </main>
  )
}

export default App
