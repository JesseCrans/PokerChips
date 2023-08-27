import './Buttons.css'
import GameButton from './GameButton/GameButton'

export default function Buttons() {
    return (
        <div className='buttons'>
            <GameButton name='call' />
            <GameButton name='raise' />
            <GameButton name='fold' />
        </div>
    )
}