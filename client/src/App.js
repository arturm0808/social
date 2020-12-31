import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MenuBar from "./components/MenuBar/MenuBar";
import AuthRoute from "./util/AuthRoute";

import { AuthProvider } from "./context/auth";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
