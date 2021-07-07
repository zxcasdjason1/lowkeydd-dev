import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

import ChannelsStage from "./pages/ChannelsStage";
import Theater from "./pages/Theater";
import VisitPage from "./pages/VisitPage";
import { Login, Register } from "./features/user";
import HomePage from "./pages/HomePage";
import styled from "styled-components";

export default class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar />
        {/* <Test>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet repellendus aspernatur quasi distinctio fugiat odit autem et ad modi cupiditate commodi, ducimus est dolorem praesentium explicabo enim deleniti impedit illo.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum id culpa eos ipsam! Itaque placeat, voluptatum mollitia quos, possimus voluptate omnis voluptas vitae maiores voluptatem fugiat. Saepe dolor asperiores quae.lo
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque ut facere blanditiis non dolorem reiciendis explicabo totam, doloribus temporibus facilis animi a aliquid, quo itaque, quis distinctio esse possimus? Nihil!
          </Test> */}

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

const Container = styled.div`
  position: absolute;
  top: 65px; // nav 的固定高度
  margin: auto;
`;
