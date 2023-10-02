import './Game.css'

import GameInfo from './Components/GameInfo';
import Players from './Components/Players';
import ActionButtons from './Components/ActionButtons';
import NewGame from './Components/NewGame';
import RaisingForm from './Components/RaisingForm';
import EndOfRound from './Components/EndOfRound';
import EndOfGame from './Components/EndOfGame';

import { useState, useEffect } from 'react'

export default function Game() {
  const initialGameState = JSON.parse(sessionStorage.getItem('gameState')) ||
  {
    players: [],
    playersToBet: 0,
    turn: 0,
    dealer: 0,
    round: 0,
    phase: 0,
    bigBlind: 0,
    bigBlindIncrement: 0,
    bigBlindTurn: 0,
    pot: 0,
    highestBet: 0,
    previousBet: 0,
    inProgress: false,
    playerIsChecking: false,
    playerIsRaising: false,
    endOfRound: false,
    endOfGame: false,
  };
  const [gameState, setGameState] = useState(initialGameState);

  // on game state change
  useEffect(() => {
    if (gameState.inProgress === false) {
      return;
    }

    if (gameState.players.length <= 1) {
      if (gameState.endOfGame === false) {
        setGameState({
          ...gameState,
          endOfGame: true,
        })
      }
      return;
    }

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
      (newPlayersToBet <= 0 && gameState.players.filter((player) => player.in && player.chips > 0).length <= 1) // only one player left with chips left
    ) {
      newEndOfRound = true;
    }

    // check if the next player is checking
    const playerDifference = gameState.highestBet - gameState.players[gameState.turn].bet;
    let newPlayerIsChecking = false;
    if (playerDifference <= 0) {
      newPlayerIsChecking = true;
    }

    // update the game state if something changed
    if (
      gameState.phase !== newPhase ||
      gameState.endOfRound !== newEndOfRound ||
      gameState.playersToBet !== newPlayersToBet ||
      gameState.playerIsChecking !== newPlayerIsChecking
    ) {
      setGameState({
        ...gameState,
        phase: newPhase,
        endOfRound: newEndOfRound,
        playersToBet: newPlayersToBet,
        playerIsChecking: newPlayerIsChecking,
      });
      return;
    } else { // if nothing changed check if the current player is all in and increment the turn if they are
      const playerChips = gameState.players[gameState.turn].chips;
      const playerBet = gameState.players[gameState.turn].bet;
      const playerIn = gameState.players[gameState.turn].in;
      let newTurn = gameState.turn;
      if (playerChips <= 0 && playerBet > 0 && playerIn) {
        let newTurn = nextTurn();
        newPlayersToBet--;
      }
      if (
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
    if (gameState.inProgress) {
      sessionStorage.setItem('gameState', JSON.stringify(gameState));
    }
  }, [gameState])

  function nextTurn() {
    let nextTurn = (gameState.turn + 1) % gameState.players.length;
    while (!gameState.players[nextTurn].in) {
      nextTurn = (nextTurn + 1) % gameState.players.length;
    }
    return nextTurn;
  }

  function callFunction() {
    // handle the call or check

    // update the player's bet and chips
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

    // update the pot
    const newPot = gameState.pot + difference;

    // decrease playersToBet
    const newPlayersToBet = gameState.playersToBet - 1;

    // increase turn
    const newTurn = nextTurn();

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
    // raise it handled in the raising form component

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

    // decrease playersToBet
    const newPlayersToBet = gameState.playersToBet - 1;

    // increase turn
    const newTurn = nextTurn();

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

  // returning the correct component(s)
  if (gameState.playerIsRaising) {
    return (
      <RaisingForm
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  } else if (gameState.endOfRound) {
    return (
      <EndOfRound
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  } else if (gameState.endOfGame) {
    return (
      <EndOfGame
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  } else if (gameState.inProgress) {
    return (
      <section className='game'>
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
        />
        <div className='debug'>
          <button
            onClick={() => console.log(gameState)}
          >
            Debug Info
          </button>
        </div>
        <button
          className='new-game-button'
          onClick={() => {
            if (confirm('Are you sure?')) {
              setGameState({
                ...gameState,
                inProgress: false,
              });
            } else {
              return false;
            }
          }}
        >
          Start a New Game
        </button>
      </section>
    )
  } else {
    return (
      <section className='new-game'>
        <NewGame
          gameState={gameState}
          setGameState={setGameState}
        />
      </section>
    )
  }
}