import CardGraphic from "./CardGraphic"

export default function GameInfo({
  phase,
  pot,
  bigBlind
}) {
  return (
    <section className="game-info">
      <h2>Game Info</h2>
      <div className="card-graphic">
        <h3>Phase</h3>
        <CardGraphic
          phase={phase}
        />
      </div>
      <div className="pot">
        <h3>Pot</h3>
        <p>${pot}</p>
      </div>
      <div className="big blind">
        <h3>Big Blind</h3>
        <p>${bigBlind}</p>
      </div>
    </section>
  )
}