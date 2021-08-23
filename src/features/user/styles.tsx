import styled from "styled-components";

export const Wrap = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: 100vh;
  /* background: none; */
  background: linear-gradient(120deg, #4c4a46, #c5c3c6);
  overflow: hidden;
`;

export const Container = styled.div`
  --titleColor: #E87A00;

  --mainColor: #4c5c68;
  --mainBorderColor: #adadad;
  --mainHoverColor: #E87A00;
  --mainBorderHoverColor: #D89C60;

  --inputLineColor: #adadad;
  --inputLineValidColor: #E87A00;

  --msgBgColor: #E87A00;
  --msgBorderColor: #D89C60;
  --msgTxtColor: #fff;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-sizing: border-box;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);

  max-width: 480px;
  min-width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
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
      color: var(--inputLineValidColor);

      :focus ~ label {
        top: -5px;
        color: var(--inputLineValidColor);
      }
      :valid ~ label {
        top: -5px;
        color: var(--inputLineValidColor);
      }
      :focus ~ span::before {
        width: 100%;
      }
      :valid ~ span::before {
        width: 100%;
      }
    }
    label {
      position: absolute;
      top: 50%;
      left: 5px;
      color: var(--inputLineColor);
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
        background-color: var(--inputLineValidColor);
        transition: 0.3s;
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
    color: var(--titleColor);
    font-weight: 400;
  }
`;

export const MsgBox = styled.div`
  position: relative;
  left: 0%;
  top: 0%;
  padding: 20px 0;

  border-radius: 20px;
  border: 2px solid var(--msgBorderColor);

  display: flex;
  justify-content: center;
  background: var(--msgBgColor);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);

  :after {
    position: absolute;
    margin-top: 59px;
    content: "";
    width: 25px;
    height: 25px;
    background-color: var(--msgBgColor);
    border-bottom: 2px solid var(--msgBorderColor);
    border-right: 2px solid var(--msgBorderColor);
    transform: rotate(45deg);
  }

  h1 {
    position: relative;
    display: block;
    color: var(--msgTxtColor);
    animation: msgTextShaking 0.8s linear infinite;

    @keyframes msgTextShaking {
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

export const UsernameField = styled.div`
  position: relative;
  border-bottom: 2px solid var(--inputLineColor);
  margin: 30px 0;

  input {
    background: none;
  }
`;

export const PasswordField = styled.div`
  position: relative;
  border-bottom: 2px solid var(--inputLineColor);
  margin: 30px 0;

  input {
    background: none;
  }
`;

export const MainButton = styled.div`
  width: 100%;
  padding: 10px 0;
  border-radius: 25px;
  font-size: 18px;
  font-weight: 700px;
  color: var(--inputLineColor);
  background-color: var(--mainColor);
  border: 2px solid;
  border-color: var(--mainBorderColor);
  letter-spacing: 2px;
  cursor: pointer;
  outline: none;
  p {
    width: 100%;
    text-align: center;
    pointer-events: none;
  }
  :hover {
    color: #fff;
    background-color: var(--mainHoverColor);
    border-color: var(--mainBorderHoverColor);
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
    text-align: center;
    pointer-events: none;
    color: var(--inputLineColor);
  }
  div {
    padding: 0px 10px;
    color: var(--titleColor);
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;
