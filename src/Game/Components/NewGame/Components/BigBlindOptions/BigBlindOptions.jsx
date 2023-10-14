// BigBlindOptions handles the setting of the big blind options at the start of the game

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
      <legend>
        Big Blind Options
      </legend>
      <label
        title='Big Blind amount'
      >
        <p>
          Big Blind starting amount:
        </p>
        <input
          type="number"
          name='bigBlind'
          onChange={handleChange}
          value={bigBlind}
          min={0}
          max={startingChips}
          step={50}
        />
      </label>
      <label
        title='Big Blind Increment'
      >
        <p>
          Increase amount:
        </p>
        <input
          type="number"
          name='bigBlindIncrement'
          onChange={handleChange}
          value={bigBlindIncrement}
          min={0}
          step={50}
        />
      </label>
      <label
        title="Big Blind increases after this many turns"
      >
        <p>
          Increase interval (turns):
        </p>
        <input
          type="number"
          name='bigBlindTurn'
          onChange={handleChange}
          value={bigBlindTurn}
          min={0}
          step={1}
        />
      </label>
    </fieldset>
  )
}