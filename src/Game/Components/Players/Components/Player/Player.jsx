// Player handles the displaying of an individual player

export default function Player({ player, isDealer, isTurn }) {
  // setting player color based on if they are in the round

  let className = "player";
  if (!player.in) {
    className += " out";
  }
  if (isDealer) {
    className += " dealer";
  }
  if (isTurn) {
    className += " turn";
  }

  return (
    <li className={className}>
      {isDealer ? <div>D</div> : ''}
      <h4>
        {player.name}
      </h4>
      <p>{player.chips}</p>
      <p>{player.bet}</p>
    </li>
  )
}