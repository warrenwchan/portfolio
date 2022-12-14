import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../lib/context/context";

import Nav from "./navigation/Nav";
import SEOHead from "../components/seo/SEOHead";

const Layout = ({ children, path, className }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("Portfolio");
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    setCurrentPage(path);
  }, [path]);

  return (
    <>
      <SEOHead
        title={
          router.route === "/"
            ? "Warren Chan ・ Portfolio"
            : `Warren Chan ・ ${currentPage}`
        }
      />
      <main
        className={`flex h-full flex-col text-slate-800 dark:text-zinc-200 md:flex-row md:items-stretch`}
      >
        <div
          className={`fixed top-0 left-0 z-10 w-full transition-all duration-200 ease-in-out md:sticky md:w-[96px] lg:w-1/5 lg:min-w-[420px]`}
        >
          <Nav />
          {state.menu ? (
            <div className="sticky top-0 right-0 bottom-0 left-0 -z-50 hidden h-screen w-screen bg-zinc-500/20 backdrop-blur-[2px] dark:bg-zinc-900/20 md:block lg:hidden"></div>
          ) : null}
        </div>
        <div
          className={`dark:lg:noise h-full min-h-screen w-full bg-slate-50 bg-cover transition-all duration-200 ease-in-out dark:bg-zinc-900 lg:w-4/5`}
        >
          <div
            className={`min-w-screen relative mx-auto flex h-full min-h-screen w-full flex-col gap-y-32 transition-all duration-200 ease-in-out dark:text-zinc-200 ${className}`}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
