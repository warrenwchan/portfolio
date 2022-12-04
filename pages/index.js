import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Moment from 'react-moment';
import 'moment-timezone';
import SEOHead from '../components/seo/SEOHead'
import globalMeta from '../seo/globalmeta';

const Home = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }
  }, []);

  return (
    <Layout>
      <SEOHead
        canonicalUrl={ globalMeta.siteUrl }
        ogType="website"
    	/>
      <div className='flex flex-col gap-y-2 justify-center items-start text-sm uppercase tracking-wider text-slate-600 dark:text-zinc-200'>
        <Moment format="dddd, MMMM Do, YYYY" tz="America/Vancouver">{date}</Moment>
        <p>Current time in Vancouver <span className="font-medium text-acapulco-600"><Moment format="h:mm:ss a" tz="America/Vancouver">{date}</Moment></span></p>
      </div>
      <div className="flex flex-col gap-4 dark:text-white">
        <h1 className="text-6xl font-bold mb-4 font-IMB">{`Hello, I'm Warren.`}</h1>
        <p></p>
      </div>
      <div className="flex flex-col gap-y-2 justify-center items-start text-sm uppercase tracking-wider text-slate-600 dark:text-zinc-200">
        <p>Front-end Web Developer ・ UI Designer</p>
        <p>Vancouver, BC</p>
      </div>
    </Layout>
  )
}

export default Home
