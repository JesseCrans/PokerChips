import { useState } from "react"
import NewPlayers from "./NewPlayers"
import StartingChips from "./StartingChips"
import BigBlindOptions from "./BigBlindOptions"

export default function NewGame({ gameState, setGameState }) {
  let [newGame, setNewGame] = useState({
    playerNames: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    startingChips: 5000,
    bigBlind: 50,
    bigBlindIncrement: 50,
    bigBlindTurn: 5
  })

  function updateNewGame(key, value) {
    setNewGame({
      ...newGame,
      [key]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newPlayers = newGame.playerNames.map((playerName) => {
      return ({
        name: playerName,
        chips: newGame.startingChips,
        bet: 0,
        in: true,
      })
    })
    const newPlayersToBet = newPlayers.length;
    const newDealer = Math.floor(Math.random() * newPlayers.length);
    const newSmallBlind = (newDealer + 1) % newPlayers.length;
    const newBigBlind = (newDealer + 2) % newPlayers.length;
    const newTurn = (newDealer + 3) % newPlayers.length;
    const newRound = 0;
    const newPot = newGame.bigBlind + Math.round(newGame.bigBlind / 2);
    const newHighestBet = newGame.bigBlind;
    const newPreviousBet = newGame.bigBlind;
    const newInProgress = true;

    // blinds
    newPlayers[newSmallBlind].bet = Math.round(newGame.bigBlind / 2);
    newPlayers[newSmallBlind].chips -= Math.round(newGame.bigBlind / 2);
    newPlayers[newBigBlind].bet = newGame.bigBlind;
    newPlayers[newBigBlind].chips -= newGame.bigBlind;

    if (newPlayers.length > 1) {
      setGameState({
        ...gameState,
        players: newPlayers,
        playersToBet: newPlayersToBet,
        bigBlind: newGame.bigBlind,
        bigBlindIncrement: newGame.bigBlindIncrement,
        bigBlindTurn: newGame.bigBlindTurn,
        pot: newPot,
        highestBet: newHighestBet,
        previousBet: newPreviousBet,
        dealer: newDealer,
        turn: newTurn,
        round: newRound,
        inProgress: newInProgress,
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