import styled from "styled-components";
import { useRef } from "react";
import { reqLogin } from "../api";
import { useDispatch } from "../../../app/hooks";
import { history } from "../../../index";

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
    <Wrap>
      <Container>
        <Title>
          <h1>會員登入</h1>
        </Title>
        <Content>
          <Username_Field>
            <input
              type="text"
              // placeholder="請輸入用戶名?"
              ref={usernameInput} required 
            />
            <span />
            <label>{"用戶名稱"}</label>
          </Username_Field>
          <Password_Field>
            <input
              type="password"
              // placeholder="請輸入密碼?"
              ref={passwordInput} required
            />
            <span />
            <label>{"用戶密碼"}</label>
          </Password_Field>
          <Login_Field onClick={onLogin}>
            <p>登 入</p>
          </Login_Field>{" "}
          <Register_Field>
            <p>還不是會員?</p>
            <div onClick={routeToRegister}>註冊</div>
          </Register_Field>
        </Content>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: none;
  overflow: hidden;
  /* background-color: red; */
`;

const Container = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #fff;

  position: relative;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-sizing: border-box;
  border: 5px solid;
  border-radius: 1.5em 1.5em 1.5em 1.5em;
  border-color: var(--navColor);
  background-color: var(--bkgColor);

  max-width: 480px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: red; */
`;

const Title = styled.div`
  padding: 20px 0 0 0;
  h1 {
    letter-spacing: 5px;
    text-align: center;
    padding: 0 0 20px 0;
    border-bottom: 1px solid silver;
    font-size: 28px;
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 20px 40px 0 40px;
  background-color: none;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      width: 100%;
      padding: 0 5px;
      height: 40px;
      font-size: 16px;
      border: none;
      outline: none;
      color: var(--btnHoverColor);

      :focus ~ label {
        top: -5px;
        color: var(--btnHoverColor);
      }
      :valid ~ label {
        top: -5px;
        color: var(--btnHoverColor);
      }
      :focus ~ span::before {
        width: 100%;
      }
    }
    label {
      position: absolute;
      top: 50%;
      left: 5px;
      color: #adadad;
      transform: translateY(-50%);
      font-size: 16px;
      pointer-events: none;
      transition: 0.3s;
    }
    span {
      ::before {
        content: "";
        position: absolute;
        top: 40px;
        left: 0;
        width: 0%;
        height: 2px;
        background-color: var(--btnHoverColor);
        transition: 0.3s;
      }
    }
  }
`;

const Username_Field = styled.div`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
`;
const Password_Field = styled.div`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
`;
const Login_Field = styled.div`
  width: 100%;
  padding: 10px 0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700px;
  color: #fff;
  background-color: var(--btnHoverColor);
  letter-spacing: 2px;
  cursor: pointer;
  outline: none;
  border: none;
  border: 2px solid;
  p {
    /* background-color: red; */
    width: 100%;
    text-align: center;
    pointer-events: none;
  }
  :hover {
    border-color: var(--btnHoverColor);
    transition: 0.2s;
  }
`;

const Register_Field = styled.div`
  position: relative;
  margin: 30px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  p {
    /* background-color: red; */
    text-align: center;
    pointer-events: none;
  }
  div {
    padding: 0px 10px;
    color: var(--btnHoverColor);
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;
