// NewPlayers handles the adding of new players to a new game

// importing functions
import { useState } from "react"

export default function NewPlayers({ playerNames, updateNewGame }) {
  function handleChange(e) {
    let newPlayers = [...playerNames];
    newPlayers[e.target.name] = e.target.value.slice(0, 10);

    updateNewGame(
      'playerNames',
      newPlayers
    );
  }

  function handleAddPlayer(e) {
    e.preventDefault()
    updateNewGame(
      'playerNames',
      [...playerNames, '']
    );
  }

  function handleRemovePlayer(e) {
    e.preventDefault()
    let newPlayers = [...playerNames];
    newPlayers.pop();

    updateNewGame(
      'playerNames',
      newPlayers
    )
  }

  return (
    <fieldset className="new-players">
      <legend>Player Names</legend>
      <ol className="new-player-list">
        {
          playerNames.map((player, index) =>
            <li key={index}>
              <label>
                <input
                  name={index}
                  onChange={handleChange}
                  value={player}
                  minLength={1}
                  placeholder="Enter Name Here"
                />
              </label>
            </li>
          )
        }
      </ol>
      <div className="new-player-buttons">
        <button
          className="add-new-player"
          onClick={handleAddPlayer}
        >
          +
        </button>
        <button
          className="remove-new-player"
          onClick={handleRemovePlayer}
        >
          -
        </button>
      </div>
    </fieldset>
  )
}