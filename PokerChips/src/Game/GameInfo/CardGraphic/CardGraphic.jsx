import './CardGraphic.css';

export default function CardGraphic({
  phaseOfTurn
}) {
  return (
    <div className='card-graphic'>
      <div className='card' />
      <div className='card' />
      <div className='card' />
      <div className='card' />
      <div className='card' />
    </div>
  )
}