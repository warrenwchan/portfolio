import Image from 'next/image';

const ImageBlock = ({ imageData }) => {
  return (
    <div className="relative w-full h-[420px]">
      <Image
        src={`http://localhost:1337${imageData.url}`}
        alt={imageData.alternativeText}
        fill
        className='object-cover'
        sizes="100%"
      />
    </div>
  )
}

export default ImageBlock
