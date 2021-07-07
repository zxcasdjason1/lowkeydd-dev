import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

import ChannelsStage from "./pages/ChannelsStage";
import Theater from "./pages/Theater";
import VisitPage from "./pages/VisitPage";
import { Login, Register } from "./features/user";
import HomePage from "./pages/HomePage";
import * as ai from "react-icons/ai";
import { NavItemProps } from "./types";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar items={NavItemsArray}/>
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

const NavItemsArray: NavItemProps[] = [
  {
    title: "瀏覽",
    path: "/channels/",
    icon: <ai.AiOutlineHeart />,
  },
  {
    title: "影院",
    path: "/theater/",
    icon: <ai.AiOutlineVideoCamera />,
  },
  {
    title: "收藏",
    path: "/visit/",
    icon: <ai.AiOutlineBook />,
  },
  {
    title: "會員",
    path: "/login/",
    icon: <ai.AiOutlineUser />,
  },
];