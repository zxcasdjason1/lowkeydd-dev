import { Fragment, useLayoutEffect, useRef } from "react";
import { reqLogin } from "./api";
import { useDispatch, useSelector } from "../../app/hooks";
import { history } from "../../index";
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

export function LoginPage() {
  const { username, msg } = useSelector(selectUser);
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  
  const routeToRegister = () => {
    history.push({ pathname: "/register" });
  };

  const onLogin = () => {
    const username = usernameInput.current?.value + "";
    const password = passwordInput.current?.value + "";

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

    dispatch(reqLogin(username, password));
  };

  
  useLayoutEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.value = username;
    }
    return () => {
      dispatch(setMsg());
    };
  }, [dispatch, usernameInput, username]);

  return (
    <Wrap>
      <Container>
        <Title>
          <h1>會員登入</h1>
        </Title>
        <Content>
          {msg !== "" ? (
            <MsgBox>
              <h1>{msg}</h1>
            </MsgBox>
          ) : (
            <Fragment />
          )}
          <UsernameField>
            <input
              type="text"
              // placeholder="請輸入用戶名?"
              ref={usernameInput}
              required
            />
            <span />
            <label>{"用戶名稱"}</label>
          </UsernameField>
          <PasswordField>
            <input
              type="password"
              // placeholder="請輸入密碼?"
              ref={passwordInput}
              required
            />
            <span />
            <label>{"用戶密碼"}</label>
          </PasswordField>
          <MainButton onClick={onLogin}>
            <p>登 入</p>
          </MainButton>{" "}
          <SwitchField>
            <p>還不是會員?</p>
            <div onClick={routeToRegister}>註冊</div>
          </SwitchField>
        </Content>
      </Container>
    </Wrap>
  );
}
