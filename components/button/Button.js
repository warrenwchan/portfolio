import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Button = ({ text, url}) => {
  return (
    <div>
      <a
        className="group pl-6 pr-3 py-2 text-xs font-medium bg-slate-100 hover:bg-acapulco-500/20 transition-all ease-out duration-200 rounded inline-flex flex-row justify-start items-center gap-x-1"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {text}
        <FontAwesomeIcon icon={faArrowRight} className="scale-75 transition transform opacity-0 -translate-x-4 group-hover:-translate-x-0 group-hover:opacity-100" />
      </a>
    </div>
  )
}

export default Button
