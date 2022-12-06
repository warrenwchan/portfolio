import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion, useScroll, useSpring } from "framer-motion";

// Components
import CarouselBlock from "../../components/image/CarouselBlock";
import ImageBlock from "../../components/image/ImageBlock";
import ImageDescriptionBlock from "../../components/image/ImageDescriptionBlock";
import SubTitle from "../../components/text/SubTitle";
import BodyText from "../../components/text/BodyText";
import RichTextField from "../../components/text/RichTextField";
import PhotoGrid from "../../components/image/PhotoGrid";
import Button from "../../components/button/Button";
import Tags from "../../components/tags/Tags";
import SEOHead from "../../components/seo/SEOHead";

const Project = ({ projectObject }) => {
  let project = projectObject.attributes;
  const router = useRouter();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.onChange();
  }, []);

  return (
    <Layout path={project.title}>
      <SEOHead description={`${project.title} | ${project.description}`} />
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-2 origin-[0%] bg-gradient-to-r from-acapulco-300 to-acapulco-500"
        style={{ scaleX }}
      />
      <div className="flex flex-col items-start justify-start gap-8 dark:text-slate-200">
        <button
          className="font-mono text-sm transition-all duration-200 ease-in-out hover:text-acapulco-600"
          type="button"
          onClick={() => router.back()}
        >
          <span>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </span>
        </button>
        <h1 className="text-5xl font-bold dark:text-white md:text-6xl">
          {project.title}
        </h1>
        <span className="rounded-full border border-acapulco-200 bg-slate-50 px-4 py-1 font-mono text-xs font-medium text-acapulco-600 dark:bg-slate-50/10">
          {project.category.data.attributes.name}
        </span>
        <p className="px-4 leading-normal">{project.description}</p>
      </div>
      {project.blocks.map((block, i) => {
        switch (block.__component) {
          case "images.images":
            if (block.image.data) {
              return (
                <div key={i}>
                  <ImageBlock imageData={block.image.data.attributes} />
                </div>
              );
            }
            break;
          case "images.image-description":
            if (block.image.data) {
              return (
                <div key={i}>
                  <ImageDescriptionBlock data={block} />
                </div>
              );
            }
            break;
          case "images.carousel":
            var images = block.images.data;
            if (images) {
              return (
                <div key={i}>
                  <CarouselBlock imageData={images} />
                </div>
              );
            }
            break;
          case "images.photo-grid":
            var images = block.images.data;
            if (images) {
              return (
                <div key={i}>
                  <PhotoGrid imageData={images} />
                </div>
              );
            }
            break;
          case "text.sub-title":
            return (
              <div key={i}>
                <SubTitle data={block} />
              </div>
            );
            break;
          case "text.body":
            return (
              <div key={i}>
                <BodyText data={block} />
              </div>
            );
            break;
          case "text.rich-text-field":
            return (
              <div key={i}>
                <RichTextField data={block} />
              </div>
            );
            break;
          case "button.button":
            return (
              <div key={i}>
                <Button text={block.text} url={block.url} />
              </div>
            );
            break;
          case "tags.tags":
            return (
              <div key={i}>
                <Tags tagData={block} />
              </div>
            );
            break;
          default:
            null;
        }
      })}
      <div className="mb-8 flex flex-col items-start justify-start gap-8">
        <button
          className="font-mono text-sm transition-all duration-200 ease-in-out hover:text-acapulco-600"
          type="button"
          onClick={() => router.back()}
        >
          <span>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </span>
        </button>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { project } = params;
  const projectResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/project/${project}?populate[blocks][populate]=*&populate[category][populate]=*`
  );
  return {
    props: {
      projectObject: projectResponse.data,
    },
  };
}

export default Project;
