// NewPlayers handles the adding of new players to a new game
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"

export default function NewPlayers({ playerNames, updateNewGame }) {
  function handleChange(e) {
    let newPlayers = [...playerNames];
    let newName = e.target.value;
    newPlayers[e.target.name] = newName;

    updateNewGame(
      'playerNames',
      newPlayers
    );
  }

  function handleAddPlayer(e) {
    e.preventDefault()
    if (playerNames.length >= 6) {
      alert('Maximum of 6 players');
      return;
    }

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
      <legend>
        Player Names
      </legend>
      <ol className="new-player-list">
        {
          playerNames.map((player, index) =>
            <li
              key={index}
            >
              <input
                name={index}
                onChange={handleChange}
                value={player}
                minLength={1}
                placeholder="Enter Name Here"
              />
            </li>
          )
        }
      </ol>
      <div className="new-player-buttons">
        <button
          className="add-new-player"
          onClick={handleAddPlayer}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="remove-new-player"
          onClick={handleRemovePlayer}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
    </fieldset>
  )
}