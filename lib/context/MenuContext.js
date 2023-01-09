import { createContext, useContext, useState } from "react";

//Create the context.
export const MenuContext = createContext();

// Provide the context state and fucnctions.
const MenuContextProvider = (props) => {
  // Set the initial state of the context.
  const [menuState, setMenuState] = useState(true);

  // Toggle menu to open or close.
  const toggleMenu = () => {
    window.innerWidth < 1024 ? setMenuState(!menuState) : null;
  };

  // Toggle the menu to open state.
  const openMenu = () => {
    setMenuState(true);
  };

  // Toggle the menu to close state.
  const closeMenu = () => {
    window.innerWidth < 1024 ? setMenuState(false) : null;
  };

  // Attach the context provider with the values defined above.
  return (
    <MenuContext.Provider
      value={{ menuState, toggleMenu, openMenu, closeMenu }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);

export default MenuContextProvider;
