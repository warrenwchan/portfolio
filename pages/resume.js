import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import 'react-pdf/dist/esm/Page/TextLayer.css';


const Resume = ({ resumeObject }) => {
  const [ numPage, setNumPage ] = useState(null);
  const [ pageNumber, setPageNumber ] = useState(1);

  let resume = resumeObject.attributes.resume.data[0].attributes
  let resumeURL = `http://localhost:1337${resume.url}`

  const onDocumentLoadSuccess = ({numPage}) => {
    setNumPage(numPage);
    setPageNumber(1);
  }


  return (
    <Layout>
      <div className="max-w-5xl w-full h-full mx-auto">
        <Document
          file={resumeURL}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          className="mx-auto"
        >
          <Page
            pageNumber={pageNumber}
            className="mx-auto w-full"
          />
        </Document>
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
