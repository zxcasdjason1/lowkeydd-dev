import * as ai from "react-icons/ai";
import styled from "styled-components";
import { useState } from "react";
import { NavItemProps } from "../../app/types";
import { NavBrowser, NavTheater, NavUser, NavCollections } from "../NavButtons";
import { selectSlider } from "../../features/theater/slice";
import { useSelector } from "../../app/hooks";

export default function Navbar() {
  const [isEnable, setIsEnable] = useState(false);
  const { isFolded } = useSelector(selectSlider);

  const closeMenu = () => {
    // close menu when is mobile.
    setIsEnable(!isEnable);
  };

  const beforeSwitch = () => {};

  const afterSwitch = () => {
    closeMenu();
  };

  return (
    <Container>
      <NavBar isFolded={isFolded}>
        <Menu isEnable={isEnable}>
          <ToogleNavBkg onClick={closeMenu}>
            <div>
              <ai.AiOutlineMenu />
            </div>
          </ToogleNavBkg>
          <ul>
            <ToogleNavBkg onClick={closeMenu}>
              <div>
                <ai.AiOutlineClose />
              </div>
            </ToogleNavBkg>
            <NavBrowser
              {...NavItemList[0]}
              beforeSwitch={beforeSwitch}
              afterSwitch={afterSwitch}
            />
            <NavTheater
              {...NavItemList[1]}
              beforeSwitch={beforeSwitch}
              afterSwitch={afterSwitch}
            />
            <NavUser
              {...NavItemList[2]}
              beforeSwitch={beforeSwitch}
              afterSwitch={afterSwitch}
            />
            <NavCollections
              {...NavItemList[3]}
              beforeSwitch={beforeSwitch}
              afterSwitch={afterSwitch}
            />
          </ul>
        </Menu>
        <Logo>
          <p>LowkeyDD</p>
        </Logo>
      </NavBar>
    </Container>
  );
}

const NavItemList: NavItemProps[] = [
  {
    title: "瀏覽",
    path: "/channels/",
    icon: <ai.AiOutlineHeart />,
  },
  {
    title: "影院",
    path: "/theater/",
    icon: <ai.AiOutlineVideoCamera />,
  },
  {
    title: "會員",
    path: "/login/",
    icon: <ai.AiOutlineUser />,
  },
  {
    title: "收藏",
    path: "/favored/",
    icon: <ai.AiOutlineBook />,
  },
];

const Container = styled.div`
  position: fixed; //這樣才能讓NAV固定在畫面上
  width: 100%;
  --navColor: #4c4a46;
  --toogleColor: #1985a1;
  --menuBgColor: #4c5c68;
  --menuText: #c5c3c6;
  --menuText_Hover: #1985a1;
  --logoColor: #fff;
  z-index: 1;
`;

const NavBar = styled.nav<{ isFolded: boolean }>`
  position: relative;
  /* top: ${(p) => (p.isFolded ? `-65px` : `0px`)}; */
  background-color: var(--navColor);
  display: ${(p) => (p.isFolded ? `none` : `flex`)};
  align-items: center;
  justify-content: flex-start;
`;

const Logo = styled.div`
  position: relative;
  padding: 0 1rem;
  background: none;
  width: 150px; // 由內部logo字體決定寬度
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    color: var(--logoColor);
    font-size: 25px;
    letter-spacing: 2px;
  }
  // 螢幕寬度小於480px時
  @media screen and (max-width: 480px) {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Menu = styled.ul<{ isEnable: boolean }>`
  position: absolute;
  background-color: var(--navColor);
  width: 100%; //剩下的部分
  height: 100%;
  display: flex;
  align-items: center;

  ul {
    position: relative;
    /* background-color: #0051ff; */
    width: 100%; //剩下的部分
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }

  // 螢幕寬度小於480px時
  @media screen and (max-width: 480px) {
    ul {
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--menuBgColor);
      width: 380px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 65px 0 0 0;
      transform: ${(props) =>
        props.isEnable ? `translateX(0%)` : `translateX(-100%)`};
      transition: transform 0.2s ease-in;
    }
  }
`;

const ToogleNavBkg = styled.div`
  position: absolute;
  background-color: var(--navColor);
  color: var(--toogleColor);
  top: 0px;
  left: 0px;
  width: 100%; //用它來當作NAV的底層
  height: 65px;
  font-size: 40px;
  div {
    display: none;
  }
  @media screen and (max-width: 480px) {
    div {
      width: 65px;
      height: 65px;
      display: flex;
      justify-content: center;
      align-items: center;
      :hover {
        background-color: var(--toogleColor);
        color: var(--logoColor);
      }
    }
  }
`;
