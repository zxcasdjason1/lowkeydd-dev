import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelsStage from "./pages/ChannelsStage";
import TheaterPage from "./pages/TheaterPage";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import { FavoredCardsViewer } from "./features/channelCardStore";
import { LoginPage, RegisterPage } from "./features/user";

export default function App() {

  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/channels/" component={ChannelsStage} />
        <Route path="/theater/" component={TheaterPage} />
        <Route path="/visit/" component={FavoredCardsViewer} />
        <Route path="/login/" component={LoginPage} />
        <Route path="/register/" component={RegisterPage} />
        <Route path="/loading/" component={LoadingPage} />
      </Switch>
    </div>
  );
}
