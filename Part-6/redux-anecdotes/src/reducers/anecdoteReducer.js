import ancedoteServices from "../services/anecdotes";

// Description:: Actions
// const dispatch = useDispatch();
export const voteAnecdoteAction = (ancedote) => {
  return async (dispatch) => {
    const updatedAncedote = await ancedoteServices.updateAncedote({
      ...ancedote,
      votes: ancedote.votes + 1,
    });
    dispatch({
      type: "VOTE",
      data: updatedAncedote,
    });
  };
};

export const createAnecdoteAction = (content) => {
  // console.log("reached");
  return async (dispatch) => {
    const ance = await ancedoteServices.createAnecdote(content);
    dispatch({
      type: "CREATE",
      data: ance,
    });
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await ancedoteServices.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

// Description:: Reducer
// const initialState = anecdotesAtStart.map((anec) => asObject(anec));

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      // const anecdote = state.filter((anec) => anec.id === action.data.id)[0];
      // const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((anec) =>
        anec.id !== action.data.id ? anec : action.data
      );

    case "CREATE":
      return [...state, action.data];

    case "INIT_ANECDOTES":
      return [...action.data];

    default:
      return state;
  }
};

export default anecdoteReducer;
