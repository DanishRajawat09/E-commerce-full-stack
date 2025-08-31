
import "./Button.css"
import { Link } from 'react-router-dom'
const Button = ({title , classname, linkClassName,  linkTo ,  event}) => {
  return (
    <Link to={linkTo} className='flexContainer '> <button onClick={event && event} className={classname}>
     {title}
     </button></Link>
  )
}

export default Button
