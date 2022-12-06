export function themeReducer(state, action) {
  switch (action.type) {
    case "THEME_TOGGLE":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

