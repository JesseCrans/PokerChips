export default function ActionButton({ name, handleClick }) {
  return (
    <li>
      <button onClick={handleClick}>
        {name}
      </button>
    </li>
  )
}