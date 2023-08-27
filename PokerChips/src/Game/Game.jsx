import './Game.css'

import MainInfo from './MainInfo/MainInfo'
import Buttons from './Buttons/Buttons'
import Players from './Players/Players'
import NewPlayerForm from './NewPlayerForm/NewPlayerForm'

import PlayerLogic from './Classes/PlayerClass'

import { useState } from 'react'

export default function Game() {
  const [players, setPlayers] = useState([]);
  const [pot, setPot] = useState(0);
  const [turnPhase, setTurnPhase] = useState(0);
  const [bigBlind, setBigBlind] = useState(0);

  const [addingPlayer, setAddingPlayer] = useState(false);
  const [inputText, setInputText] = useState('');

  function addPlayer(playerName) {
    setPlayers([
      ...players,
      new PlayerLogic(playerName)
    ])
  }

  function handleAddPlayer() {
    setAddingPlayer(true);
  }

  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addPlayer(inputText);
    setAddingPlayer(false);
  }

  return (
    <section className='game'>
      <MainInfo
        phase={turnPhase}
        pot={pot}
      />
      <Buttons />
      <Players
        playersArray={players}
        handleAddPlayer={handleAddPlayer}
      />
      {
        (addingPlayer) ?
          <form
            className='new-player-form'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              onChange={handleInputChange}
              className='new-player-name'
              maxLength={10}
            />
            <button
              className='new-player-name-submit'
              type='submit'
            >
              Add Player
            </button>
          </form>
          : ''
      }
    </section>
  )
}

/*
Game structure:
    - Player object with name and current chips,
    these objects will be tracked in the state
    and passed to the Players component
    - Then we need a state for the pot
    and for the phase of turn
    these will be passed to the maininfo component

*/