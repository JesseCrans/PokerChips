// Player handles the displaying of an individual player

import "./Player.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faD } from '@fortawesome/free-solid-svg-icons';

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
      {isDealer ? <div className="dealer-button">
        <FontAwesomeIcon icon={faD} />
      </div> : ''}
      <h4>
        {player.name}
      </h4>
      <p title="Chips">${player.chips}</p>
      <p title="Bet">${player.bet}</p>
    </li>
  )
}