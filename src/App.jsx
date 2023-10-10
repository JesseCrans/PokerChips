import './App.css'
import Game from './Game/Game'

import { useState } from 'react'

function App() {
  const [buttonText, setButtonText] = useState('>');
  const [navClassName, setNavClassName] = useState('show');

  function showMenu() {
    setNavClassName(navClassName === 'show' ? '' : 'show'); // toggle nav class
    setButtonText(buttonText === '>' ? '<' : '>'); // toggle button text
  }

  return (
    <main className='content'>
      <nav className={navClassName}>
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
          New Game
        </button>
        <button
          name='show-menu'
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
