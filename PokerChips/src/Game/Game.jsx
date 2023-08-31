import './Game.css'

import GameInfo from './Components/GameInfo';
import Players from './Components/Players';
import ActionButtons from './Components/ActionButtons';
import NewGame from './Components/NewGame';

import PlayerLogic from './Auxiliary/PlayerLogic';

import { useState, useEffect } from 'react'

export default function Game() {
  const [gameState, setGameState] = useState({
    players: [],
    turn: 0,
    dealer: 0,
    round: 0,
    phase: 0,
    bigBlind: 0,
    bigBlindIncrement: 0,
    bigBlindTurn: 0,
    pot: 0,
    inProgress: false,
  })

  useEffect(() => {
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    if (gameState.players.length > 0) {
      setGameState(gameState)
    }
  }, []);

  useEffect(() => {
    if (gameState.players.length > 0) {
      localStorage.setItem('gameState', JSON.stringify(gameState));
    }
  }, [gameState])

  function updateGameState(key, value) {
    setGameState({
      ...gameState,
      [key]: value,
    })
  }

  function callFunction() {
    console.log('Call');
    return;
  }

  function raiseFunction() {
    console.log('Raise');
    return;
  }

  function foldFunction() {
    console.log('Fold');
    return;
  }

  if (gameState.inProgress) {
    return (
      <section className='game'>
        <GameInfo
          phase={gameState.phase}
          pot={gameState.pot}
          bigBlind={gameState.bigBlind}
        />
        <Players
          players={gameState.players}
          turn={gameState.turn}
          dealer={gameState.dealer}
        />
        <ActionButtons
          callFunction={callFunction}
          raiseFunction={raiseFunction}
          foldFunction={foldFunction}
        />
        <button
          className='new-game-button'
          onClick={() => {
            if (confirm('Are you sure?')) {
              updateGameState('inProgress', false)
            } else {
              return false;
            }
          }}
        >
          Start a New Game
        </button>
      </section>
    )
  } else {
    return (
      <section className='new-game'>
        <NewGame
          gameState={gameState}
          setGameState={setGameState}
        />
      </section>
    )
  }
}