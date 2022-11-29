import ImageBlock from './ImageBlock';

const ImageDescriptionBlock = ({ data }) => {
  let image = data.image.data.attributes
  return (
    <div className='flex flex-col gap-y-4'>
      <ImageBlock
        imageData={image}
      />
      <p className="leading-normal px-4 text-center text-sm text-slate-600">
        {data.description}
      </p>
    </div>
  )
}

export default ImageDescriptionBlock
