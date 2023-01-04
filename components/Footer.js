import Image from "next/image";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";

import bmcLogo from "../public/bmc-logo.png";
import bmcLogoYellow from "../public/bmc-logo-yellow.png";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row items-center justify-between">
      <a
        href="https://www.buymeacoffee.com/warrenwchan"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={bmcLogo}
          alt="Buy me a coffee!"
          width={32}
          height={32}
          loading="lazy"
          className="rounded transition-all delay-200 duration-200 ease-in-out hover:scale-110 dark:hidden"
        />
        <Image
          src={bmcLogoYellow}
          alt="Buy me a coffee!"
          width={32}
          height={32}
          loading="lazy"
          className="hidden rounded dark:block"
        />
      </a>
      <button
        className="h-8 w-8"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <p
          className={`${
            theme === "dark" ? "rotate-180" : "rotate-0"
          } transition-all delay-200 duration-200 ease-in-out hover:scale-110`}
        >
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </p>
      </button>
    </div>
  );
};

export default Footer;
