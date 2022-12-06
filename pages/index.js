import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Moment from "react-moment";
import "moment-timezone";
import SEOHead from "../components/seo/SEOHead";
import globalMeta from "../seo/globalmeta";

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      <SEOHead canonicalUrl={globalMeta.siteUrl} ogType="website" />
      <div className="flex flex-col items-start justify-center gap-y-2 text-sm uppercase tracking-wider text-slate-600 dark:text-zinc-200">
        <Moment format="dddd, MMMM Do, YYYY" tz="America/Vancouver">
          {date}
        </Moment>
        <p>
          Current time in Vancouver{" "}
          <span className="font-medium text-acapulco-600">
            <Moment format="h:mm:ss a" tz="America/Vancouver">
              {date}
            </Moment>
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-4 dark:text-white">
        <h1 className="mb-4 font-IMB text-6xl font-bold">{`Hello, I'm Warren.`}</h1>
        <p></p>
      </div>
      <div className="flex flex-col items-start justify-center gap-y-2 text-sm uppercase tracking-wider text-slate-600 dark:text-zinc-200">
        <p>Front-end Web Developer ・ UI Designer</p>
        <p>Vancouver, BC</p>
      </div>
    </Layout>
  );
};

export default Home;
