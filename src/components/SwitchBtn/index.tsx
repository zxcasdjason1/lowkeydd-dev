import { useState } from "react";
import styled from "styled-components";

export default function SwitchBtn(props: SwitchButtonProps) {
  const { checked, htmlFor, theme } = props;

  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Container {...theme}>
      <HiddenCheckedInput
        type="checkbox"
        id={htmlFor || ""}
        onClick={handleClick}
      />
      <ToogleFill checked={isChecked} />
    </Container>
  );
}

type SwitchButtonProps = {
  htmlFor: string;
  checked: boolean;
  theme?: SwitchButtonThemeProps;
};

type SwitchButtonThemeProps = {
  beforeColor?: string;
  afterColor?: string;
  ballColor?: string;
}

const Container = styled.label<SwitchButtonThemeProps>`
  --width: 40px;
  --height: calc(var(--width) / 2);
  --radius: calc(var(--height) / 2);
  --beforeColor: ${(props) => props.beforeColor || "#ddd"};
  --afterColor: ${(props) => props.afterColor || "#34deeb"};
  --ballColor: ${(props) => props.ballColor || "#fff"};
  display: inline-block;
  cursor: pointer;

`;

const ToogleFill = styled.div<{ checked: boolean }>`
  /* 底色 */
  position: relative;
  width: var(--width);
  height: var(--height);
  border-radius: var(--radius);
  background: ${(props) =>
    props.checked ? `var(--afterColor)` : `var(--beforeColor)`};
  transition: background 0.2s;

  /* 球球與陰影效果 */
  ::after {
    /* 透過after實現了相對內部移動的效果 */
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: var(--height);
    width: var(--height);
    background: var(--ballColor);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: var(--radius);
    transform: ${(props) =>
      props.checked ? `translateX(110%)` : `translateX(0%)`};
    transition: transform 0.5s;
  }
`;

const HiddenCheckedInput = styled.input`
  display: none;
`;