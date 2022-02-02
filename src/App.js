import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
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

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/home" />
      </Switch>
    </Provider>
  );
};

export default App;
