import ActionButton from "./ActionButton"

export default function ActionButtons({
  callFunction, raiseFunction, foldFunction
}) {
  return (
    <section className="action-buttons">
      <h2>Action Buttons</h2>
      <ul className="button-list">
        <ActionButton
          name='Call'
          handleClick={callFunction}
          className="button"
        />
        <ActionButton
          name='Raise'
          handleClick={callFunction}
          className="button"
        />
        <ActionButton
          name='Fold'
          handleClick={callFunction}
          className="button"
        />
      </ul>
    </section>
  )
}