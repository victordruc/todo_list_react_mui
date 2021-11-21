import { userApi } from "../serverApi/serverApi";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const TOGGLE_IS_FETCHING_USER = "TOGGLE_IS_FETCHING_USER";
const TOGGLE_IS_FETCHING_PAGE_USER = "TOGGLE_IS_FETCHING_PAGE_USER";
const TOGGLE_IS_AUTH = "TOGGLE_IS_AUTH";
const TOGGLE_ERROR_USER = "TOGGLE_ERROR_USER";
const TOGGLE_ERROR_PASSWORD = "TOGGLE_ERROR_PASSWORD";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const DELETE_USER = "DELETE_USER";

const initState = {
  user: {},
  isAuth: false,
  isFetching: false,
  isFetchingPage: true,
  errorUser: null,
  errorPassword: null,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", `Bearer ${action.payload.token}`);
      return { ...state, isAuth: true, user: action.payload.user };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuth: false };
    case REGISTER:
      localStorage.setItem("token", `Bearer ${action.payload.token}`);
      return { ...state, isAuth: true, user: action.payload.user };
    case TOGGLE_IS_FETCHING_USER:
      return {
        ...state,
        isFetching: action.payload,
      };
    case TOGGLE_IS_FETCHING_PAGE_USER:
        return {
          ...state,
          isFetchingPage: action.payload,
        };  
    case TOGGLE_IS_AUTH:
      return { ...state, ...action.payload };
    case TOGGLE_ERROR_USER:
      return { ...state, errorUser: action.payload };
    case TOGGLE_ERROR_PASSWORD:
      return { ...state, errorPassword: action.payload };
    case CHANGE_PASSWORD:
      localStorage.removeItem("token");
      return { ...state, isAuth: false };
    case DELETE_USER:
      localStorage.removeItem("token");
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

// sync function

const actionLoginUser = (payload) => ({
  type: LOGIN,
  payload,
});

export const actionLogoutUser = () => ({
  type: LOGOUT,
});

const actionRegisterUser = (payload) => ({
  type: REGISTER,
  payload,
});

const actionToggleFetching = (payload) => ({
  type: TOGGLE_IS_FETCHING_USER,
  payload,
});

const actionToggleFetchingPage = (payload) => ({
  type: TOGGLE_IS_FETCHING_PAGE_USER,
  payload,
});

export const actionToggleAuth = (payload) => ({
  type: TOGGLE_IS_AUTH,
  payload,
});

export const actionToggleErrorUser = (payload) => ({
  type: TOGGLE_ERROR_USER,
  payload,
});

export const actionToggleErrorPassword = (payload) => ({
  type: TOGGLE_ERROR_PASSWORD,
  payload,
});

export const actionChangePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const actionDeleteUser = (payload) => ({
  type: DELETE_USER,
  payload,
});
// async function

export const actionAuthUserAsync = () => (dispatch) => {
  
  userApi
    .checkUser()
    .then((res) => {
      dispatch(actionToggleAuth({ isAuth: true, user: res }));
      dispatch(actionToggleFetchingPage(false));
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        dispatch(actionToggleAuth({isAuth: false}));
      }
      dispatch(actionToggleFetchingPage(false));
    });
};

export const actionLoginUserAsync = (email, password) => (dispatch) => {
  dispatch(actionToggleFetching(true));
  dispatch(actionToggleErrorUser(null));
  dispatch(actionToggleErrorPassword(null));
  userApi
    .login(email, password)
    .then((res) => {
      dispatch(actionLoginUser(res));
    })
    .catch((error) => {
      if (!error) return;
      const errorMessage = error.response?.data.message
        .toLowerCase()
        .split(" ");
      if (errorMessage.includes("user")) {
        dispatch(actionToggleErrorUser(error.response.data.message));
      } else if (errorMessage.includes("password")) {
        dispatch(actionToggleErrorPassword(error.response.data.message));
      }
    })
    .finally(() => {
      dispatch(actionToggleFetching(false));
    });
};

export const actionRegisterUserAsync =
  (email, password, repeatPassword) => (dispatch) => {
    dispatch(actionToggleFetching(true));
    dispatch(actionToggleErrorUser(null));
    dispatch(actionToggleErrorPassword(null));
    userApi
      .register(email, password, repeatPassword)
      .then((res) => {
        dispatch(actionRegisterUser(res));
      })
      .catch((error) => {
        if (!error) return;
        const errorMessage = error.response?.data.message
          .toLowerCase()
          .split(" ");
        if (errorMessage.includes("user")) {
          dispatch(actionToggleErrorUser(error.response.data.message));
        } else if (errorMessage.includes("password")) {
          dispatch(actionToggleErrorPassword(error.response.data.message));
        }
      })
      .finally(() => {
        dispatch(actionToggleFetching(false));
      });
  };

export const actionChangePasswordAsync =
  (password, repeatPassword) => (dispatch) => {
    dispatch(actionToggleFetching(true));
    dispatch(actionToggleErrorUser(null));
    dispatch(actionToggleErrorPassword(null));
    userApi
      .changePassword(password, repeatPassword)
      .then((res) => {
        dispatch(actionChangePassword(res));
      })
      .catch((error) => {
        if (!error) return;
        const errorMessage = error.response?.data.message
          .toLowerCase()
          .split(" ");
        if (errorMessage.includes("user")) {
          dispatch(actionToggleErrorUser(error.response.data.message));
        } else if (errorMessage.includes("password")) {
          dispatch(actionToggleErrorPassword(error.response.data.message));
        }
      })
      .finally(() => {
        dispatch(actionToggleFetching(false));
      });
  };

export const actionDeleteUserAsync =
  (email, password) => (dispatch) => {
    dispatch(actionToggleFetching(true));
    dispatch(actionToggleErrorUser(null));
    dispatch(actionToggleErrorPassword(null));
    userApi
      .delete(email, password)
      .then((res) => {
        dispatch(actionDeleteUser(res));
      })
      .catch((error) => {
        if (!error) return;
        const errorMessage = error.response?.data.message
          .toLowerCase()
          .split(" ");
        if (errorMessage.includes("user")) {
          dispatch(actionToggleErrorUser(error.response.data.message));
        } else if (errorMessage.includes("password")) {
          dispatch(actionToggleErrorPassword(error.response.data.message));
        }
      })
      .finally(() => {
        dispatch(actionToggleFetching(false));
      });
  };
