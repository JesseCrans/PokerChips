export default function StartingChips({ startingChips, updateNewGame }) {
  function handleChange(e) {
    updateNewGame(
      'startingChips',
      e.target.value
    )
  }

  return (
    <fieldset className="starting-chips">
      <legend>Starting Chips</legend>
      <label>
        <input
          type="number"
          onChange={handleChange}
          value={startingChips}
        />
      </label>
    </fieldset>
  )
}