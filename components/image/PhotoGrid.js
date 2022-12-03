import Image from "next/image"
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import Motion from "../Motion";


const PhotoGrid = ({ imageData }) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = imageData.map((image) => {
    return image.attributes.url
  })

  return (
    <Motion className={`grid grid-cols-2 ${imageData.length % 3 == 0 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-2`}>
      {
        imageData.map((image, index) => {
          return (
            <div className={`col-span-1 row-span-1 last:odd:col-span-2 ${imageData.length % 2 !== 0 && imageData.length % 3 !== 0 ? "md:last:odd:col-span-2" : "md:last:odd:col-span-1"} hover:cursor-pointer`} key={index}>
              <div className="relative w-full after:content-[''] after:block after:pb-[69.81%]">
                <div className="absolute w-full h-full overflow-hidden">
                  <Image
                    src={image.attributes.url}
                    alt={image.attributes.alternativeText ? image.attributes.alternativeText : image.attributes.name}
                    width={1080}
                    height={1080}
                    className="h-full w-full object-cover object-center"
                    onClick={() => (setOpen(true), setImageIndex(index))}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )
        })
      }
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={imageIndex}
        plugins={[Fullscreen]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
        render={{
          slide: (image, offset, rect) => {
            const width = Math.round(Math.min(rect.width, (rect.height / image.height) * image.width));
            const height = Math.round(Math.min(rect.height, (rect.width / image.width) * image.height));
            return (
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={""}
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

export default PhotoGrid
