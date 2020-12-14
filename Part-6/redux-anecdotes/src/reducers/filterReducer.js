const initialState = {
  content: "",
};

// Description:: Actions

export const filterAction = (content) => {
  // console.log(content);
  return {
    type: "SEARCH",
    data: content,
  };
};
// Description:: Reducer

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH":
      // console.log(state, action.data);
      return { ...state, content: action.data };
    default:
      return state;
  }
};

export default filterReducer;
