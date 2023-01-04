import { useMenuContext } from "../../lib/context/MenuContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

const NavButton = () => {
  const { menuState, toggleMenu } = useMenuContext();

  return (
    <button className="h-8 w-8 lg:hidden" onClick={() => toggleMenu()}>
      {menuState ? (
        <FontAwesomeIcon icon={faTimes} className="transform transition" />
      ) : (
        <FontAwesomeIcon icon={faBars} className="transform transition" />
      )}
    </button>
  );
};

export default NavButton;
