import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
//import Navibar from "./components/Navibar";
import Chat from "./pages/Chat/";
import Home from "./pages/Home/";
import Letsdd from "./pages/Letsdd/";
import Theater from "./pages/Theater/";
import UserSetting from "./pages/UserSetting/";

export default class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/letsdd/" component={Letsdd} />
            <Route path="/theater/" component={Theater} />
            <Route path="/chat/" component={Chat} />
            <Route path="/usersetting/" component={UserSetting} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
