export default function Player({ player, isDealer, isTurn, isIn }) {
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