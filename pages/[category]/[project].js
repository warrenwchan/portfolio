import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

// Components
import CarouselBlock from '../../components/image/CarouselBlock';
import ImageBlock from '../../components/image/ImageBlock'
import ImageDescriptionBlock from "../../components/image/ImageDescriptionBlock";
import SubTitle from "../../components/text/SubTitle";
import BodyText from "../../components/text/BodyText";
import RichTextField from "../../components/text/RichTextField";
import PhotoGrid from "../../components/image/PhotoGrid";
import Button from "../../components/button/Button";

const Project = ({ projectObject }) => {
  let project = projectObject.attributes;
  const router = useRouter()

  return (
    <Layout
      path={project.title}
    >
      <div className="flex flex-col items-start justify-start gap-8">
        <button className="hover:text-acapulco-600 ease-in-out transition-all duration-200 text-sm" type="button" onClick={() => router.back()}>
          <span><FontAwesomeIcon icon={faArrowLeft} /> Back</span>
        </button>
        <h1 className="font-bold text-5xl md:text-6xl">{project.title}</h1>
        <span className="px-4 py-1 bg-slate-50 rounded-full border border-acapulco-200 text-xs font-medium text-acapulco-600">{project.category.data.attributes.name}</span>
        <p className="leading-normal px-4">{project.description}</p>
      </div>
      {project.blocks.map((block, i) => {
        switch (block.__component) {
          case "images.images":
            if(block.image.data) {
              return (
                <div key={i}>
                  <ImageBlock
                    imageData={block.image.data.attributes}
                  />
                </div>
              )
            }
            break;
          case "images.image-description":
            if(block.image.data) {
              return (
                <div key={i}>
                  <ImageDescriptionBlock
                    data={block}
                  />
                </div>
              )
            }
            break;
          case "images.carousel":
            var images = block.images.data
            if(images) {
              return (
                <div key={i}>
                  <CarouselBlock
                    imageData={images}
                  />
                </div>
              )
            }
            break;
          case "images.photo-grid":
            var images = block.images.data
            if(images) {
              return (
                <div key={i}>
                  <PhotoGrid
                    imageData={images}
                  />
                </div>
              )
            }
            break;
          case "text.sub-title":
            return (
              <div key={i}>
                <SubTitle
                  data={block}
                />
              </div>
            )
            break;
          case "text.body":
            return (
              <div key={i}>
                <BodyText
                  data={block}
                />
              </div>
            )
            break;
          case "text.rich-text-field":
            return (
              <div key={i}>
                <RichTextField
                  data={block}
                />
              </div>
            )
            break;
          case "button.button":
            return (
              <div key={i}>
                <Button
                  text={block.text}
                  url={block.url}
                />
              </div>
            )
            break;
          case "tags.tags":
            console.log(block)
            return (
              <div key={i} className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                <div className="lg:w-2/3">
                  <p className="font-medium mb-4">{block.title}</p>
                  <ul className="flex flex-row flex-wrap gap-2">
                    {block.tag.map((tag, i) => {
                      return (
                        <li key={i} className="text-xs font-medium text-slate-600 px-4 py-1 border border-slate-200 rounded-full">{tag.name}</li>
                      )
                    })}
                  </ul>
                </div>
                <div>
                  <Button
                    text={block.button.text}
                    url={block.button.url}
                  />
                </div>
              </div>
            )
            break;
          default :
            null
        }
      })}
      <div className="mb-8 flex flex-col items-start justify-start gap-8">
        <button className="hover:text-acapulco-600 ease-in-out transition-all duration-200 text-sm" type="button" onClick={() => router.back()}>
          <span><FontAwesomeIcon icon={faArrowLeft} /> Back</span>
        </button>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { project } = params;
  const projectResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/project/${project}?populate[blocks][populate]=*&populate[category][populate]=*`);
  return {
    props: {
      projectObject: projectResponse.data
    }
  }
}

export default Project;
