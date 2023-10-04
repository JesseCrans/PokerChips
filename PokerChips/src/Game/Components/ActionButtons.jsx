import ActionButton from "./ActionButton"

export default function ActionButtons({
  callFunction, raiseFunction, foldFunction, playerIsChecking, playerCanRaise
}) {
  let name = playerIsChecking ? 'Check' : 'Call';
  let disabled = playerCanRaise ? false : true;
  console.log(disabled);

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
          disabled={disabled}
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