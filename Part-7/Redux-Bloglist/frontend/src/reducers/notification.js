let timeOut;
//  only one notification at a time
export const noticeAction = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTICE",
      data: message,
    });

    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      dispatch({
        type: "CLEAR",
      });
    }, 2000);
  };
};
// add a another property to the state for various function
const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTICE":
      return {
        show: true,
        message: action.data.message,
      };
    case "CLEAR":
      return {};
    default:
      return state;
  }
};

export default notificationReducer;
