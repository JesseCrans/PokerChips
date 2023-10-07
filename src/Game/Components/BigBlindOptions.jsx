export default function BigBlindOptions({
  bigBlind,
  bigBlindIncrement,
  bigBlindTurn,
  startingChips,
  updateNewGame
}) {
  function handleChange(e) {
    updateNewGame(
      e.target.name,
      e.target.value
    )
  }

  return (
    <fieldset className="big-blind-options">
      <legend>Big Blind Options</legend>
      <label>
        <p>
          Big Blind:
        </p>
        <input
          type="number"
          name='bigBlind'
          onChange={handleChange}
          value={bigBlind}
          min={0}
          max={startingChips}
        />
      </label>
      <label>
        <p>
          Big Blind Increment:
        </p>
        <input
          type="number"
          name='bigBlindIncrement'
          onChange={handleChange}
          value={bigBlindIncrement}
          min={0}
        />
      </label>
      <label>
        <p>
          Big Blind increases after this many rounds.
        </p>
        <input
          type="number"
          name='bigBlindTurn'
          onChange={handleChange}
          value={bigBlindTurn}
          min={0}
        />
      </label>
    </fieldset>
  )
}