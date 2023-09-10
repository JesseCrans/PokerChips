import { useState } from "react"

export default function EndOfRound({ gameState, setGameState }) {
  const [winningPlayer, setWinningPlayer] = useState(-1);

  function handleSubmit(e) {
    e.preventDefault();

    // check if a winner was selected
    if (winningPlayer < 0) {
      alert('Please select a winner.');
      return;
    }

    // updating state variables for next round
    let newPlayers = gameState.players.map((player, index) => {
      if (winningPlayer === index) {
        return {
          ...player,
          chips: player.chips + gameState.pot,
          bet: 0,
          in: true,
        }
      } else {
        return {
          ...player,
          bet: 0,
          in: true,
        }
      }
    });
    newPlayers = newPlayers.filter(player => player.chips > 0);
    const newDealer = (gameState.dealer + 1) % newPlayers.length;
    const newSmallBlind = (newDealer + 1) % newPlayers.length;
    const newBigBlind = (newDealer + 2) % newPlayers.length;
    const newPlayersToBet = newPlayers.length;
    const newPot = gameState.bigBlind + Math.round(gameState.bigBlind / 2);
    const newHighestBet = gameState.bigBlind;
    const newPhase = 0;
    const newTurn = (newDealer + 3) % newPlayers.length;
    const newRound = gameState.round + 1;
    // increase big blind
    let newBigBlindAmount = gameState.bigBlind;
    if (newRound % gameState.bigBlindTurn === 0) {
      newBigBlindAmount += gameState.bigBlindIncrement;
    }

    // blinds
    newPlayers[newSmallBlind].bet = Math.round(gameState.bigBlind / 2);
    newPlayers[newSmallBlind].chips -= Math.round(gameState.bigBlind / 2);
    newPlayers[newBigBlind].bet = gameState.bigBlind;
    newPlayers[newBigBlind].chips -= gameState.bigBlind;

    setGameState({
      ...gameState,
      players: newPlayers,
      playersToBet: newPlayersToBet,
      bigBlind: newBigBlindAmount,
      pot: newPot,
      highestBet: newHighestBet,
      previousBet: newHighestBet,
      dealer: newDealer,
      phase: newPhase,
      turn: newTurn,
      round: newRound,
      endOfRound: false,
    })
  }

  return (
    <section className='end-of-round' >
      <h2>End of Round</h2>
      <form className='end-of-round-form'>
        <p>Who won?</p>
        {
          gameState.players.map((player, index) => {
            if (player.in) {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setWinningPlayer(index)
                  }}
                >
                  {player.name}
                </button>
              )
            }
          })
        }
        <input
          type='submit'
          value='Next Round'
          onClick={handleSubmit}
        />
      </form>
    </section>
  )
}