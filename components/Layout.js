import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Context } from "../lib/context/context";

import Nav from "./Nav";
import SEOHead from "../components/seo/SEOHead";

const Layout = ({ children, path }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("Portfolio");
  const { theme, setTheme } = useTheme();
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    dispatch({
      type: "THEME_TOGGLE",
      payload: theme,
    });
  }, [theme, dispatch]);

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
          className={`sticky top-0 left-0 z-10 w-full transition-all duration-200 ease-in-out md:w-[96px] lg:w-1/5 lg:min-w-[420px]`}
        >
          <Nav />
          {state.menu ? (
            <div className="sticky top-0 right-0 bottom-0 left-0 -z-50 hidden h-screen w-screen bg-zinc-500/20 backdrop-blur-[2px] dark:bg-zinc-900/20 md:block lg:hidden"></div>
          ) : null}
        </div>
        <div
          className={`h-full min-h-screen w-full bg-slate-50 p-4 transition-all duration-200 ease-in-out dark:bg-zinc-900 md:p-8 lg:ml-0 lg:w-4/5`}
        >
          <div className="relative mx-auto my-[10vh] flex w-full flex-col gap-y-32 transition-all duration-200 ease-in-out dark:text-zinc-200 md:my-[20vh] lg:max-w-5xl">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
