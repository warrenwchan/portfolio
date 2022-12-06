export function menu(state, action) {
  switch (action.type) {
    case "MENU_TOGGLE":
      return { ...state, menu: action.payload };
    default:
      return state;
  }
}

