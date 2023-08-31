export default function Player({ player, isDealer, isTurn }) {
  return (
    <li className="player">
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
      <p>${player.chips}</p>
    </li>
  )
}