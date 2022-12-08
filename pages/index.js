import { useState, useEffect } from "react";
import { fetcher } from "../lib/api";
import Layout from "../components/Layout";
import Image from "next/image";

import SEOHead from "../components/seo/SEOHead";
import globalMeta from "../seo/globalmeta";
import Time from "../components/time";
import Motion from "../components/Motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Home = ({ projectObject }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout>
      <SEOHead canonicalUrl={globalMeta.siteUrl} ogType="website" />
      <div className="relative mx-auto flex h-full min-h-[100dvh] w-full flex-col justify-center gap-y-12 p-4 pt-24 md:gap-y-24 md:p-8 lg:max-w-5xl">
        <div className="flex flex-col items-start justify-center gap-y-2 text-sm uppercase tracking-wider text-slate-600 dark:text-zinc-200">
          <Time format="dddd, MMMM Do, YYYY" />
          <p>
            Current time in Vancouver{" "}
            <span className="font-medium text-acapulco-600">
              <Time format="h:mm:ss a" />
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 dark:text-white">
          <h1 className="font-mono text-7xl font-bold lg:text-6xl">{`Hello, I'm Warren.`}</h1>
        </div>
        <div className="flex flex-col items-start justify-center gap-y-2 text-sm uppercase tracking-wider text-slate-600 dark:text-zinc-200">
          <p>Front-end Web Developer ・ UI Designer</p>
          <p>Vancouver, BC</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full p-8 text-center">
          <p className="animate animate-bounce">
            <FontAwesomeIcon icon={faArrowDown} />
          </p>
        </div>
      </div>
      <div className="mx-auto w-full p-4 md:p-8 lg:max-w-5xl">
        <Motion>
          <h2 className="mb-8 font-mono text-4xl font-bold">Recent Projects</h2>
        </Motion>
        <div className="grid grid-cols-1 gap-8">
          {projectObject.map((projectData, i) => {
            const project = projectData.attributes;
            return (
              <Motion
                key={i}
                className="group rounded-xl px-6 py-4 transition-all duration-500 ease-in-out hover:bg-white hover:dark:bg-zinc-900"
              >
                <Link
                  href={`${project.category.data.attributes.slug}/${project.slug}`}
                >
                  <div className="mb-4 flex flex-row items-center justify-between">
                    <div>
                      <p className="text-lg font-medium">{project.title}</p>
                      <p className="text-sm text-zinc-600">
                        <Time
                          format="MMMM / YYYY"
                          timeStamp={project.publishedAt}
                        />
                      </p>
                    </div>
                    <p className="-translate-x-4 scale-75 transform rounded-full p-4 opacity-0 transition duration-500 ease-in-out group-hover:-translate-x-0 group-hover:opacity-100">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                  </div>
                  <div className="flex h-64 items-center justify-center overflow-hidden rounded-sm">
                    <div className="relative h-full w-full transition-all duration-500 ease-in-out group-hover:scale-105">
                      {project.project_display.data ? (
                        <Image
                          src={
                            project.project_display.data.attributes.url
                              ? project.project_display.data.attributes.url
                              : null
                          }
                          alt={
                            project.project_display.data.attributes
                              .alternativeText
                              ? project.project_display.data.attributes
                                  .alternativeText
                              : "project image."
                          }
                          fill
                          className="object-cover"
                        />
                      ) : null}
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-zinc-200/20 to-zinc-400/40 dark:from-zinc-800/20 dark:to-zinc-900/40"></div>
                    </div>
                  </div>
                </Link>
              </Motion>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const projectResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/projects?&populate[category][populate]=*&populate[project_display][populate]=*&pagination[pageSize]=4&sort[0]=publishedAt%3Aasc`
  );
  return {
    props: {
      projectObject: projectResponse.data,
    },
  };
}

export default Home;
