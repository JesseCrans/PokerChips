// Starting chips component handles the setting of the starting chips

export default function StartingChips({ startingChips, updateNewGame }) {
  function handleChange(e) {
    updateNewGame(
      'startingChips',
      e.target.value
    )
  }

  return (
    <fieldset className="starting-chips">
      <legend>
        Starting Chips
      </legend>
      <label>
        <input
          type="number"
          onChange={handleChange}
          value={startingChips}
          name="starting-chips-input"
          className="starting-chips-input"
          step={1000}
        />
      </label>
    </fieldset>
  )
}