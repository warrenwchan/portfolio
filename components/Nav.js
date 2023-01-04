import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useMenuContext } from "../lib/context/MenuContext";

import NavButton from "../components/button/NavButton";
import Footer from "./Footer";

import gradientBlur from "../public/graident_blur.svg";
import logoBlack from "../public/logo-black.svg";
import logoWhite from "../public/logo-white.svg";
import iconBlack from "../public/icon-black.svg";
import iconWhite from "../public/icon-white.svg";

const Nav = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const { theme, setTheme } = useTheme();
  const { menuState, openMenu, closeMenu } = useMenuContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Checks to see if menu is open, if menu is opened disabled scroll on website.
  useEffect(() => {
    if (menuState === true && window.innerWidth < 1024) {
      document.querySelector("html").classList.add("overflow-hidden");
    } else {
      document.querySelector("html").classList.remove("overflow-hidden");
    }
  }, [menuState]);

  // Keep menu toggled if on desktop view.
  useEffect(() => {
    window.innerWidth >= 1024 ? openMenu() : closeMenu();
  }, []);

  // Check if window size has changed, if changed width, close menu. if changed height adapt height.
  useEffect(() => {
    let windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      if (windowWidth === window.innerWidth) {
        if (menuState === true) {
          openMenu();
        }
      } else {
        if (window.innerWidth < 1024) {
          closeMenu();
          windowWidth = window.innerWidth;
        } else {
          openMenu();
          windowWidth = window.innerWidth;
        }
      }
    });
  }, [menuState, openMenu, closeMenu]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/categories?&populate=projects`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={`dark:lg:noise sticky top-0 flex h-full w-full justify-between overscroll-contain bg-white text-slate-600 transition-all duration-200 ease-in-out dark:bg-zinc-800 dark:text-zinc-200 md:h-screen md:flex-col ${
        menuState
          ? "h-[100dvh] flex-col md:min-w-[420px]"
          : "flex-row md:w-auto"
      }`}
    >
      <div className="flex w-full flex-none flex-row items-center justify-between p-4 py-8 md:p-8">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-1"
          onClick={() => closeMenu()}
        >
          <Image
            src={iconWhite}
            alt="Warren Chan Icon"
            width={32}
            height={32}
            className="hidden h-8 w-8 p-2 dark:block dark:md:hidden"
            loading="lazy"
          />
          <Image
            src={iconBlack}
            alt="Warren Chan Icon"
            width={32}
            height={32}
            className="h-8 w-8 p-2 dark:hidden md:hidden"
            loading="lazy"
          />
          {menuState ? (
            <div>
              <Image
                src={logoWhite}
                alt="Logo"
                className="hidden w-20 dark:md:block lg:w-24"
                loading="lazy"
              />
              <Image
                src={logoBlack}
                alt="Logo"
                className="hidden w-20 dark:hidden md:block lg:w-24"
                loading="lazy"
              />
            </div>
          ) : null}
        </Link>
        <NavButton />
      </div>
      <div
        className={`flex h-full grow flex-col justify-between gap-y-8 p-4 py-8 pt-0 md:px-8 ${
          menuState ? "overflow-y-auto" : "hidden lg:flex"
        }`}
      >
        <div className="flex flex-col items-start justify-center">
          <p className="mb-2 font-mono text-sm tracking-wide">Portfolio</p>
        </div>
        <div className="flex flex-col items-start gap-y-2 font-mono">
          <p className="mb-4 font-sans text-2xl font-bold text-black dark:text-white">
            Links
          </p>
          <Link
            href={`/`}
            className={`mb-2 flex flex-row gap-x-2 text-sm tracking-wide transition-all duration-200 ease-in-out hover:font-medium hover:text-acapulco-500 ${
              router.route === "/" ? "font-medium text-acapulco-600" : null
            }`}
          >
            Home
          </Link>
          <a
            href="mailto:w.warrenchan@gmail.com"
            className={`mb-2 flex flex-row gap-x-2 text-sm tracking-wide transition-all duration-200 ease-in-out hover:font-medium hover:text-acapulco-500`}
          >
            Contact
          </a>
          <Link
            href="/resume.pdf"
            alt="alt text"
            locale={false}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-row gap-x-2 text-sm transition-all duration-200 ease-in-out hover:font-medium hover:text-acapulco-500`}
          >
            Resume
          </Link>
        </div>
        <div className="flex flex-col items-start gap-y-2 font-mono">
          <p className="mb-4 font-sans text-2xl font-bold text-black dark:text-white">
            Projects
          </p>
          {!data
            ? null
            : data.data.map((category, i) => {
                return (
                  <Link
                    href={`/${category.attributes.slug}`}
                    key={i}
                    className={`flex flex-row gap-x-2 pb-2 text-sm tracking-wide transition-all duration-200 ease-in-out hover:font-medium hover:text-acapulco-500 ${
                      category.attributes.slug === router.query.category
                        ? "font-bold text-acapulco-600"
                        : null
                    }`}
                    onClick={() => closeMenu()}
                  >
                    <span>
                      {category.id.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      })}
                    </span>
                    <span className="tracking-[-2px]">__________</span>
                    <span>{category.attributes.name}</span>
                  </Link>
                );
              })}
        </div>
        <div className="flex flex-col gap-y-16"></div>
        <Footer />
        <Image
          src={gradientBlur}
          alt="gradient blur asset"
          className="absolute -top-24 -left-24 -z-10 rotate-180 scale-125 opacity-20"
          loading="lazy"
        />
      </div>
      <div
        className={`hidden lg:hidden ${menuState ? "hidden" : "p-8 md:block"}`}
      >
        <Image
          src={theme === "dark" ? iconWhite : iconBlack}
          alt="Warren Chan Icon"
          width={24}
          height={24}
          className="h-8 w-8 p-2"
          loading="lazy"
        />
      </div>
    </nav>
  );
};

export default Nav;
