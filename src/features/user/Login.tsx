import styled from "styled-components";
import { useRef } from "react";
import { reqLogin } from "./api";
import { useDispatch } from "../../app/hooks";
import { history } from "../../index";


export function Login() {

  const dispatch = useDispatch();

  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const routeToRegister = () => {
    history.push({ pathname: "/register" });
  };

  const onLogin = () => {
    const username = usernameInput.current?.value + "";
    const password = passwordInput.current?.value + "";

    if (username == "") {
      console.log("用戶名不可為空");
      return;
    }
    if (password == "") {
      console.log("密碼不可為空");
      return;
    }

    dispatch(reqLogin(username, password));
  };

  return (
    <Container>
      <h1>會員登入</h1>
      <input type="text" placeholder="請輸入用戶名?" ref={usernameInput} />
      <input type="password" placeholder="請輸入密碼?" ref={passwordInput} />
      <button onClick={onLogin}>登入</button>
      <button onClick={routeToRegister}>還不是會員</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
