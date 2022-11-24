import Layout from '../components/Layout';
import { fetcher } from '../lib/api';

const Projects = ({ websites }) => {
  return (
    <Layout>
      <h1 className='font-bold text-5xl'>Projects</h1>
      <div className="">
        {
          websites.data.map((website, i) => {
            return (
              <div key={i}>
                {website.attributes.title}
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const websiteResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/websites`);
  return {
    props: {
      websites: websiteResponse
    }
  }
}

export default Projects

