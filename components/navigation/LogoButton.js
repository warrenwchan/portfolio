import Image from "next/image";
import { useMenuContext } from "../../lib/context//MenuContext";

import logoBlack from "../../public/logo-black.svg";
import logoWhite from "../../public/logo-white.svg";
import iconBlack from "../../public/icon-black.svg";
import iconWhite from "../../public/icon-white.svg";

const LogoButton = () => {
  const { menuState } = useMenuContext();

  return (
    <div>
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
    </div>
  );
};

export default LogoButton;
