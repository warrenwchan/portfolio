import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";

const ImageBlock = ({ imageData }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <Image
        src={`http://localhost:1337${imageData.url}`}
        alt={imageData.alternativeText}
        width={1080}
        height={1080}
        className='object-cover hover:cursor-pointer'
        onClick={() => setOpen(true)}
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
              <div style={{ position: "relative", width, height }}>
                <Image
                  src={`http://localhost:1337${imageData.url}`}
                  alt={imageData.alternativeText}
                  width={1080}
                  height={1080}
                  className='object-cover'
                />
              </div>
            );
          }
        }}
      />
    </div>
  )
}

export default ImageBlock
