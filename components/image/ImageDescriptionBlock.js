import ImageBlock from './ImageBlock';
import Motion from '../Motion'

const ImageDescriptionBlock = ({ data }) => {
  let image = data.image.data.attributes
  return (
    <Motion className='flex flex-col gap-y-4'>
      <ImageBlock
        imageData={image}
      />
      <p className="leading-normal px-4 text-center text-sm text-slate-600 dark:text-zinc-500">
        {data.description}
      </p>
    </Motion>
  )
}

export default ImageDescriptionBlock
