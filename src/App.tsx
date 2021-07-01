import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

import ChannelsStage from "./pages/ChannelsStage";
import Theater from "./pages/Theater";
import VisitPage from "./pages/VisitPage";
import { Login, Register } from "./features/user";
import HomePage from "./pages/HomePage";


export default class App extends Component {
  state = {};

  render() {
    return (
      <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/channels/" component={ChannelsStage} />
            <Route path="/theater/" component={Theater} />
            <Route path="/visit/" component={VisitPage} />
            <Route path="/login/" component={Login} />
            <Route path="/register/" component={Register} />
          </Switch>
      </div>
    );
  }
}
