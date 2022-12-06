import Button from "../button/Button";
import Motion from "../Motion";

const Tags = ({ tagData }) => {
  return (
    <Motion className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="lg:w-2/3">
        <p className="mb-4 font-medium">{tagData.title}</p>
        <ul className="flex flex-row flex-wrap gap-2">
          {tagData.tag.map((tag, i) => {
            return (
              <li
                key={i}
                className="rounded-full border border-slate-200 px-4 py-1 text-xs font-medium text-slate-600 dark:border-zinc-600 dark:text-zinc-200"
              >
                {tag.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="group">
        <Button text={tagData.button.text} url={tagData.button.url} />
      </div>
    </Motion>
  );
};

export default Tags;
