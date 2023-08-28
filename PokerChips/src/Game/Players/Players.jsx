import './Players.css';

export default function Players({
  playerList, turnIndex, dealerIndex
}) {
  return (
    <div className='players'>
      <div className='left-side'>
        <p>Player1</p>
        <p>Player2</p>
        <p>Player3</p>
      </div>
      <div className='right-side'>
        <p>Player4</p>
        <p>Player5</p>
      </div>
    </div>
  )
}