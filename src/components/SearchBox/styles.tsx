import styled from "styled-components";

export const Container = styled.div<{
  isHover: boolean;
  iconColor?: string;
  focusColor?: string;
}>`
  --height: 2.4rem;
  --width: 2.4rem;
  --bgColor: #2f3640;
  --iconColor: ${(props) => props.iconColor || "#e84118"};
  --focusColor: ${(props) => props.focusColor || "#fff"};
  background: var(--bgColor);
  height: var(--height);
  border-radius: var(--height);
  padding: calc(var(--height) / 4);
  width: ${(props) => (props.isHover ? `100%` : `var(--width)`)};
  transition: width 0.4s;
`;

export const SearchButton = styled.a<{ isHover: boolean }>`
  color: var(--iconColor);
  float: right;
  width: var(--width);
  height: var(--height);
  border-radius: 50%; 
  background-color: ${(props) =>
    props.isHover ? `var(--focusColor)` : `var(--bgColor)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.input<{ isHover: boolean }>`
  border: none;
  background: none;
  outline: none;
  float: left;
  color: #fff;
  font-size: 16px;
  line-height: var(--height);
  border-radius: var(--height);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
  padding: ${(props) => (props.isHover ? `0 1rem` : `0px`)};
  width: ${(props) => (props.isHover ? `80%` : `0%`)};
  transition: all 0.4s;
`;
