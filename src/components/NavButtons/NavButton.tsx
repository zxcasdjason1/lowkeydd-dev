import styled from "styled-components";
import { history } from "../..";
import { useDispatch, useSelector } from "../../app/hooks";
import { NavButtonProps, VisitList } from "../../app/types";
import { reqUpdateVisit } from "../../features/favored/api";
import {
  selectIsListChanged,
  selectVisitList,
} from "../../features/favored/slice";
import { selectIsLogin, selectUser, setMsg } from "../../features/user/slice";

export default function NavButton(props: NavButtonProps) {
  const { title, path, icon, beforeSwitch, afterSwitch } = props;

  const isListChanged: boolean = useSelector(selectIsListChanged);
  const user = useSelector(selectUser);
  const isLogin: boolean = useSelector(selectIsLogin);
  const visit: VisitList = useSelector(selectVisitList);
  const dispatch = useDispatch();

  const onLeavingCollections = (nextPath: string): boolean => {
    console.log("location:>", history.location);
    console.log("nextPath:>", nextPath);
    if (history.location.pathname === "/favored/") {
      if (!isLogin) {
        history.push({ pathname: "/login/" });
        return true;
      } else if (isListChanged) {
        // 自動保存
        console.log("The favoredlist is Changed, saved automatically");
        const { username, ssid } = user;
        dispatch(reqUpdateVisit(username, ssid, visit, nextPath));
        return true;
      }
    }
    return false;
  };

  const onClick = () => {
    if (path === "") return; //無效
    beforeSwitch();
    if (history.location.pathname !== path) {
      let isChanged = onLeavingCollections(path);
      if (!isChanged) {
        dispatch(setMsg("")); // clear
        history.push({ pathname: `${path}` });
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
