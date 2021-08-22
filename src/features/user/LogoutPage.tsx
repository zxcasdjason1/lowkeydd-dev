import { Fragment, useLayoutEffect} from "react";
import { reqLogout } from "./api";
import { useDispatch, useSelector } from "../../app/hooks";
import { selectIsLogin, selectMsg, selectUser, setMsg } from "./slice";
import { Wrap, Container, Title, Content, MsgBox, MainButton } from "./styles";
import { history } from "../..";

export function LogoutPage() {
  const user = useSelector(selectUser);
  const isLogin = useSelector(selectIsLogin);
  const msg = useSelector(selectMsg);
  const dispatch = useDispatch();

  const onLogout = () => {
    const { username, ssid } = user;
    dispatch(reqLogout(username, ssid));
  };

  useLayoutEffect(()=>{
    if (!isLogin){
      dispatch(setMsg(`${user.username} 要登入嗎?`))
      history.push({ pathname: "/login" });
    }
    return ()=>{}
  },[])

  return (
    <Wrap>
      <Container>
        <Title>
          <h1>會員登出</h1>
        </Title>
        <Content>
          {msg !== "" ? (
            <MsgBox>
              <h1>{msg}</h1>
            </MsgBox>
          ) : (
            <Fragment />
          )}
          <br />
          <br />
          <MainButton onClick={onLogout}>
            <p>登 出</p>
          </MainButton>{" "}
          <br />
          <br />
        </Content>
      </Container>
    </Wrap>
  );
}
