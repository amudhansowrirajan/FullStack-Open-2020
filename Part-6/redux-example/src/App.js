// the reducer is given as a parameter to the createStore function. And reducer takes in a state and action type and returns a new state
// console.log(store.getState());
// store.dispatch({ type: "INCREMENT" });
// all actions to the state is dipatched using the store.dispatch method

import "./App.css";
import { createStore } from "redux";
import ReactDOM from "react-dom";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

function App() {
  return (
    <center>
      <h1>{store.getState()}</h1>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>-</button>
    </center>
  );
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

export default App;
