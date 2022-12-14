import { useReducer, createContext } from "react";
import { menuReducer } from "./reducers/menu";

// initial state
const initialState = {
  menu: false,
};

// create context
const Context = createContext({});

// combine reducer function
const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(menuReducer),
    initialState
  ); // pass more reducers combineReducers(menu, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
