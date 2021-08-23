import { useLayoutEffect } from "react";
import { history } from "../..";
import { useDispatch, useSelector } from "../../app/hooks";
import { selectHasFetchChannels } from "../../features/channelCardStore/slice";
import { FavoredCardsViewer } from "../../features/favored";
import { reqEditVisit } from "../../features/favored/api";
import { selectIsLogin, selectUser, setMsg } from "../../features/user/slice";

export default function FavoredPage() {
  const user = useSelector(selectUser);
  const isLogin = useSelector(selectIsLogin);
  const hasFetchChannel = useSelector(selectHasFetchChannels);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const { username, ssid } = user;
    if (isLogin) {
      if (!hasFetchChannel) {
        dispatch(reqEditVisit(username, ssid));
      }
    } 
    else {
      history.push({ pathname: "/login" });
      dispatch(setMsg("想加收藏要先登入唷~"));
    }

    return () => {};
  }, [dispatch, user, isLogin,  hasFetchChannel]);

  return <FavoredCardsViewer />;
}
