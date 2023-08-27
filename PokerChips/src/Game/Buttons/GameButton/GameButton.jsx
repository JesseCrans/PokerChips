import './GameButton.css'

export default function GameButton({ name }) {
    return (
        <button className={`button ${name}`}>{name}</button>
    )
}