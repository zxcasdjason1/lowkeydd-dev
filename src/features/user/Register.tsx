import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reqRegister } from "./api";
import { history } from "../../index";

export function Register() {
  const dispatch = useDispatch();

  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordInput2 = useRef<HTMLInputElement>(null);

  const routeToLogin = () => {
    history.push({ pathname: "/login" });
  };

  const onRegister = () => {
    const username = usernameInput.current?.value + "";
    const password = passwordInput.current?.value + "";
    const password2 = passwordInput2.current?.value + "";

    if (username == "") {
      console.log("用戶名不可為空");
      return;
    }
    if (password == "") {
      console.log("密碼不可為空");
      return;
    }
    if (password !== password2) {
      console.log("輸入的密碼不一致");
      return;
    }
    
    dispatch(reqRegister(username, password));
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container>
      <h1>會員註冊</h1>
      <input type="text" placeholder="請輸入用戶名?" ref={usernameInput} />
      <input type="password" placeholder="請輸入密碼?" ref={passwordInput} />
      <input type="password" placeholder="確認輸入密碼?" ref={passwordInput2} />
      <button onClick={onRegister}>確認</button>
      <button onClick={routeToLogin}>我註冊過了</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
