import styled from "styled-components";
import { history } from "../..";
import { useDispatch, useSelector } from "../../app/hooks";
import { NavButtonProps, VisitList } from "../../app/types";
import { reqUpdateVisit } from "../../features/favored/api";
import {
  selectIsListChanged,
  selectVisitList,
} from "../../features/favored/slice";
import {
  onErrorAndClearUser,
  selectIsLogin,
  selectUser,
  setMsg,
} from "../../features/user/slice";

export default function NavButton(props: NavButtonProps) {
  const { title, path, icon, beforeSwitch, afterSwitch } = props;
  const isListChanged: boolean = useSelector(selectIsListChanged);
  const user = useSelector(selectUser);
  const isLogin: boolean = useSelector(selectIsLogin);
  const visit: VisitList = useSelector(selectVisitList);
  const dispatch = useDispatch();

  const onLeaving = (curPath: string, nextPath: string): boolean => {
    // console.log("==============ONLEAVING==============");
    // console.log("onLeaving curPath:>", curPath);
    // console.log("onLeaving nextPath:>", nextPath);
    // console.log("=====================================");
    switch (curPath) {
      case "/channels/":
        return onLeavingBrowser(curPath, nextPath);
      case "/favored/":
        return onLeavingCollections(curPath, nextPath);
      default:
        return false;
    }
  };

  const _autoSaveOnError = () => {
    /**
     * 照理說是要登入才能異動List，
     * 如果使用者離開時已經登入失效，要提醒重新登入。
     * (此時，異動的資料也會失效)
     */
    dispatch(onErrorAndClearUser("發生錯誤了，麻煩請重新登入"));
    history.push({ pathname: "/login" });
  };

  const _autoSaveAndRedirectTo = (nextPath: string) => {
    /**
     * 自動保存
     */
    console.log("The favoredlist is Changed, saved automatically");
    const { username, ssid } = user;
    dispatch(reqUpdateVisit(username, ssid, visit, nextPath));
  };

  const onLeavingBrowser = (curPath: string, nextPath: string): boolean => {

    if (isListChanged && nextPath !== "/favored/") {
      if (!isLogin) {
        _autoSaveOnError();
        return true;
      } else {
        _autoSaveAndRedirectTo(nextPath);
        return true;
      }
    }
    return false;
  };

  const onLeavingCollections = (curPath: string, nextPath: string): boolean => {

    if (isListChanged) {
      if (!isLogin) {
        _autoSaveOnError();
        return true;
      } else {
        _autoSaveAndRedirectTo(nextPath);
        return true;
      }
    }
    return false;
  };

  const onEnter = (curPath: string, nextPath: string): boolean => {
    // console.log("==============ON_ENTER==============");
    // console.log("onEnter curPath:>", curPath);
    // console.log("onEnter nextPath:>", nextPath);
    // console.log("=====================================");
    switch (nextPath) {
      case "/login/":
        return onEnterLogin();
      case "/register/":
        return onEnterRegister();
      default:
        return false;
    }
  };

  const onEnterRegister = (): boolean => {
    return false;
  };
  
  const onEnterLogin = (): boolean => {
    if (isLogin) {
      console.log("onEnterLogin");
      dispatch(setMsg(`${user.username} 要登出嗎?`));
      history.push({ pathname: "/logout/" });
      return true;
    }
    return false;
  };

  const onClick = () => {
    if (path === "") return; //無效
    beforeSwitch();
    const current = history.location.pathname;
    if (current !== path) {
      // 當Nav離開頁面時，是否發生條件轉址。
      let isLeavingChanged = onLeaving(current, path);
      if (!isLeavingChanged) {
        // 當Nav進入頁面時，是否發生條件轉址。
        let isEnterChanged = onEnter(current, path);
        if (!isEnterChanged) {
          dispatch(setMsg("")); // clear
          history.push({ pathname: `${path}` });
        }
      }
    }
    afterSwitch();
  };

  return (
    <Wrap>
      <Container onClick={onClick}>
        {icon}
        <p>{title}</p>
      </Container>
      {/* 附加物 */}
      {props.children}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  :hover {
    div {
      // Container
      background-color: var(--menuText_Hover);

      p {
        // NavItemTextColor
        color: #fff;
      }
      svg {
        // NavItemIconColor
        color: #fff;
      }
    }

    div {
      h3 {
        // NavUser-Backaground
        background-color: var(--menuText_Hover);

        span {
          // NavUser-UserName
          color: #fff;
        }
      }
    }
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5em;
  cursor: pointer;
  div {
    width: 80%;
    p {
      margin: 0px;
    }
  }

  svg {
    color: var(--menuText);
    margin-right: 10px;
    font-size: 26px;
  }
  p {
    color: var(--menuText);
    text-decoration: none;
    font-size: 23px;
    letter-spacing: 5px;
  }

  transition: 0.3s;

  // 螢幕寬度小於768px時
  @media screen and (max-width: 768px) and (min-width: 480px) {
    margin: 0 0;
    padding: 0 0;
    svg {
      margin: 0px 0px;
      padding: 0 16px;
      font-size: 35px;
    }
    p {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    width: 80%;
    margin: 0px 10px 0px 15px;
    padding: 25px;
    /* background-color: orange; */
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    svg {
      font-size: 28px;
    }
    p {
      margin: 0px;
      display: block;
      letter-spacing: 10px;
      font-size: 25px;
      width: 50%;
    }
  }
`;
