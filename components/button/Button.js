import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Button = ({ text, url }) => {
  return (
    <div className="text-slate-800 dark:text-zinc-200 dark:group-hover:text-white">
      <a
        className="inline-flex flex-row items-center gap-x-1 rounded border border-slate-200 bg-slate-100 py-2 pl-6 pr-3 text-xs font-medium transition-all duration-200 ease-out group-hover:bg-slate-200 dark:border-zinc-600 dark:bg-transparent dark:group-hover:bg-slate-200/10"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {text}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="-translate-x-4 scale-75 transform opacity-0 transition group-hover:-translate-x-0 group-hover:opacity-100"
        />
      </a>
    </div>
  );
};

export default Button;
