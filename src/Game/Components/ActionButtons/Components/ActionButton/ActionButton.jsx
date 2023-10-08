// ActionButton handles the individual action button

export default function ActionButton({ name, handleClick, disabled, title }) {
  return (
    <li>
      <button onClick={handleClick} disabled={disabled} title={title}>
        {name}
      </button>
    </li>
  )
}