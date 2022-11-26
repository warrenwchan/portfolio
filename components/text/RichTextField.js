import MarkdownIt from 'markdown-it';

const RichTextField = ({ data }) => {
  const md = new MarkdownIt();
  const htmlContent = md.render(data.rich_text_field);

  return (
    <section className='flex flex-col gap-y-2 leading-normal' dangerouslySetInnerHTML={{__html: htmlContent}}></section>
  )
}

export default RichTextField
