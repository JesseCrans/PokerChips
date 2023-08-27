import './MainInfo.css'

export default function MainInfo({ phase, pot }) {
    let cardArray = [];
    if (phase > 0) {
        for (let i = 0; i < 5; i++) {
            if (i < phase + 2) {
                cardArray.push('open')
            } else {
                cardArray.push('hidden')
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            cardArray.push('hidden')
        }
    }

    return (
        <div className='main-info'>
            <div className='seperator' />
            <div className='card-graphic'>
                {
                    cardArray.map((card) =>
                        <div className={`card ${card}`} />
                    )
                }
            </div>
            <div className='current-pot'>
                {pot}
            </div>
        </div>
    )
}