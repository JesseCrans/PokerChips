import './Player.css'

export default function Player({ name, chips }) {
    return (
        <div className='player'>
            <div className='player-name'>
                {name}
            </div>
            <div className='player-chips'>
                {chips}
            </div>
        </div>
    )
}