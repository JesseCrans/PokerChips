// CardGraphic handles the displaying of the cards in the round

// import style
import './CardGraphic.css'

export default function CardGraphic({ phase }) {
  let number = 0;
  switch (phase) {
    case 0:
      number = 0;
      break;
    case 1:
      number = 3;
      break;
    case 2:
      number = 4;
      break;
    case 3:
    case 4:
      number = 5;
      break;
    default:
      break;
  }
  let open = [];
  for (let i = 1; i <= 5; i++) {
    (i <= number) ?
      open.push(true) :
      open.push(false)
  }
  return (
    <ol className='card-list'>
      {
        open.map((card, index) => {
          let style = 'card ';
          (card) ?
            style += 'open' :
            style += 'hidden';
          return (
            <li key={index}>
              <div className={style} />
            </li>
          )
        })
      }
    </ol>
  )
}