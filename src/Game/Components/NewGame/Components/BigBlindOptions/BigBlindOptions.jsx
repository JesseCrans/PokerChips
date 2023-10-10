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
      <legend>Big Blind Options</legend>
      <label
        title='Big Blind amount'
      >
        🪙
        <input
          type="number"
          name='bigBlind'
          onChange={handleChange}
          value={bigBlind}
          min={0}
          max={startingChips}
        />
      </label>
      <label
        title='Big Blind Increment'
      >
        🪙📈
        <input
          type="number"
          name='bigBlindIncrement'
          onChange={handleChange}
          value={bigBlindIncrement}
          min={0}
        />
      </label>
      <label
        title="Big Blind increases after this many turns"
      >
        ⌛
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