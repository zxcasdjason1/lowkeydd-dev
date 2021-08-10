import styled from "styled-components";

export const Wrap = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: 100vh;
  background: none;
  overflow: hidden;
`;

export const Container = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #fff;

  position: relative;
  top: 50%;
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

export const MsgBox = styled.div`
  position: relative;
  left: 0%;
  top: 0%;

  padding: 20px 0;
  border-radius: 20px;

  border: 2px solid var(--btnHoverBgColor);

  display: flex;
  justify-content: center;

  :after {
    position: absolute;
    margin-top: 58px;
    background-color: #fff;
    /* top: 20px; */
    content: "";
    width: 25px;
    height: 25px;
    border-bottom: 2px solid var(--btnHoverBgColor);
    border-right: 2px solid var(--btnHoverBgColor);
    /* border-top: 2px solid var(--btnHoverBgColor); */
    /* border-left: 2px solid var(--btnHoverBgColor); */
    transform: rotate(45deg);
    z-index: 1;
  }

  h1 {
    position: relative;
    display: block;
    color: var(--btnHoverBgColor);
    z-index: 2;

    animation: animate .8s linear infinite;

    @keyframes animate {
      0% {
        transform: translateX(-3px);
      }
      50% {
        transform: translateX(3px);
      }
      100% {
        transform: translateX(-3px);
      }
    }
  }
`;

export const Title = styled.div`
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

export const Content = styled.div`
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

export const UsernameField = styled.div`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
`;

export const PasswordField = styled.div`
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
`;

export const MainButton = styled.div`
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

export const SwitchField = styled.div`
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
