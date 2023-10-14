// ActionButton handles the individual action button

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPhone, faArrowTrendUp, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ActionButton({ name, handleClick, disabled, title }) {
  return (
    <li>
      <button onClick={handleClick} disabled={disabled} title={title}>
        {
          name == 'check' ? <FontAwesomeIcon icon={faCheck} /> :
            name == 'call' ? <FontAwesomeIcon icon={faPhone} /> :
              name == 'raise' ? <FontAwesomeIcon icon={faArrowTrendUp} /> :
                name == 'fold' ? <FontAwesomeIcon icon={faXmark} /> :
                  null
        }
      </button>
    </li>
  )
}