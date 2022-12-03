import { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import Motion from '../Motion';


const ImageBlock = ({ imageData }) => {
  const [open, setOpen] = useState(false);
  return (
    <Motion
      className="relative w-full"
    >
      <Image
        src={imageData.url}
        alt={imageData.alternativeText ? imageData.alternativeText : imageData.name}
        width={1080}
        height={1080}
        className='object-cover hover:cursor-pointer'
        onClick={() => setOpen(true)}
        loading="lazy"
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={imageData.url}
        plugins={[Fullscreen]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
        render={{
          slide: (image, offset, rect) => {
            const width = Math.round(Math.min(rect.width, (rect.height / image.height) * image.width));
            const height = Math.round(Math.min(rect.height, (rect.width / image.width) * image.height));
            return (
              <div className='relative w-full h-full'>
                <Image
                  src={imageData.url}
                  alt={imageData.alternativeText ? imageData.alternativeText : imageData.name}
                  fill
                  sizes="100%"
                  className='object-contain'
                  loading="lazy"
                />
              </div>
            );
          }
        }}
      />
    </Motion>
  )
}

export default ImageBlock
