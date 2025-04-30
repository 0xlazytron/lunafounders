import { getTokenFromLocalStorage } from "../../services/AuthService";

export const isAuthenticated = (state) => {
  const tokenFromState = state.auth.auth.idToken;
  const tokenFromStorage = getTokenFromLocalStorage();

  return !!(tokenFromState || tokenFromStorage);
};
