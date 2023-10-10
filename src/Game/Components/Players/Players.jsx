// Players handles the displaying of the players in the game

// importing components
import Player from "./Components/Player/Player"

// importing style
import "./Players.css"

export default function Players({
  players, turn, dealer
}) {
  // make left and right player lists state variables
  return (
    <section className="players">
      <h2>Players</h2>
      <ol className="player-list-left">
        {
          players.map((player, index) => {
            if (index < players.length / 2) {
              let isDealer = false;
              let isTurn = false;

              (turn === index) ?
                isTurn = true :
                '';
              (dealer === index) ?
                isDealer = true :
                '';
              return (

                <Player
                  player={player}
                  key={player.name + index}
                  isDealer={isDealer}
                  isTurn={isTurn}
                />
              )
            }
          })
        }
      </ol>
      <ol className="player-list-right">
        {
          players.map((player, index) => {
            if (index >= players.length / 2) {
              let isDealer = false;
              let isTurn = false;

              (turn === index) ?
                isTurn = true :
                '';
              (dealer === index) ?
                isDealer = true :
                '';
              return (
                <Player
                  player={player}
                  key={player.name + index}
                  isDealer={isDealer}
                  isTurn={isTurn}
                />
              )
            }
          })
        }
      </ol>
    </section>
  )
}