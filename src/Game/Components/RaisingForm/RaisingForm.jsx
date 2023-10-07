// Raising Form handles the raising of the players bet

// importing functions
import { useState } from "react"

export default function RaisingForm({ gameState, setGameState }) {
  const difference = gameState.highestBet - gameState.players[gameState.turn].bet; // calculate the difference between the highest bet and the current bet
  let nextTurn = (gameState.turn + 1) % gameState.players.length; // calculate the next turn
  while (!gameState.players[nextTurn].in) {
    nextTurn = (nextTurn + 1) % gameState.players.length;
  }
  const minRaise = Math.min(difference + gameState.bigBlind, gameState.players[gameState.turn].chips); // calculate the minimum raise
  const maxRaise = gameState.players[gameState.turn].chips; // calculate the maximum raise

  const [raiseAmount, setRaiseAmount] = useState(minRaise); // declare use state here so we can use the minRaise value

  let potFractionsDisabled = [false, false, false, false, false]; // 1/4, 1/2, 3/4, pot, all in
  let potFractions = [];
  for (let i = 0; i < potFractionsDisabled.length - 1; i++) {
    let fractionAmount = Math.floor((gameState.pot) * (i + 1) / 4); // calculate from pot with call amount
    potFractions.push(fractionAmount + difference); // add difference to get raise amount
    if (fractionAmount < gameState.bigBlind || fractionAmount + difference > maxRaise) { // if raise is less than big blind or total chips put in exceeds max raise
      potFractionsDisabled[i] = true;
    }
  }
  potFractions.push(maxRaise); // add all in to the end of the array

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
          {potFractions.map((fraction, index) => {
            let fractionString = "";
            switch (index) {
              case 0:
              case 2:
                fractionString = `${index + 1}/4`;
                break;
              case 1:
                fractionString = `1/2`;
                break;
              case 3:
                fractionString = `Pot`;
                break;
              case 4:
                fractionString = `All in`;
                break;
            }
            if (!potFractionsDisabled[index]) {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setRaiseAmount(fraction);
                  }}
                >
                  {fractionString}
                </button>
              )
            }
            return (
              <button
                key={index}
                disabled={true}
                title='Big Blind is minimum raise'
              >
                {fractionString}
              </button>
            )
          })}
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