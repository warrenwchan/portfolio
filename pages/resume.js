import Image from "next/image";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";

const Resume = ({ resumeObject }) => {
  let resume = resumeObject.attributes.resume.data[0].attributes
  let resumeURL = `http://localhost:1337${resume.url}`
  console.log(resumeURL)
  console.log(resume)


  return (
    <Layout>
      <div className="w-full h-full">
        <Image
          src={resumeURL}
          alt={resume.alternativeText}
          width={595}
          height={842}
          className="object-cover mx-auto shadow-lg"
        />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const pdfResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/resume?populate=resume`)
  return {
    props: {
      resumeObject: pdfResponse.data
    }
  }
}

export default Resume
