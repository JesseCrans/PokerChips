// ActionButtons component handles the action buttons for the player, calling, raising, and folding

// importing components
import ActionButton from "./Components/ActionButton/ActionButton"

// importing style
import "./ActionButtons.css";

export default function ActionButtons({
  callFunction, raiseFunction, foldFunction, playerIsChecking, playerCanRaise
}) {
  let name = playerIsChecking ? 'check' : 'call';
  let disabled = playerCanRaise ? false : true;

  return (
    <section className="action-buttons">
      <h2>Action Buttons</h2>
      <ul className="button-list">
        <ActionButton
          name={name}
          title={playerIsChecking ? 'Check' : 'Call'}
          handleClick={callFunction}
        />
        <ActionButton
          name='raise'
          title='Raise'
          handleClick={raiseFunction}
          disabled={disabled}
        />
        <ActionButton
          name='fold'
          title='Fold'
          handleClick={foldFunction}
        />
      </ul>
    </section>
  )
}