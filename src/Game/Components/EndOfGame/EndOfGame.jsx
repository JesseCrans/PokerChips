// EndOfGame handles the end of the game

import './EndOfGame.css';

export default function EndOfGame({ gameState, setGameState }) {
  return (
    <section className='end-of-game'>
      <h2>End of the Game</h2>
      <p>
        {gameState.players[0].name} won the game after {gameState.round} rounds!
      </p>
      <button
        className='new-game-button'
        onClick={() => {
          if (confirm('Are you sure?')) {
            setGameState({
              ...gameState,
              inProgress: false,
              endOfGame: false,
            });
          } else {
            return false;
          }
        }}
      >
        Start a New Game
      </button>
    </section>
  )
}