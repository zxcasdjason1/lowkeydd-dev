import styled from "styled-components";

type Props = {
  groupName: string;
  fontsize: string;
  lineColor?: string;
  bkgColor?: string;
};

export default function GroupLine(props: Props) {
  const { groupName } = props;
  return (
    <Container {...props}>
      <span>{groupName}</span>
    </Container>
  );
}

const Container = styled.h1<Props>`
  --lineColor: ${(p) => p.lineColor || `#000`};
  --bkgColor: ${(p) => p.bkgColor || `#fff`};

  margin: 50px 0 20px 0;
  position: relative;
  text-align: center;
  font-size: ${(p) => p.fontsize};
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 1;
  line-height: 50px;
  ::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--lineColor);
    position: absolute;
    left: 0;
    top: 50%;
    z-index: -1;
  }
  ::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--lineColor);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: -1;
  }
  span {
    padding: 0 10px;
    color: var(--lineColor);
    background-color: var(--bkgColor);
    border-radius: 5px;
  }
`;
