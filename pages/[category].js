import Link from "next/link";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";

const Category = ({ categoryObject }) => {
  let projects = categoryObject.attributes.projects.data

  return (
    <Layout>
      <h1 className="font-bold text-4xl mb-8">{categoryObject.attributes.name}</h1>
      <div className="flex flex-col justify-between gap-y-4">
        {
          projects.map((project, i) => {
            return (
              <div className="p-4 rounded border border-gray-200" key={i}>
                <Link href={`${categoryObject.attributes.slug}/${project.attributes.slug}`}>
                  <h2 className="font-bold">{project.attributes.title}</h2>
                  <p>{project.attributes.description}</p>
                </Link>
              </div>
            )
          })
        }
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { category } = params;
  console.log(category)
  const categoryResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/category/${category}?populate=projects`);
  return {
    props: {
      categoryObject: categoryResponse.data
    }
  }
}

export default Category;
