import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";

import CarouselBlock from '../../components/image_components/CarouselBlock';
import ImageBlock from '../../components/image_components/ImageBlock'
import ImageDescriptionBlock from "../../components/image_components/ImageDescriptionBlock";

const Project = ({ projectObject }) => {
  let project = projectObject.attributes;
  return (
    <Layout>
      <div className="mb-8 flex flex-col items-start justify-start gap-2">
        <h1 className="font-bold text-4xl">{project.title}</h1>
        <span className="px-2 py-1 font-medium bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-400">{project.category.data.attributes.name}</span>
      </div>
      <p className="text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-col gap-y-6 my-8">
        {project.blocks.map((block, i) => {
          switch (block.__component) {
            case "images.images":
              return (
                <div className="p-4 bg-gray-50 rounded-lg" key={i}>
                  <ImageBlock
                    imageData={block.image.data.attributes}
                  />
                </div>
              )
              break;
            case "images.image-description":
              return (
                <div className="p-4 bg-gray-50 rounded-lg" key={i}>
                  <ImageDescriptionBlock
                    data={block}
                  />
                </div>
              )
              break;
            case "images.carousel":
              let images = block.images.data
              return (
                <div className="p-4 bg-gray-50 rounded-lg" key={i}>
                  <CarouselBlock
                    imageData={images}
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
