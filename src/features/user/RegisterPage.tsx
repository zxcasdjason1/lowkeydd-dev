import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { reqRegister } from "./api";
import { history } from "../../index";
import { useSelector } from "../../app/hooks";
import { selectUser, setMsg } from "./slice";
import {
  Wrap,
  Container,
  Title,
  Content,
  MsgBox,
  UsernameField,
  PasswordField,
  MainButton,
  SwitchField,
} from "./styles";
import { Fragment } from "react";

export function RegisterPage() {
  const {username, msg} = useSelector(selectUser);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordInput2 = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const routeToLogin = () => {
    history.push({ pathname: "/login" });
  };

  const onRegister = () => {
    const username = usernameInput.current?.value + "";
    const password = passwordInput.current?.value + "";
    const password2 = passwordInput2.current?.value + "";

    if (username === "") {
      // console.log("用戶名不可為空");
      dispatch(setMsg("用戶名不可為空"));
      return;
    }
    if (password === "") {
      // console.log("密碼不可為空");
      dispatch(setMsg("密碼不可為空"));
      return;
    }
    if (password !== password2) {
      // console.log("輸入的密碼不一致");
      dispatch(setMsg("輸入的密碼不一致"));
      return;
    }

    dispatch(reqRegister(username, password));
  };

  useLayoutEffect(() => {
    if(usernameInput.current){
      usernameInput.current.value = username;
    }
    return () => {
      dispatch(setMsg());
    };
  }, [dispatch, usernameInput, username])

  return (
    <Wrap>
      <Container>
        <Title>
          <h1>會員註冊</h1>
        </Title>
        <Content>
          {msg !== "" ? (
            <MsgBox>
              <h1>{msg}</h1>
            </MsgBox>
          ) : (
            <Fragment/>
          )}
          <UsernameField>
            <input type="text" ref={usernameInput} required />
            <span />
            <label>{"用戶名稱"}</label>
          </UsernameField>
          <PasswordField>
            <input type="password" ref={passwordInput} required />
            <span />
            <label>{"用戶密碼"}</label>
          </PasswordField>
          <PasswordField>
            <input type="password" ref={passwordInput2} required />
            <span />
            <label>{"密碼確認"}</label>
          </PasswordField>
          <MainButton onClick={onRegister}>
            <p>註 冊</p>
          </MainButton>{" "}
          <SwitchField>
            <p>註冊過了?</p>
            <div onClick={routeToLogin}>登入</div>
          </SwitchField>
        </Content>
      </Container>
    </Wrap>
  );
}
