import {
    legacy_createStore,
    applyMiddleware,
    compose,
    combineReducers,
  } from "redux";
  import thunk from "redux-thunk";
import { appReducer } from "./appReducer/appReducer";
import { authReducer } from "./authReducer/authReducer";

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const rootReducers = combineReducers({ appReducer,authReducer  });
  
  export const store = legacy_createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk))
  );