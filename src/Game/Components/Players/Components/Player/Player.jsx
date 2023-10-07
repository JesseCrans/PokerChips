// Player handles the displaying of an individual player

export default function Player({ player, isDealer, isTurn }) {
  // setting player color based on if they are in the round
  let style = {
    color: 'black'
  }
  if (!player.in) {
    style = {
      color: 'gray'
    }
  }

  return (
    <li className="player" style={style}>
      <h4>
        {player.name}
        {
          (isDealer) ?
            ' (D)' : ''
        }
        {
          (isTurn) ?
            ' <=' : ''
        }
      </h4>
      <p>Chips: ${player.chips}</p>
      <p>Bet: ${player.bet}</p>
    </li>
  )
}