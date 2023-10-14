// GameInfo handles the displaying of the game info

import CardGraphic from "./Components/CardGraphic/CardGraphic"
import "./GameInfo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSackDollar } from "@fortawesome/free-solid-svg-icons"

export default function GameInfo({
  phase,
  pot,
  bigBlind
}) {
  return (
    <section className="game-info">
      <h2 className="game-info-title">Table</h2>
      <div className="spacer" />
      <div className="card-graphic">
        <h3>Phase</h3>
        <CardGraphic
          phase={phase}
        />
      </div>
      <div className="pot-and-big-blind">
        <div className="pot">
          <h3>Pot</h3>
          <p title="Pot">
            ${pot}
          </p>
        </div>
        <div className="big-blind">
          <h3>Big Blind</h3>
          <p title="Big Blind">
            ${bigBlind}
          </p>
        </div>
      </div>
    </section>
  )
}