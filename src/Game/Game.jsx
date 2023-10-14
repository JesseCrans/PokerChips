import './Game.css'

// import components
import GameInfo from './Components/GameInfo/GameInfo';
import Players from './Components/Players/Players';
import ActionButtons from './Components/ActionButtons/ActionButtons';
import NewGame from './Components/NewGame/NewGame';
import RaisingForm from './Components/RaisingForm/RaisingForm';
import EndOfRound from './Components/EndOfRound/EndOfRound';
import EndOfGame from './Components/EndOfGame/EndOfGame';

// import functions
import { useState, useEffect } from 'react'

export default function Game() {
  const initialGameState = JSON.parse(sessionStorage.getItem('gameState')) ||
  {
    players: [], // list of players
    playersToBet: 0, // number of players that still need to bet in the round
    turn: 0, // index of the player whose turn it is
    dealer: 0, // index of the dealer
    round: 0, // number of rounds played
    phase: 0, // phase of the current round
    bigBlind: 0, // amount of the big blind
    bigBlindIncrement: 0, // amount the big blind increases whenever it is increased
    bigBlindTurn: 0, // number of rounds between big blind increases
    pot: 0, // amount of chips in the pot
    highestBet: 0, // highest bet in the round
    inProgress: false, // whether or not the game is in progress
    playerIsChecking: false, // whether or not the current player is checking
    playerCanRaise: false, // whether or not the current player can raise
    playerIsRaising: false, // whether or not the current player is raising
    endOfRound: false, // whether or not the round is over
    endOfGame: false, // whether or not the game is over
  };
  const [gameState, setGameState] = useState(initialGameState);

  // on game state change
  useEffect(() => {
    if (gameState.inProgress === false) {
      return;
    } // don't do anything if the game isn't in progress

    if (gameState.players.length <= 1) {
      if (gameState.endOfGame === false) {
        setGameState({
          ...gameState,
          endOfGame: true,
        })
      }
      return;
    } // end game if there is only one player left

    // increase phase if all players have bet
    let newPhase = gameState.phase;
    let newPlayersToBet = gameState.playersToBet;
    if (newPlayersToBet <= 0 && gameState.pot > 0 && gameState.phase < 3) { // the pot check is to prevent infinite loops
      newPhase = (gameState.phase + 1) % 5;
      newPlayersToBet = gameState.players.filter((player) => player.in).length;
    }

    // check if the round is over
    let newEndOfRound = gameState.endOfRound;
    if (
      newPlayersToBet <= 0 && gameState.phase === 3 || // everyone bet in the last phase
      gameState.players.filter((player) => player.in).length <= 1 || // only one player left in round
      (newPlayersToBet <= 0 && gameState.players.filter((player) => player.in && player.chips > 0).length <= 1) || // only one player left with chips left
      gameState.players.filter(player => player.in && player.chips > 0).length <= 0 // no players with chips left
    ) {
      newEndOfRound = true;
    }

    // check if the next player is checking or calling
    const playerDifference = gameState.highestBet - gameState.players[gameState.turn].bet;
    let newPlayerIsChecking = false;
    if (playerDifference <= 0) {
      newPlayerIsChecking = true;
    }

    // check if the next player is able to raise
    let newPlayerCanRaise = false;
    if (playerDifference < gameState.players[gameState.turn].chips) { // if the call amount is less than the player's chips
      newPlayerCanRaise = true;
    }

    // log the game state for debugging
    // console.log(
    //   gameState.phase !== newPhase,
    //   gameState.endOfRound !== newEndOfRound,
    //   gameState.playersToBet !== newPlayersToBet,
    //   gameState.playerIsChecking !== newPlayerIsChecking,
    //   gameState.playerCanRaise !== newPlayerCanRaise
    // )

    // update the game state if something changed
    if (
      gameState.phase !== newPhase ||
      gameState.endOfRound !== newEndOfRound ||
      gameState.playersToBet !== newPlayersToBet ||
      gameState.playerIsChecking !== newPlayerIsChecking ||
      gameState.playerCanRaise !== newPlayerCanRaise
    ) {
      setGameState({
        ...gameState,
        phase: newPhase,
        endOfRound: newEndOfRound,
        playersToBet: newPlayersToBet,
        playerIsChecking: newPlayerIsChecking,
        playerCanRaise: newPlayerCanRaise,
      });
      return;
    } else { // advance turn if player is all in
      const playerChips = gameState.players[gameState.turn].chips;
      const playerBet = gameState.players[gameState.turn].bet;
      const playerIn = gameState.players[gameState.turn].in;
      let newTurn = gameState.turn;

      if (playerChips <= 0 && playerBet > 0 && playerIn) { // if the player is all in
        let newTurn = nextTurn();
        newPlayersToBet--;
      }

      if ( // if something has changed
        (gameState.turn !== newTurn || gameState.playersToBet !== newPlayersToBet) &&
        !gameState.endOfRound // don't update the turn if the round is over to prevent infinite loops
      ) {
        setGameState({
          ...gameState,
          turn: newTurn,
          playersToBet: newPlayersToBet,
        });
        return;
      }
    }

    // setting game state in session storage
    // this has to be done loop after the update to game state
    // since the game state is updated asynchronously
    if (gameState.inProgress) {
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }
  }, [gameState])

  function nextTurn() {
    // calculate the next turn
    let nextTurn = (gameState.turn + 1) % gameState.players.length;
    while (!gameState.players[nextTurn].in) {
      nextTurn = (nextTurn + 1) % gameState.players.length;
    }
    return nextTurn;
  }

  function callFunction() {
    // handle the call or check

    // calculate the difference between the highest bet and the player's bet
    let difference = gameState.highestBet - gameState.players[gameState.turn].bet;
    if (difference > gameState.players[gameState.turn].chips) {
      difference = gameState.players[gameState.turn].chips;
    }

    const newPlayers = gameState.players.map((player, index) => {
      if (index === gameState.turn) {
        return ({
          ...player,
          bet: player.bet + difference,
          chips: player.chips - difference,
        })
      }
      return player;
    });

    const newPot = gameState.pot + difference; // update the pot
    const newPlayersToBet = gameState.playersToBet - 1; // decrease playersToBet
    const newTurn = nextTurn(); // increase turn

    // update the game state
    setGameState({
      ...gameState,
      players: newPlayers,
      playersToBet: newPlayersToBet,
      pot: newPot,
      turn: newTurn,
    });

    // log the action
    console.log(
      gameState.players[gameState.turn].name,
      gameState.playerIsChecking ? 'checked.' : 'called.',
      'Amount: ' + difference
    );
  }

  function raiseFunction() {
    // raising set to true
    // raising handled in the raising form component

    // update the game state
    setGameState({
      ...gameState,
      playerIsRaising: true,
    });
  }

  function foldFunction() {
    // handle the fold

    // update the player's in status
    const newPlayers = gameState.players.map((player, index) => {
      if (index === gameState.turn) {
        return ({
          ...player,
          in: false,
        })
      } else {
        return player;
      }
    });

    const newPlayersToBet = gameState.playersToBet - 1; // decrease playersToBet
    const newTurn = nextTurn(); // increase turn

    // update the game state
    setGameState({
      ...gameState,
      players: newPlayers,
      playersToBet: newPlayersToBet,
      turn: newTurn,
    });

    // log the action
    console.log(
      gameState.players[gameState.turn].name,
      'folded.'
    );
  }

  if (gameState.endOfRound) { // render end of round component
    return (
      <EndOfRound
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  } else if (gameState.endOfGame) { // render end of game component
    return (
      <EndOfGame
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  } else if (gameState.inProgress) { // render game component
    return (
      <section className='game'>
        {
          (gameState.playerIsRaising) ? // render raising form if player is raising
            <RaisingForm
              gameState={gameState}
              setGameState={setGameState}
            /> : ''
        }
        <GameInfo
          phase={gameState.phase}
          pot={gameState.pot}
          bigBlind={gameState.bigBlind}
        />
        <Players
          players={gameState.players}
          turn={gameState.turn}
          dealer={gameState.dealer}
        />
        <ActionButtons
          callFunction={callFunction}
          raiseFunction={raiseFunction}
          foldFunction={foldFunction}
          playerIsChecking={gameState.playerIsChecking}
          playerCanRaise={gameState.playerCanRaise}
        />
      </section>
    )
  } else { // render new game component if game is not in progress
    return (
      <NewGame
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  }
}