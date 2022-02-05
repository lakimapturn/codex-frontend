import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";
import "assets/css/styles.css";
import App from "App";
import { Provider } from "react-redux";

import { applyMiddleware, combineReducers, createStore } from "redux";
import { dogReducer } from "store/reducers/dogReducer";
import ReduxThunk from "redux-thunk";
import { userReducer } from "store/reducers/userReducer";
import { questionReducer } from "store/reducers/QAReducer";

const appReducer = combineReducers({
  dog: dogReducer,
  user: userReducer,
  questions: questionReducer,
});

const store = createStore(appReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
