import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { reqRegister } from "../api";
import { history } from "../../../index";
import { useSelector } from "../../../app/hooks";
import { selectUser } from "../slice";
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
} from "../styles";
import { Fragment } from "react";

export function Register() {
  const dispatch = useDispatch();

  const {username, msg} = useSelector(selectUser);
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

    if (username === "") {
      console.log("用戶名不可為空");
      return;
    }
    if (password === "") {
      console.log("密碼不可為空");
      return;
    }
    if (password !== password2) {
      console.log("輸入的密碼不一致");
      return;
    }

    dispatch(reqRegister(username, password));
  };

  useLayoutEffect(() => {
    if(usernameInput.current){
      usernameInput.current.value = username;
    }
    return () => {};
  }, [usernameInput, username])

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

// const UsernameField = styled.div`
//   position: relative;
//   border-bottom: 2px solid #adadad;
//   margin: 30px 0;
// `;
// const PasswordField = styled.div`
//   position: relative;
//   border-bottom: 2px solid #adadad;
//   margin: 30px 0;
// `;
// const RegisterField = styled.div`
//   width: 100%;
//   padding: 10px 0;
//   border-radius: 25px;
//   font-size: 18px;
//   font-weight: 700px;
//   color: #fff;
//   background-color: var(--btnHoverColor);
//   letter-spacing: 2px;
//   cursor: pointer;
//   outline: none;
//   border: none;
//   border: 2px solid;
//   p {
//     /* background-color: red; */
//     width: 100%;
//     text-align: center;
//     pointer-events: none;
//   }
//   :hover {
//     border-color: var(--btnHoverColor);
//     transition: 0.2s;
//   }
// `;

// const LoginField = styled.div`
//   position: relative;
//   margin: 30px 0;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   p {
//     /* background-color: red; */
//     text-align: center;
//     pointer-events: none;
//   }
//   div {
//     padding: 0px 10px;
//     color: var(--btnHoverColor);
//     cursor: pointer;
//     :hover {
//       text-decoration: underline;
//     }
//   }
// `;
