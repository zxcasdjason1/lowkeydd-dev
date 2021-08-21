import { useLayoutEffect } from "react";
import { history } from "../..";
import { useDispatch, useSelector } from "../../app/hooks";
import { selectTags } from "../../features/channelCardStore/slice";
import { FavoredCardsViewer } from "../../features/favored";
import { reqEditVisit, reqUpdateVisit } from "../../features/favored/api";
import {
  selectIsListChanged,
  selectVisitList,
} from "../../features/favored/slice";
import { selectIsLogin, selectUser, setMsg } from "../../features/user/slice";

export default function FavoredPage() {
  const user = useSelector(selectUser);
  const visit = useSelector(selectVisitList);
  const tags = useSelector(selectTags);
  const isLogin = useSelector(selectIsLogin);
  const isListChanged = useSelector(selectIsListChanged);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const { username, ssid } = user;
    if (isLogin) {
      if (isListChanged) {
        dispatch(reqUpdateVisit(username, ssid, visit, tags));
      } else {
        dispatch(reqEditVisit(username, ssid));
      }
    } else {
      history.push({ pathname: "/login" });
      dispatch(setMsg("想加收藏要先登入唷~"));
    }

    return () => {};
  }, [dispatch, user]);

  return <FavoredCardsViewer />;
}
