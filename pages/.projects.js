import Layout from '../components/Layout';
import { fetcher } from '../lib/api';
import useSWR from 'swr';
import { useState } from 'react';

const Projects = ({ websites }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/websites?pagination[page]=${pageIndex}&pagination[pageSize]=1`, fetcher, {
    fallbackData: websites
  });

  return (
    <Layout>
      <h1 className='font-bold text-5xl mb-8'>Projects</h1>
      <div>
        {
        data.data.map((website, i) => {
            return (
              <div key={i}>
                {website.attributes.title}
              </div>
            )
          })
        }
      </div>
      <div className='flex flex-row justify-start items-center gap-x-4'>
        <button
          className={`p-1 rounded ${pageIndex === 1 ? 'opacity-25' : 'hover:bg-gray-200 hover:font-medium transition-all ease-in-out duration-200'}`}
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Prev
        </button>
        <button
          className={`p-1 rounded ${pageIndex === (data && data.meta.pagination.pageCount) ? 'opacity-25' : 'hover:bg-gray-200 hover:font-medium transition-all ease-in-out duration-200'}`}
          disabled={pageIndex === (data && data.meta.pagination.pageCount)}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const websiteResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/websites?pagination[page]=1&pagination[pageSize]=1`);
  return {
    props: {
      websites: websiteResponse
    }
  }
}

export default Projects

