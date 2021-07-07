import { useState } from "react";
import * as ai from "react-icons/ai";
import styled from "styled-components";
import { history } from "../../index";

function Navbar() {
  const [isEnable, setIsEnable] = useState(false);

  const showMenu = () => {
    setIsEnable(!isEnable);
  };

  return (
    <Container>
      <Nav>
        {/* <Bottom></Bottom> */}
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
            {/* <Bottom></Bottom> */}
            <Toogle_NavBkg onClick={showMenu}>
              <div>
                <ai.AiOutlineClose />
              </div>
            </Toogle_NavBkg>
            {SiderbarArray.map((item) => {
              return <MenuItem key={`MenuItem_${item.title}`} {...item} />;
            })}
          </ul>
        </Menu>
      </Nav>
    </Container>
  );
}

function MenuItem(props: MenuItemProps) {
  const { title, path, icon } = props;

  const onClick = () => {
    history.push({ pathname: `${path}` });
  };

  return (
    <MenuItemContainer onClick={onClick}>
      {icon}
      <p>{title}</p>
    </MenuItemContainer>
  );
}

export default Navbar;

type MenuItemProps = {
  title: string;
  path: string;
  icon: any;
};

const SiderbarArray: MenuItemProps[] = [
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
    title: "收藏",
    path: "/visit/",
    icon: <ai.AiOutlineBook />,
  },
  {
    title: "會員",
    path: "/login/",
    icon: <ai.AiOutlineUser />,
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

const MenuItemContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5em;

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
  :hover {
    background-color: var(--menuText_Hover);
    p{
      color: var(#fff);
    }
  }

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
    :hover {
      svg {
        font-size: 38px;
      }
    }
  }
  @media screen and (max-width: 480px) {
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
      display: block;
      letter-spacing: 10px;
      font-size: 25px;
      width: 50%;
    }
    :hover {
      border-radius: 10px;
      svg {
        font-size: 30px;
      }
      p {
        font-size: 26px;
      }
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
