import './NewPlayerForm.css';

export default function NewPlayerForm() {
  return (
    <form className='new-player-form'>
      <input type='text' placeholder='Jeremy' />
      <button type='submit'>Add Player</button>
    </form>
  )
}