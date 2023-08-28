import './Game.css'

import GameInfo from './GameInfo/GameInfo';
import Players from './Players/Players';
import ActionButtons from './ActionButtons/ActionButtons';

import { useState } from 'react'

export default function Game() {
  const [gameState, setGameState] = useState({
    playerList: [],
    turnIndex: 0,
    dealerIndex: 0,
    roundsPlayed: 0,
    phaseOfTurn: 0,
    chipsInPot: 0,
    bigBlind: 0
  })
  const [gameInProgress, setGameInProgress] = useState(true);

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

  return (
    <section className='game-section'>
      {
        (gameInProgress) ?
          <div className='game'>
            <GameInfo
              phaseOfTurn={gameState.phaseOfTurn}
              chipsInPot={gameState.chipsInPot}
              bigBlind={gameState.bigBlind}
            />
            <Players
              playerList={gameState.playerList}
              turnIndex={gameState.turnIndex}
              dealerIndex={gameState.dealerIndex}
            />
            <ActionButtons
              callFunction={callFunction}
              raiseFunction={raiseFunction}
              foldFunction={foldFunction}
            />
          </div>
          : <MakeNewGame />
      }
    </section>
  )
}