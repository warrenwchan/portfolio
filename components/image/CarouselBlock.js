import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import Motion from "../Motion";

const PARALLAX_FACTOR = 1.2;

const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev fill-acapulco-400 hover:fill-acapulco-600 p-2 bg-slate-50 rounded border border-slate-100 shadow-sm hover:shadow-lg hover:scale-125 transition-all ease-out duration-100"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next fill-acapulco-400 hover:fill-acapulco-600 p-2 bg-slate-50 rounded border border-slate-100 shadow-sm hover:shadow-lg hover:scale-125 transition-all ease-out duration-100"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

const CarouselBlock = ({ imageData }) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const wheelGestures = WheelGesturesPlugin({
    wheelDraggingClass: 'my-wheel-class',
  })

  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  }, [wheelGestures]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [parallaxValues, setParallaxValues] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.getTarget();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
    });
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);

    setParallaxValues(styles);
  }, [embla, setParallaxValues, setScrollProgress]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    onScroll();
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
  }, [embla, onSelect, onScroll]);

  const images = imageData.map((image) => {
    return image.attributes.url
  })

  return (
    <Motion>
      <div className="embla bg-slate-100 p-4 rounded">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container aspect-video">
            {imageData.map((image, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">
                  <div
                    className="embla__slide__parallax"
                    style={{ transform: `translateX(${parallaxValues[index]}%)` }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={image.attributes.url}
                        alt={image.attributes.alternativeText ? image.attributes.alternativeText : image.attributes.name}
                        fill
                        className="object-cover hover:cursor-pointer"
                        sizes="100%"
                        onClick={() => (setOpen(true), setImageIndex(index))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />

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
                  />
                </div>
              );
            }
          }}
        />
      </div>
      <div className="embla__progress bg-slate-200">
        <div
          className="embla__progress__bar bg-acapulco-400"
          style={{ transform: `translateX(${scrollProgress}%)` }}
        />
      </div>
    </Motion>
  );
};

export default CarouselBlock;


