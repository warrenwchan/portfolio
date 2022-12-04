import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import { fetcher } from "../lib/api";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SEOHead from '../components/seo/SEOHead'
import Layout from "../components/Layout";
import Button from "../components/button/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import placeholderIcon from '../public/placeholder-icon.png'

const Category = ({ categoryObject }) => {
  let projects = categoryObject.attributes.projects.data
  const router = useRouter()

  return (
    <Layout
      path={categoryObject.attributes.name}
    >
      <SEOHead
        description={`Explore my catalog of ${categoryObject.attributes.name} projects.`}
    	/>
      <div className="flex flex-col items-start justify-start gap-8">
        <button className="hover:text-acapulco-600 ease-in-out transition-all duration-200 text-sm font-IMB" type="button" onClick={() => router.back()}>
          <span><FontAwesomeIcon icon={faArrowLeft} /> Back</span>
        </button>
        <h1 className="font-bold text-5xl md:text-6xl dark:text-white">{categoryObject.attributes.name}</h1>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-200">
        {
          projects.length ?
          projects.map((project, i) => {
            return (
              <div key={i}>
                <CategoryItem
                  category={categoryObject}
                  project={project}
                />
              </div>
            )
          })
          : <p className="text-slate-400">No {categoryObject.attributes.name} Projects Available At The Moment...</p>
        }
      </div>
    </Layout>
  );
};

const CategoryItem = ({category, project, index}) => {
  const animationVarient = {
    visible: { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0}
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="py-8 group transition-all duration-200 ease-out dark:text-zinc-200"
      variants={animationVarient}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <Link
        href={`/${category.attributes.slug}/${project.attributes.slug}`}
      >
        <div className="flex flex-row gap-x-4">
          <div className="relative flex-none h-16 w-16">
            <Image
              src={project.attributes.project_icon.data ? project.attributes.project_icon.data.attributes.url : placeholderIcon}
              alt={project.attributes.project_icon.data && project.attributes.project_icon.data.attributes.alternativeText ? project.attributes.project_icon.data.attributes.alternativeText : `${project.attributes.title} Icon`}
              fill
              size={`100%`}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-medium mb-1">{project.attributes.title}</h2>
            <div className="flex flex-row gap-8 justify-between items-start">
              <p className="text-slate-600 dark:text-zinc-400 leading-normal text-sm">{project.attributes.description}</p>
              <Button
                text="View"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export async function getServerSideProps({ params }) {
  const { category } = params;
  const categoryResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/category/${category}?populate[projects][populate]=*`);
  return {
    props: {
      categoryObject: categoryResponse.data
    }
  }
}

export default Category;
