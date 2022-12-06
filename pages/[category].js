import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetcher } from "../lib/api";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import SEOHead from "../components/seo/SEOHead";
import Layout from "../components/Layout";
import Button from "../components/button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import placeholderIcon from "../public/placeholder-icon.png";

const Category = ({ categoryObject }) => {
  const [mounted, setMounted] = useState(false);
  let projects = categoryObject.attributes.projects.data;
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Layout path={categoryObject.attributes.name}>
      <SEOHead
        description={`Explore my catalog of ${categoryObject.attributes.name} projects.`}
      />
      <div className="flex flex-col items-start justify-start gap-8">
        <button
          className="font-IMB text-sm transition-all duration-200 ease-in-out hover:text-acapulco-600"
          type="button"
          onClick={() => router.back()}
        >
          <span>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </span>
        </button>
        <h1 className="text-5xl font-bold dark:text-white md:text-6xl">
          {categoryObject.attributes.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-200">
        {projects.length ? (
          projects.map((project, i) => {
            return (
              <div key={i}>
                <CategoryItem category={categoryObject} project={project} />
              </div>
            );
          })
        ) : (
          <p className="text-slate-400">
            No {categoryObject.attributes.name} Projects Available At The
            Moment...
          </p>
        )}
      </div>
    </Layout>
  );
};

const CategoryItem = ({ category, project, index }) => {
  const animationVarient = {
    visible: { opacity: 1, transition: { duration: 1 } },
    hidden: { opacity: 0 },
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
      className="group py-8 transition-all duration-200 ease-out dark:text-zinc-200"
      variants={animationVarient}
      initial="hidden"
      animate={controls}
      ref={ref}
    >
      <Link href={`/${category.attributes.slug}/${project.attributes.slug}`}>
        <div className="flex flex-row gap-x-4">
          <div className="relative h-16 w-16 flex-none">
            <Image
              src={
                project.attributes.project_icon.data
                  ? project.attributes.project_icon.data.attributes.url
                  : placeholderIcon
              }
              alt={
                project.attributes.project_icon.data &&
                project.attributes.project_icon.data.attributes.alternativeText
                  ? project.attributes.project_icon.data.attributes
                      .alternativeText
                  : `${project.attributes.title} Icon`
              }
              fill
              size={`100%`}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-grow">
            <h2 className="mb-1 font-medium">{project.attributes.title}</h2>
            <div className="flex flex-row items-start justify-between gap-8">
              <p className="text-sm leading-normal text-slate-600 dark:text-zinc-400">
                {project.attributes.description}
              </p>
              <Button text="View" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export async function getServerSideProps({ params }) {
  const { category } = params;
  const categoryResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/category/${category}?populate[projects][populate]=*`
  );
  return {
    props: {
      categoryObject: categoryResponse.data,
    },
  };
}

export default Category;
