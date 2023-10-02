import { useState, useEffect } from "react"

export default function EndOfRound({ gameState, setGameState }) {
  const [endState, setEndState] = useState({
    pots: [],
    winners: [],
  });

  useEffect(() => {
    const newPots = calculatePots();
    const newWinners = newPots.map(() => {
      return (
        gameState.players
          .filter(player => player.in)
          .map(() => false)
      )
    })
    console.log(newWinners);

    setEndState({
      pots: newPots,
      winners: newWinners,
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    // check if a winner was selected for each pot
    for (let i = 0; i < endState.winners.length; i++) {
      if (endState.winners[i].filter(winner => winner).length < 1) {
        alert(`Please select a winner for pot ${i + 1}`);
        return;
      }
    }

    // updating state variables for next round
    let newPlayers = gameState.players.map((player, index) => {
      for (let i = 0; i < endState.winners.length; i++) {
        if (endState.winners[i][index]) {
          player.chips += endState.pots[i];
        }
      }
      return ({
        ...player,
        bet: 0,
        in: true,
      })
    });

    newPlayers = newPlayers.filter(player => player.chips > 0);
    const newDealer = (gameState.dealer + 1) % newPlayers.length;
    const newSmallBlind = (newDealer + 1) % newPlayers.length;
    const newBigBlind = (newDealer + 2) % newPlayers.length;
    const newPlayersToBet = newPlayers.length;
    const newPhase = 0;
    const newTurn = (newDealer + 3) % newPlayers.length;
    const newRound = gameState.round + 1;
    // increase big blind
    let newBigBlindAmount = gameState.bigBlind;
    if (newRound % gameState.bigBlindTurn === 0 && gameState.bigBlindTurn > 0) {
      newBigBlindAmount += gameState.bigBlindIncrement;
    }

    // blinds
    newPlayers[newSmallBlind].bet = Math.round(newBigBlindAmount / 2);
    newPlayers[newSmallBlind].chips -= Math.round(newBigBlindAmount / 2);
    newPlayers[newBigBlind].bet = newBigBlindAmount;
    newPlayers[newBigBlind].chips -= newBigBlindAmount;
    const newPot = newBigBlindAmount + Math.round(newBigBlindAmount / 2);
    const newHighestBet = newBigBlindAmount;

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

  function handleChange(e) {
    const newWinners = [...endState.winners];
    const potIndex = parseInt(e.target.name[0]);
    const playerIndex = parseInt(e.target.name[1]);
    newWinners[
      potIndex
    ][
      playerIndex
    ] = e.target.checked;
    setEndState({
      ...endState,
      winners: newWinners,
    })
  }

  function calculatePots() {
    // TODO: this calculation is wrong
    let playerBets = gameState.players.map(player => player.bet);
    let newPots = [];
    while (playerBets.filter(bet => bet > 0).length > 0) {
      let lowestBet = Math.min(...playerBets.filter(bet => bet > 0));
      let pot = 0;
      for (let i = 0; i < playerBets.length; i++) {
        playerBets[i] -= lowestBet;
        pot += lowestBet;
      }
      newPots.push(pot);
    }

    return newPots;
  }

  return (
    <section className='end-of-round' >
      <h2>End of Round</h2>
      <form className='end-of-round-form'>
        <p>Who won?</p>
        {
          endState.pots.map((pot, potIndex) => {
            return (
              <fieldset>
                <legend>
                  Pot {potIndex + 1}: {pot}
                </legend>
                {
                  gameState.players
                    .filter(player => player.in)
                    .map((player, playerIndex) => {
                      return (
                        <label
                          key={player.name}
                        >
                          <p>
                            {player.name}
                          </p>
                          <input
                            type="checkbox"
                            name={`${potIndex}` + `${playerIndex}`}
                            checked={
                              endState.winners[potIndex][playerIndex]
                            }
                            onChange={handleChange}
                          />
                        </label>
                      )
                    })
                }
              </fieldset>
            )
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