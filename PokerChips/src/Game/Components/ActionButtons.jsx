import ActionButton from "./ActionButton"

export default function ActionButtons({
  callFunction, raiseFunction, foldFunction, playerIsChecking
}) {
  let name = playerIsChecking ? 'Check' : 'Call';

  return (
    <section className="action-buttons">
      <h2>Action Buttons</h2>
      <ul className="button-list">
        <ActionButton
          name={name}
          handleClick={callFunction}
          className="button"
        />
        <ActionButton
          name='Raise'
          handleClick={raiseFunction}
          className="button"
        />
        <ActionButton
          name='Fold'
          handleClick={foldFunction}
          className="button"
        />
      </ul>
    </section>
  )
}