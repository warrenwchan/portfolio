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

const Project = ({ projectObject }) => {
  let project = projectObject.attributes;
  const router = useRouter()
  return (
    <Layout>
      <div className="mb-8 flex flex-col items-start justify-start gap-2">
        <button className="rounded bg-slate-50 w-8 h-8 hover:text-indigo-600 ease-in-out transition-all duration-200" type="button" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="font-bold text-4xl">{project.title}</h1>
        <span className="px-2 py-1 font-medium bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-400">{project.category.data.attributes.name}</span>
      </div>
      <p className="leading-normal">{project.description}</p>
      <div className="flex flex-col gap-y-16 my-8">
        {project.blocks.map((block, i) => {
          switch (block.__component) {
            case "images.images":
              return (
                <div key={i}>
                  <ImageBlock
                    imageData={block.image.data.attributes}
                  />
                </div>
              )
              break;
            case "images.image-description":
              return (
                <div key={i}>
                  <ImageDescriptionBlock
                    data={block}
                  />
                </div>
              )
              break;
            case "images.carousel":
              let images = block.images.data
              return (
                <div key={i}>
                  <CarouselBlock
                    imageData={images}
                  />
                </div>
              )
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
            default :
              null
          }
        })}
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
