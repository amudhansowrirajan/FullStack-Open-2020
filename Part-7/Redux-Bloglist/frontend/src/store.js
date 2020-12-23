import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import blogsReducer from "./reducers/blogs";
import clientReducer from "./reducers/clientLogin";
import usersReducer from "./reducers/users";
import notificationReducer from "./reducers/notification";

const reducer = combineReducers({
  blogs: blogsReducer,
  client: clientReducer,
  users: usersReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
