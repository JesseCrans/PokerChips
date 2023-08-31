import { useState } from "react"
import NewPlayers from "./NewPlayers"
import StartingChips from "./StartingChips"
import BigBlindOptions from "./BigBlindOptions"
import PlayerLogic from "../Auxiliary/PlayerLogic"

export default function NewGame({ gameState, setGameState }) {
  let [newGame, setNewGame] = useState({
    playerNames: [''],
    startingChips: 0,
    bigBlind: 0,
    bigBlindIncrement: 0,
    bigBlindTurn: 0
  })

  function updateNewGame(key, value) {
    setNewGame({
      ...newGame,
      [key]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    let playerList = newGame.playerNames
      .filter(name => name)
      .map((playerName) =>
        new PlayerLogic(playerName, newGame.startingChips)
      );
    if (playerList.length > 1) {
      setGameState({
        ...gameState,
        players: playerList,
        bigBlind: newGame.bigBlind,
        bigBlindIncrement: newGame.bigBlindIncrement,
        bigBlindTurn: newGame.bigBlindTurn,
        inProgress: true,
      });
    } else {
      alert('Minimum 2 players.');
    }
  }

  return (
    <section
      className="new-game"
    >
      <h2>Make a New Game</h2>
      <form
        className="new-game-form"
        onSubmit={handleSubmit}
      >
        <NewPlayers
          playerNames={newGame.playerNames}
          updateNewGame={updateNewGame}
        />
        <StartingChips
          startingChips={newGame.startingChips}
          updateNewGame={updateNewGame}
        />
        <BigBlindOptions
          bigBlind={newGame.bigBlind}
          bigBlindIncrement={newGame.bigBlindIncrement}
          bigBlindTurn={newGame.bigBlindTurn}
          startingChips={newGame.startingChips}
          updateNewGame={updateNewGame}
        />
        <input
          type="submit"
          value="Start Game"
        />
      </form>
    </section>
  )
}