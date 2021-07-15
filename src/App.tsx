import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelsStage from "./pages/ChannelsStage";
import Theater from "./pages/Theater";
import VisitPage from "./pages/VisitPage";
import HomePage from "./pages/HomePage";
import { NavItemsArray } from "./app/config";
import LoadingPage from "./pages/LoadingPage";
import UserPage from "./pages/UserPage";

export default function App() {
  return (
    <div>
      <Navbar items={NavItemsArray} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/channels/" component={ChannelsStage} />
        <Route path="/channels/:form" component={ChannelsStage} />
        <Route path="/theater/" component={Theater} />
        <Route path="/visit/" component={VisitPage} />
        <Route
          path="/login/"
          render={()=><UserPage pageName="login"/>}
        />
        <Route
          path="/register/"
          render={()=><UserPage pageName="register"/>}
        />
        <Route path="/loading/" component={LoadingPage} />
      </Switch>
    </div>
  );
}
