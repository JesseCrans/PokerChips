import { useState } from "react"

export default function RaisingForm({ gameState, setGameState }) {
  const [raiseAmount, setRaiseAmount] = useState(0);

  const difference = gameState.highestBet - gameState.players[gameState.turn].bet;
  let nextTurn = (gameState.turn + 1) % gameState.players.length;
  while (!gameState.players[nextTurn].in) {
    nextTurn = (nextTurn + 1) % gameState.players.length;
  }

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
      highestBet: gameState.highestBet + parseInt(raiseAmount) - difference,
      previousBet: parseInt(raiseAmount) - difference,
      playersToBet: gameState.players.filter(player => player.in).length - 1,
      turn: nextTurn,
      playerIsRaising: false,
    })
  }

  return (
    <section className="raising-form">
      <h2>Make a raise</h2>
      <form
        className="raising-form-form"
        onSubmit={handleSubmit}
      >
        <input
          type="number"
          min={
            difference + gameState.previousBet
          }
          max={gameState.players[gameState.turn].chips}
          value={raiseAmount}
          onChange={handleChange}
        />
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