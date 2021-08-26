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
    const { username, ssid, msg } = user;
    if (isLogin) {
      if (!hasFetchChannel) {
        dispatch(reqEditVisit(username, ssid));
      }
    } else {
      if (msg === ""){
        // 透過msg判斷是否為 onErrorAndClearUser
        dispatch(setMsg("想加收藏要先登入唷~"));
        history.push({ pathname: "/login" });
      }
    }

    return () => {};
  }, [dispatch, user, isLogin, hasFetchChannel]);

  return <FavoredCardsViewer />;
}
