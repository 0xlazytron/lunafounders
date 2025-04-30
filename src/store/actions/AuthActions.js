import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(email, password, username, navigate, by = "") {
  return (dispatch) => {
    signUp(email, password, username, by)
      .then((response) => {
        if (response.token) {
          dispatch(confirmedSignupAction(response));
          navigate("/dashboard");
        } else {
          dispatch(signupFailedAction("Invalid response from server"));
        }
      })
      .catch((error) => {
        console.error("Signup action error:", error);
        const errorMessage = error.message || "An error occurred during signup";
        dispatch(signupFailedAction(errorMessage));
      })
      .finally(() => {
        dispatch(loadingToggleAction(false));
      });
  };
}

export function Logout(navigate) {
  navigate("/");

  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        console.log("Login response in action:", response);
        if (response.token) {
          const expirationTime = new Date();
          expirationTime.setHours(expirationTime.getHours() + 24); // 24 hours from now
          saveTokenInLocalStorage(response.token, expirationTime);
          runLogoutTimer(expirationTime);
          dispatch(loginConfirmedAction(response));
          navigate("/dashboard");
        } else {
          dispatch(loginFailedAction("Invalid response from server"));
        }
      })
      .catch((error) => {
        console.error("Login action error:", error);
        const errorMessage = error.message || "An error occurred during login";
        dispatch(loginFailedAction(errorMessage));
      })
      .finally(() => {
        dispatch(loadingToggleAction(false));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: {
      auth: {
        idToken: data.token,
        email: data.email,
        localId: data.userId,
        expiresIn: data.expiresIn,
        refreshToken: data.refreshToken,
      },
    },
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
