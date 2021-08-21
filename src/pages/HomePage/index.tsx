import { useEffect } from "react";
import { history } from "../..";
import { useDispatch, useSelector } from "../../app/hooks";
import { selectIsLogin, setMsg } from "../../features/user/slice";

export default function HomePage() {
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      history.push({ pathname: "/channels" });
    } else {
      dispatch(setMsg("")); // clear
      history.push({ pathname: "/login" });
    }
    return () => {};
  }, [isLogin, dispatch]);

  return <div>Home</div>;
}
