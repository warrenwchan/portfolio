import Image from 'next/image';

const ImageBlock = ({ imageData }) => {
  return (
    <div className="relative w-full">
      <Image
        src={`http://localhost:1337${imageData.url}`}
        alt={imageData.alternativeText}
        width={1080}
        height={1080}
        className='object-cover'
      />
    </div>
  )
}

export default ImageBlock
