import MarkdownIt from "markdown-it";
import Motion from "../Motion";

const RichTextField = ({ data }) => {
  const md = new MarkdownIt();
  const htmlContent = md.render(data.rich_text_field);

  return (
    <Motion>
      <section
        className="flex flex-col gap-y-2 px-4 leading-normal"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></section>
    </Motion>
  );
};

export default RichTextField;
