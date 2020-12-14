const initialState = {
  content: "",
  visibility: false,
};
let timer;
// Description:: Actions
export const notificationMessageAction = (content, seconds) => {
  // let timer;
  return async (dispatch) => {
    dispatch({
      type: "MESSAGE",
      data: { content },
    });
    clearTimeout(timer);
    timer = setTimeout(() => dispatch(clearNotification()), seconds * 1000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR",
  };
};

// Description:: Reducer
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MESSAGE":
      return { ...action.data, visibility: true };
    case "CLEAR":
      return { ...initialState };
    default:
      return state;
  }
};

export default notificationReducer;
