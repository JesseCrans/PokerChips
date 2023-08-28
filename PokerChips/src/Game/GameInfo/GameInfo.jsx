import './GameInfo.css';
import CardGraphic from './CardGraphic/CardGraphic';

export default function GameInfo({
  phaseOfTurn, chipsInPot, bigBlind
}) {
  return (
    <div className='game-info'>
      <CardGraphic phaseOfTurn={phaseOfTurn} />
      <h2 className='chips-in-pot'>
        {chipsInPot}
      </h2>
      <h3 className='big-blind'>
        {bigBlind}
      </h3>
    </div>
  )
}
