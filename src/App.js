import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthScreen from "views/AuthScreen";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const App = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.getItem("user")
      ? history.replace(history.location.pathname)
      : history.replace("/authenticate");
  }, [history]);

  return (
    <Switch>
      <Route path="/authenticate" component={AuthScreen} />
      <Route path="/" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default App;
