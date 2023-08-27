import './Players.css'
import Player from './Player/Player'
import AddPlayerButton from './AddPlayerButton/AddPlayerButton'
import { useState } from 'react'

export default function Players({ playersArray, handleAddPlayer }) {
  return (
    <div className='players'>
      <div className='left'>
        {
          playersArray.map((player, index) => {
            if (index < playersArray.length / 2) {
              return (
                <Player
                  name={player.name}
                  chips={player.chips}
                  key={player.name}
                />
              );
            }
          })
        }
      </div>
      <div className='right'>
        {
          playersArray.map((player, index) => {
            if (index >= playersArray.length / 2) {
              return (
                <Player
                  name={player.name}
                  chips={player.chips}
                  key={player.name}
                />
              );
            }
          })
        }
        {
          (playersArray.length < 6) ? <AddPlayerButton handleClick={handleAddPlayer} /> : ''
        }
      </div>
    </div>
  )
}