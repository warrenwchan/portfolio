import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";

const Projects = ({ project }) => {
  let projectsItems = project[0].attributes.projects.data

  return (
    <Layout>
      <h1 className="font-bold text-4xl mb-8">{project[0].attributes.name}</h1>
      {
        projectsItems.map((projectItem, i) => {
          return (
            <div className="p-4 rounded border border-gray-200" key={i}>
              <h2 className="font-bold">{projectItem.attributes.title}</h2>
              <p>{projectItem.attributes.description}</p>
            </div>
          )
        })
      }
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const projectResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?/${slug}&populate=projects`);
  return {
    props: {
      project: projectResponse.data.filter(res => res.attributes.slug === slug)
    }
  }
}

export default Projects;
