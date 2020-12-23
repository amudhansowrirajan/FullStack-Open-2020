import loginService from "../services/login";
import blogService from "../services/blogs";

export const loginAction = (userCredentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.userLogin(userCredentials);
      // console.log(user);
      user && blogService.setToken(user.token);
      dispatch({
        type: "SET_USER",
        data: user,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeUserAction = () => {
  return async (dispatch) => {
    dispatch({
      type: "REMOVE_USER",
    });
  };
};

export const setUserAction = (user) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

const clientReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...action.data };
    case "REMOVE_USER":
      return {};
    default:
      return state;
  }
};

export default clientReducer;
