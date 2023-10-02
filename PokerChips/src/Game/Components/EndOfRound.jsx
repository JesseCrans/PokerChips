import { useState, useEffect } from "react"

export default function EndOfRound({ gameState, setGameState }) {
  const [endState, setEndState] = useState({
    pots: [],
    winners: [],
    selectedWinners: [],
    leftOverPot: 0,
    leftOverPotGetter: 0
  });

  useEffect(() => {
    calculatePots();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    // check if a winner was selected for each pot
    for (let i = 0; i < endState.selectedWinners.length; i++) {
      if (endState.selectedWinners[i].filter(winner => winner).length < 1) {
        alert(`Please select a winner for pot ${i + 1}`);
        return;
      }
    }

    // adding chips to winning players 
    let newPlayers = [...gameState.players];
    for (let i = 0; i < endState.selectedWinners.length; i++) {
      // this is the pot amount divided by the number of winners
      const fraction = Math.floor(endState.pots[i] / endState.selectedWinners[i].filter(winner => winner).length);
      const playerIndices = endState.winners[i].filter((winner, index) => endState.selectedWinners[i][index]);
      newPlayers = newPlayers.map((player, playerIndex) => {
        let newPlayer = {
          ...player,
          in: true,
          bet: 0,
        }
        if (playerIndices.includes(playerIndex)) {
          newPlayer.chips += fraction;
        }
        return newPlayer;
      });
    }

    // giving left over chips back to the last player
    newPlayers[endState.leftOverPotGetter].chips += endState.leftOverPot;

    // new state for next round
    newPlayers = newPlayers.filter(player => player.chips > 0);
    const newDealer = (gameState.dealer + 1) % newPlayers.length;
    const newSmallBlind = (newDealer + 1) % newPlayers.length;
    const newBigBlind = (newDealer + 2) % newPlayers.length;
    const newPlayersToBet = newPlayers.length;
    const newPhase = 0;
    const newTurn = (newDealer + 3) % newPlayers.length;
    const newRound = gameState.round + 1;
    let newBigBlindAmount = gameState.bigBlind;
    if (newRound % gameState.bigBlindTurn === 0 && gameState.bigBlindTurn > 0) {
      newBigBlindAmount += gameState.bigBlindIncrement;
    }

    // blinds
    const smallBlindPlayerAmount = Math.min(newPlayers[newSmallBlind].chips, Math.round(newBigBlindAmount / 2));
    const bigBlindPlayerAmount = Math.min(newPlayers[newBigBlind].chips, newBigBlindAmount);
    newPlayers[newSmallBlind].bet = smallBlindPlayerAmount;
    newPlayers[newSmallBlind].chips -= smallBlindPlayerAmount;
    newPlayers[newBigBlind].bet = bigBlindPlayerAmount;
    newPlayers[newBigBlind].chips -= bigBlindPlayerAmount;
    const newPot = smallBlindPlayerAmount + bigBlindPlayerAmount;
    const newHighestBet = bigBlindPlayerAmount;

    const newGameState = {
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
    }

    setGameState({
      ...gameState,
      ...newGameState,
    })
  }

  function handleChange(e) {
    const newSelectedWinners = [...endState.selectedWinners];
    const potIndex = parseInt(e.target.name[0]);
    const playerIndex = parseInt(e.target.name[1]);
    newSelectedWinners[potIndex][playerIndex] = e.target.checked;
    setEndState({
      ...endState,
      selectedWinners: newSelectedWinners,
    })
  }

  function calculatePots() {
    let playerBets = [...gameState.players].map(player => player.bet);
    let pots = [];
    let winners = [];

    if (gameState.players.filter(player => player.in).length === 1) {
      pots.push(gameState.pot);
      winners.push([gameState.players.findIndex(player => player.in)]);
      setEndState({
        ...endState,
        pots: pots,
        winners: winners,
        selectedWinners: winners.map(winner => winner.map(() => true)), // true since there is only one player
      })
      return;
    }

    while (playerBets.filter(bet => bet > 0).length > 1) {
      let pot = 0;
      let winner = [];
      const lowestBet = Math.min(
        ...playerBets.filter((bet, index) => gameState.players[index].in)
      ) // lowest bet of players still in the game
      for (let i = 0; i < playerBets.length; i++) {
        const betAmount = Math.min(playerBets[i], lowestBet);
        playerBets[i] -= betAmount;
        pot += betAmount;
        if (betAmount > 0 && gameState.players[i].in) {
          winner.push(i);
        }
      }
      pots.push(pot);
      winners.push(winner);
    }

    // give left over chips back to the last player
    let leftOverPot = 0;
    let leftOverPotGetter = 0;
    if (playerBets.filter(bet => bet > 0).length === 1) {
      const lastPlayerIndex = playerBets.findIndex(bet => bet > 0);
      leftOverPot = playerBets[lastPlayerIndex];
      leftOverPotGetter = lastPlayerIndex;
    }

    setEndState({
      ...endState,
      pots: pots,
      winners: winners,
      selectedWinners: winners.map(winner => winner.map(() => false)),
      leftOverPot: leftOverPot,
      leftOverPotGetter: leftOverPotGetter,
    })
  }

  return (
    <section className='end-of-round' >
      <h2>End of Round</h2>
      <form className='end-of-round-form'>
        <p>Who won?</p>
        {
          endState.pots.map((pot, potIndex) => {
            return (
              <fieldset
                key={pot + potIndex}
              >
                <legend>
                  Pot {potIndex + 1}: {pot}
                </legend>
                {
                  endState.winners[potIndex].map((playerIndex, winnerIndex) => {
                    // player index is the index of the player in the players array
                    // winner index is the index of the player in the winners array
                    return (
                      <label
                        key={gameState.players[playerIndex].name}
                      >
                        <p>
                          {gameState.players[playerIndex].name}
                        </p>
                        <input
                          type="checkbox"
                          name={`${potIndex}` + `${winnerIndex}`}
                          // these are the indexes of the player in the winners array
                          // so if its the first pot and second square the index of the player in the players array is
                          // endState.winners[0][1]
                          checked={
                            endState.selectedWinners[potIndex][winnerIndex]
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