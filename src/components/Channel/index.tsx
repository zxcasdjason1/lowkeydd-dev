import styled from "styled-components";
import "./index.css";

export default function ChannelItem(props: ChannelProps) {
  const {
    avatar,
    cid,
    owner,
    status,
    streamurl,
    thumbnail,
    title,
    viewcount,
    starttime,
  } = props;

  const getChannelTheme = (): ChannelThemeProps => {
    switch (status) {
      case "live":
        return {
          fontcolor: "#fff",
          fontbgcolor: "#f00",
          bordercolor: "#f00",
        };
      case "wait":
        return {
          fontcolor: "#fff",
          fontbgcolor: "#34afeb",
          bordercolor: "#6a97ad",
        };
      case "off":
        return {
          fontcolor: "#f9fae6",
          fontbgcolor: "#616161",
          bordercolor: "#616161",
        };
      default:
        return {
          fontcolor: "#f0d8e2",
          fontbgcolor: "#cb4ede",
          bordercolor: "#6c3075",
        };
    }
  };

  return (
    <Container {...getChannelTheme()}>
      <ChannelStatus className="avatarbox">
        <img src={avatar} alt={'avatar_'+cid}></img>
        <p>{status}</p>
      </ChannelStatus>
      <PreviewLink href={streamurl}>
        <img src={thumbnail} alt={'thumbnail_'+cid} />
      </PreviewLink>
      <div className="channel_Description">
        <div className="channel_Title">
          <p>{title}</p>
        </div>
        <div className="channel_Owner">{owner}</div>
        <div className="channel_Views">{viewcount}</div>
        <div className="channel_Time">{starttime}</div>
      </div>
    </Container>
  );
}

export type ChannelProps = {
  avatar: string;
  cid: string;
  owner: string;
  rendertype: string;
  starttime: string;
  status: string;
  streamurl: string;
  thumbnail: string;
  title: string;
  viewcount: string;
};

type ChannelThemeProps = {
  fontcolor: string;
  fontbgcolor: string;
  bordercolor: string;
};

const Container = styled.div<ChannelThemeProps>`
  --fontcolor: ${(props) => props.fontcolor};
  --fontbgcolor: ${(props) => props.fontbgcolor};
  --bordercolor: ${(props) => props.bordercolor};
  margin: 0px 10px 20px 10px;
  padding: 10px;
  border: solid 2px var(--bordercolor);
  border-radius: 5px;
`;

const ChannelStatus = styled.div`
  position: absolute;

  img {
    position: relative;
    top: -1.1rem;
    left: -1.2rem;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 3px solid var(--bordercolor);
    background: var(--fontcolor);
  }

  p {
    position: relative;
    top: -1.8rem;
    left: 0rem;
    width: 46px;
    height: 20px;
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--fontcolor);
    background: var(--fontbgcolor);
    border-radius: 10%;
  }
`;

const PreviewLink = styled.a`
  display: block;
  height: 8rem;
  background-color: #000;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    vertical-align: middle;
  }
`;
