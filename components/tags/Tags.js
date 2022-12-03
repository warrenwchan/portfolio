import Button from "../button/Button"
import Motion from "../Motion"

const Tags = ({ tagData }) => {
  return (
    <Motion className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div className="lg:w-2/3">
        <p className="font-medium mb-4">{tagData.title}</p>
        <ul className="flex flex-row flex-wrap gap-2">
          {tagData.tag.map((tag, i) => {
            return (
              <li key={i} className="text-xs font-medium text-slate-600 px-4 py-1 border border-slate-200 rounded-full">{tag.name}</li>
            )
          })}
        </ul>
      </div>
      <div>
        <Button
          text={tagData.button.text}
          url={tagData.button.url}
        />
      </div>
    </Motion>
  )
}

export default Tags
