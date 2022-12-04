import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Button = ({ text, url}) => {
  return (
    <div className='text-slate-800 dark:text-white'>
      <a
        className="pl-6 pr-3 py-2 text-xs font-medium bg-slate-100 dark:bg-transparent group-hover:bg-slate-200 dark:group-hover:bg-slate-200/10 border border-slate-200 transition-all duration-200 ease-out rounded inline-flex flex-row items-center gap-x-1"
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
