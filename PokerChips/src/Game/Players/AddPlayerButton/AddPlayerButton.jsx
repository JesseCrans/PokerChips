import './AddPlayerButton.css'

export default function AddPlayerButton({ handleClick }) {
  return (
    <button className="add-player-button" onClick={handleClick}>
      +
    </button>
  )
}