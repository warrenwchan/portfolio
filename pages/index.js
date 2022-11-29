import Link from 'next/link';
import Layout from '../components/Layout';
console.log(process.env.NEXT_PUBLIC_STRAPI_URL)
const Home = ({ categories }) => {
  return (
    <Layout>
      <div className="max-w-5xl w-full h-full mx-auto flex flex-col justify-center items-center gap-y-16">
        <h1 className="text-5xl font-bold text-center">Welcome to my portfolio</h1>
      </div>
    </Layout>
  )
}

export default Home
