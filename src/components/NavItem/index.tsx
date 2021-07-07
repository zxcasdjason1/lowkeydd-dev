import styled from "styled-components";
import { history } from "../../index";
import { NavItemProps } from "../../types";

export function NavItem(props: NavItemProps) {
  const { title, path, icon } = props;

  const onClick = () => {
    history.push({ pathname: `${path}` });
  };

  return (
    <Container onClick={onClick}>
      {icon}
      <p>{title}</p>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5em;
  cursor: pointer;

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
    p {
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
