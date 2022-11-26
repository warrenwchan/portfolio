import Link from "next/link";
import { useRouter } from 'next/router'
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Category = ({ categoryObject }) => {
  let projects = categoryObject.attributes.projects.data
  const router = useRouter()
  return (
    <Layout>
      <div className="mb-8 flex flex-col items-start justify-start gap-4">
        <button className="hover:text-indigo-600 ease-in-out transition-all duration-200 text-sm" type="button" onClick={() => router.back()}>
          <span><FontAwesomeIcon icon={faArrowLeft} /> Back</span>
        </button>
        <h1 className="font-bold text-4xl">{categoryObject.attributes.name}</h1>
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
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { category } = params;
  const categoryResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/category/${category}?populate=projects`);
  return {
    props: {
      categoryObject: categoryResponse.data
    }
  }
}

export default Category;
