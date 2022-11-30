import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

const Home = () => {
  var [date,setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
      clearInterval(timer)
    }
  });

  return (
    <Layout>
      <div className='flex flex-col gap-y-2 justify-center items-start text-sm text-slate-600 uppercase tracking-wider'>
        <Moment format="dddd, MMMM Do, YYYY" tz="America/Vancouver">{date}</Moment>
        <p>Current time in Vancouver <span className="font-medium text-acapulco-600"><Moment format="h:mm:ss a" tz="America/Vancouver">{date}</Moment></span></p>
      </div>
      <h1 className="text-6xl font-bold mb-4">{`Hello, I'm Warren.`}</h1>
      <div className="flex flex-col gap-y-2 justify-center items-start text-sm text-slate-600 uppercase tracking-wider">
        <p>Front-end Web Developer ・ UI Designer</p>
        <p>Vancouver, BC</p>
      </div>
    </Layout>
  )
}

export default Home
