import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import User from "./modules/users";
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history),
});


const env = process.env.NODE_ENV;

const middlewares = typeof window === "object" && env === "development"
    ? [composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ history: history })))]
    : [applyMiddleware(thunk.withExtraArgument({ history: history }))];


if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

let store = () => createStore(rootReducer, compose(...middlewares));

export type RootState = ReturnType<typeof rootReducer>;
export default store();
