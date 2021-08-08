import styled from "styled-components";
import { useSelector } from "../../../app/hooks";
import { NavButtonProps } from "../../../app/types";
import { selectIsLogin } from "../../../features/user/slice";
import NavButton from "../NavButton";

export function NavUser(props: NavButtonProps) {
  const isLogin = useSelector(selectIsLogin);

  return (
    <NavButton {...props}>
      <Status visible={isLogin}>
        <h3>
          <span>{}</span>
        </h3>
      </Status>
    </NavButton>
  );
}

const Status = styled.div<{ visible: boolean }>`
  --display: ${(props) => [props.visible ? `block` : `none`]};
  display: var(--display);
  text-align: center;
  line-height: 18px;
  position: absolute;
  color: #fff;
  z-index: 2;
  top: 22px;
  right: 95px;
  font-size: 12px;

  h3 {
    display: var(--display);
    content: "";
    transform: translate(-50%, -50%);
    position: absolute;
    top: 19px;
    left: -140px;
    width: 10px;
    height: 10px;
    color: white;
    background-color: var(--navColor);
    border-radius: 50%;

    span {
      display: var(--display);
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 6px;
      height: 6px;
      background-color: #54f542;
      border-radius: 50%;
    }

    transition: 0.3s;
  
  }
  @media screen and (max-width: 768px) and (min-width: 480px) {
    line-height: 18px;
    top: 19px;
    right: 24px;
    font-size: 14px;

    h3 {
      top: 25px;
      left: -67px;
      width: 14px;
      height: 14px;
      span {
        top: 2px;
        left: 2px;
        width: 10px;
        height: 10px;
      }
    }
  }
  @media screen and (max-width: 480px) {
    line-height: 16px;
    font-size: 12px;
    top: 28px;
    left: -265px;

    h3 {
      top: 242px;
      left: 367px;
      width: 10px;
      height: 10px;
      background-color: var(--menuBgColor);

      span {
        top: 2px;
        left: 2px;
        width: 6px;
        height: 6px;
      }
    }
  }
`;
