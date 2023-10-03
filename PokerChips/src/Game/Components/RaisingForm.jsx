import { useState } from "react"
import GameInfo from "./GameInfo";

// TODO: doesnt work properly
// So the rules are:
// The minimum raise amount is the same as the previous bet

export default function RaisingForm({ gameState, setGameState }) {

  const difference = gameState.highestBet - gameState.players[gameState.turn].bet;
  let nextTurn = (gameState.turn + 1) % gameState.players.length;
  while (!gameState.players[nextTurn].in) {
    nextTurn = (nextTurn + 1) % gameState.players.length;
  }
  const minRaise = Math.min(difference + gameState.previousBet, gameState.players[gameState.turn].chips);
  const maxRaise = gameState.players[gameState.turn].chips;

  const [raiseAmount, setRaiseAmount] = useState(minRaise); // declare use state here so we can use the minRaise value

  function handleChange(e) {
    e.preventDefault();
    setRaiseAmount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setGameState({
      ...gameState,
      players: gameState.players.map((player, index) => {
        if (index === gameState.turn) {
          return {
            ...player,
            bet: player.bet + parseInt(raiseAmount),
            chips: player.chips - parseInt(raiseAmount),
          }
        } else {
          return player;
        }
      }),
      pot: gameState.pot + parseInt(raiseAmount),
      highestBet: Math.max(gameState.highestBet, gameState.highestBet + parseInt(raiseAmount) - difference), // what if someone raises less than the difference?
      previousBet: Math.max(parseInt(raiseAmount) - difference, gameState.previousBet), // we keep the highest bet of the round
      playersToBet: gameState.players.filter(player => player.in).length - 1,
      turn: nextTurn,
      playerIsRaising: false,
    })
  }

  return (
    <section className="raising-form">
      <h2>Raise your bet</h2>
      <form
        className="raising-form-form"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Raise</legend>
          <p>Call for: {difference}</p>
          <p>Raise by: {raiseAmount - difference}</p>
          <p>Total spent: {raiseAmount}</p>
        </fieldset>
        <fieldset>
          <legend>Specific Value</legend>
          <label>
            <p>Input range amount:</p>
            <input
              type="number"
              min={minRaise}
              max={maxRaise}
              value={raiseAmount}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Slide range amount:</p>
            <input
              type="range"
              min={minRaise}
              max={maxRaise}
              value={raiseAmount}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Fractions</legend>
          {/* 
            The fractions are like:
            1/4 pot, 1/2 pot, 3/4 pot, pot
            but of course this should respect the min and max raise amounts
            so before hand we calculate what 1/4, 1/2, 3/4, and 1 are then if its less than the minRaise we disable the button
          */}
        </fieldset>
        <input type="submit" value="Raise" />
        <button
          onClick={() => setGameState({
            ...gameState,
            playerIsRaising: false,
          })}
        >
          Cancel
        </button>
      </form>
    </section>
  )
}