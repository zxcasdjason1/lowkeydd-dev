import * as ai from "react-icons/ai";
import styled from "styled-components";
import { history } from "../../..";
import { useDispatch, useSelector } from "../../../app/hooks";
import { selectVisitStore } from "../../visitStore/slice";
import { selectUser } from "../../user/slice";
import { selectChannelStore } from "../slice";
import { reqEditVisit, reqUpdateVisit } from "../../visitStore/api";
import { useLayoutEffect } from "react";
import { ChannelsCollections } from "./Collections";

export function ChannelsCollector() {
  const user = useSelector(selectUser);
  const visitStore = useSelector(selectVisitStore);
  const { favored } = useSelector(selectChannelStore);
  const dispatch = useDispatch();

  const handleClick = () => {
    history.push({ pathname: "/channels/" });
  };

  const onUpdate = () => {
    const { username, ssid } = user;
    dispatch(reqUpdateVisit(username, ssid, visitStore));
  };

  useLayoutEffect(() => {
    const { username, ssid } = user;
    dispatch(reqEditVisit(username, ssid, favored));
    return () => {};
  }, [dispatch, user, favored]);

  return (
    <Container>
      <Header onClick={handleClick}>
        <ai.AiOutlineUpload />
      </Header>
      <Content>
        <ChannelsCollections />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  --navColor: #4c4a46;
  --toogleColor: #1985a1;
  --menuBgColor: #4c5c68;
  --menuText: #c5c3c6;
  --menuText_Hover: #1985a1;
  --logoColor: #fff;

  position: absolute;
  top: 55px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 960px;
  height: 90vh;
  background-color: #222;
  z-index: 2;
  overflow-y: auto;
  h1 {
    //cname
    color: #fff;
    font-size: 50px;
  }
`;

const Header = styled.div`
  position: relative;
  background-color: var(--navColor);
  width: 100%;
  height: 65px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 50px;
  svg {
    padding-right: 5px;
    color: var(--toogleColor);
  }

  :hover {
    background-color: var(--menuText_Hover);
    svg {
      color: #fff;
    }
  }
`;

const Content = styled.div`
  position: relative;
`;
