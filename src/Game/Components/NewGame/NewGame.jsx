// NewGame handles the creation of a new game

// importing functions
import { useState } from "react"

// importing components
import NewPlayers from "./Components/NewPlayers/NewPlayers"
import StartingChips from "./Components/StartingChips/StartingChips"
import BigBlindOptions from "./Components/BigBlindOptions/BigBlindOptions"

// importing styles
import "./NewGame.css"

export default function NewGame({ gameState, setGameState }) {
  let [newGame, setNewGame] = useState({
    playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'],
    startingChips: 10000,
    bigBlind: 50,
    bigBlindIncrement: 50,
    bigBlindTurn: 10,
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
    const newPhase = 0;
    const newRound = 0;
    const newBigBlindAmount = parseInt(newGame.bigBlind);
    const newBigBlindIncrement = parseInt(newGame.bigBlindIncrement);
    const newBigBlindTurn = parseInt(newGame.bigBlindTurn);
    const newPot = newBigBlindAmount + Math.round(newBigBlindAmount / 2);
    const newInProgress = true;

    // blinds
    newPlayers[newSmallBlind].bet = Math.round(newBigBlindAmount / 2);
    newPlayers[newSmallBlind].chips -= Math.round(newBigBlindAmount / 2);
    newPlayers[newBigBlind].bet = newBigBlindAmount;
    newPlayers[newBigBlind].chips -= newBigBlindAmount;

    if (newPlayers.length > 1) {
      setGameState({
        ...gameState,
        players: newPlayers,
        playersToBet: newPlayersToBet,
        bigBlind: newBigBlindAmount,
        bigBlindIncrement: newBigBlindIncrement,
        bigBlindTurn: newBigBlindTurn,
        pot: newPot,
        highestBet: newBigBlindAmount,
        dealer: newDealer,
        turn: newTurn,
        round: newRound,
        inProgress: newInProgress,
        phase: newPhase,
      });
    } else {
      alert('Minimum 2 players.');
    }
  }

  return (
    <section
      className="new-game"
    >
      <h2 className="new-game-title">Make a New Game</h2>
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
        <button
          className="start-new-game"
          type="submit"
        >
          Start New Game
        </button>
      </form>
    </section>
  )
}