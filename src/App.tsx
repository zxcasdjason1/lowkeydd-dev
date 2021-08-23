import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelsStage from "./pages/ChannelsStage";
import TheaterPage from "./pages/TheaterPage";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import { LoginPage, RegisterPage, LogoutPage } from "./features/user";
import FavoredPage from "./pages/FavoredPage";

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/channels/" component={ChannelsStage} />
        <Route path="/theater/" component={TheaterPage} />
        <Route path="/favored/" component={FavoredPage} />
        <Route path="/login/" component={LoginPage} />
        <Route path="/logout/" component={LogoutPage} />
        <Route path="/register/" component={RegisterPage} />
        <Route path="/loading/" component={LoadingPage} />
      </Switch>

      {/* 讓NavBar可以fixed在最上方 */}
      <Navbar /> 
    </>
  );
}
