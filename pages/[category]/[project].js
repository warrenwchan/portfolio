import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";

const Project = ({ projectObject }) => {
  let project = projectObject.attributes;
  return (
    <Layout>
      <div className="mb-8 flex flex-col items-start justify-start gap-2">
        <h1 className="font-bold text-4xl">{project.title}</h1>
        <span className="px-2 py-1 font-medium bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-400">{project.category.data.attributes.name}</span>
      </div>
      <p className="text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-col gap-y-8">
        {
          project.blocks.map((block, i) => {
            if(block.__component === "images.images") {
              let image = block.image.data.attributes
              return (
                <div className="p-4" key={i}>
                  <Image src={`http://localhost:1337${image.url}`} alt={image.alternativeText} width={image.width} height={image.height} />
                </div>
              )
            } else if (block.__component === "images.image-description") {
              let image = block.image.data.attributes
              return (
                <div className="p-4" key={i}>
                  <Image src={`http://localhost:1337${image.url}`} alt={image.alternativeText} width={image.width} height={image.height} />
                  <p className="text-sm">
                    {block.description}
                  </p>
                </div>
              )

            } else if (block.__component === "images.carousel") {
              let images = block.images.data
              return (
                <div className="p-4" key={i}>
                  {
                    images.map((image, j) => {
                      return (
                        <div className="" key={j}>
                          <Image src={`http://localhost:1337${image.attributes.url}`} alt={image.attributes.alternativeText} width={image.attributes.width} height={image.attributes.height} />
                        </div>
                      )
                    })
                  }
                </div>
              )

            } else {
              null
            }
          })
        }
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
