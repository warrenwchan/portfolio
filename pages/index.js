import Link from 'next/link';
import Layout from '../components/Layout';
import { fetcher } from '../lib/api';

const Home = ({ categories }) => {
  return (
    <Layout>
      <h1 className="text-5xl font-bold text-center">Hello_World</h1>
      <div className="flex md:flex-row justify-center items-center gap-x-4 mt-8">
        {categories.map((category, i) => {
          return (
            <div key={i}>
              <Link href={`project/` + category.attributes.slug}>
                <p className="p-2 rounded hover:bg-gray-200 transition-all ease-in-out duration-200">
                  {category.attributes.name}
                </p>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const websiteResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?&populate=projects`);
  return {
    props: {
      categories: websiteResponse.data
    }
  }
}

export default Home
