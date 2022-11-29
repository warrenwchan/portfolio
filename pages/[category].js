import Link from "next/link";
import { useRouter } from 'next/router'
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import useSWR from "swr";
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Category = ({ categoryObject }) => {
  const [pageIndex, setPageIndex] = useState(1)
  let projects = categoryObject.attributes.projects.data
  const router = useRouter()
  const {data} = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories?pagination[page]=${pageIndex}&pagination[pageSize]=4`, fetcher, {
    fallbackData: categoryObject
  })

  return (
    <Layout>
      <div className="flex flex-col items-start justify-start gap-8">
        <button className="hover:text-acapulco-600 ease-in-out transition-all duration-200 text-sm" type="button" onClick={() => router.back()}>
          <span><FontAwesomeIcon icon={faArrowLeft} /> Back</span>
        </button>
        <h1 className="font-bold text-5xl md:text-6xl">{categoryObject.attributes.name}</h1>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-200">
        {
          projects.length ?
          projects.map((project, i) => {
            return (
              <div key={i} className="py-8 group transition-all duration-200 ease-out">
                <Link
                  href={`${categoryObject.attributes.slug}/${project.attributes.slug}`}
                >
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-acapulco-500">{project.attributes.title} <FontAwesomeIcon icon={faArrowRight} className="scale-75 transition transform opacity-0 -translate-x-4 group-hover:-translate-x-0 group-hover:opacity-100" /></h2>
                  <p className="text-slate-600 leading-normal">{project.attributes.description}</p>
                </Link>
              </div>
            )
          })
          : <p className="text-slate-400">No {categoryObject.attributes.name} Projects Available At The Moment...</p>
        }
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const { category } = params;
  const categoryResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/slugify/slugs/category/${category}?populate=projects`);
  return {
    props: {
      categoryObject: categoryResponse.data
    }
  }
}

export default Category;
