import { useState } from "react";
import * as ai from "react-icons/ai";
import styled from "styled-components";
import { NavItemProps } from "../../types";
import { NavItem } from "../NavItem";

type NavbarProps ={
  items: NavItemProps[]
}

function Navbar(props:NavbarProps) {
  const [isEnable, setIsEnable] = useState(false);

  const showMenu = () => {
    setIsEnable(!isEnable);
  };

  return (
    <Container>
      <Nav>
        <Logo>
          <p>LowkeyDD</p>
        </Logo>
        <Menu isEnable={isEnable}>
          <Toogle_NavBkg onClick={showMenu}>
            <div>
              <ai.AiOutlineMenu />
            </div>
          </Toogle_NavBkg>
          <ul>
            <Toogle_NavBkg onClick={showMenu}>
              <div>
                <ai.AiOutlineClose />
              </div>
            </Toogle_NavBkg>
            {props.items.map((item) => (
              <NavItem key={`MenuItem_${item.title}`} {...item} showMenu={showMenu}/>
            ))}
          </ul>
        </Menu>
      </Nav>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  position: fixed; //這樣才能讓NAV固定在畫面上
  width: 100%;
  --navColor: #4c4a46;
  --toogleColor: #1985a1;
  --menuBgColor: #4c5c68;
  --menuText: #c5c3c6;
  --menuText_Hover: #1985a1;
  --logoColor: #fff;
  z-index: 5;
`;

const Nav = styled.nav`
  position: relative;
  background-color: var(--navColor);
  display: flex;
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
  z-index: 1;
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

const Toogle_NavBkg = styled.div`
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
    }
    div:hover {
      background-color: var(--toogleColor);
      color: var(--logoColor);
    }
  }
`;
