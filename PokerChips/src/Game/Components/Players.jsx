import Player from "./Player"

export default function Players({
  players, turn, dealer
}) {
  return (
    <section className="players">
      <h2>Players</h2>
      <ol className="player-list">
        {
          players.map((player, index) => {
            let isDealer = false;
            let isTurn = false;

            (turn === index) ?
              isDealer = true :
              '';
            (dealer === index) ?
              isTurn = true :
              '';
            return (

              <Player
                player={player}
                key={player.name}
                isDealer={isDealer}
                isTurn={isTurn}
              />
            )
          }
          )
        }
      </ol>
    </section>
  )
}