import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChannelsStage from "./pages/ChannelsStage";
import TheaterPage from "./pages/TheaterPage";
import HomePage from "./pages/HomePage";
import { NavItemsArray } from "./app/config";
import LoadingPage from "./pages/LoadingPage";
import UserPage from "./pages/UserPage";
import { FavoredCardsViewer } from "./features/channelCardStore";
import { Fragment } from "react";
import { useDispatch, useSelector } from "./app/hooks";
import {
  selectIsFavoredCardsViewerEnable,
  setIsFavoredCardsViewerEnable,
} from "./features/channelCardStore/slice";

export default function App() {
  const isFavoredCardsViewerEnable = useSelector(
    selectIsFavoredCardsViewerEnable
  );
  const dispatch = useDispatch();
  const closeFavoredCardsViewer = () => {
    dispatch(setIsFavoredCardsViewerEnable(false));
  };
  return (
    <div>
      <Navbar items={NavItemsArray} onClick={closeFavoredCardsViewer} />
      {isFavoredCardsViewerEnable ? <FavoredCardsViewer /> : <Fragment />}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/channels/" component={ChannelsStage} />
        <Route path="/theater/" component={TheaterPage} />
        <Route path="/login/" render={() => <UserPage pageName="login" />} />
        <Route
          path="/register/"
          render={() => <UserPage pageName="register" />}
        />
        <Route path="/loading/" component={LoadingPage} />
      </Switch>
    </div>
  );
}
