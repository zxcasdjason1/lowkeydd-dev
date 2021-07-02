import { useEffect } from "react";
import Channel  from "../../../components/Channel";
import { ChannelProps }  from "../../../types";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import { getResidentChannels } from "../api";

export function ResidentChannels() {
  
  const channels = useSelector((state) => state.channelgroups.resident);
  const dispatch = useDispatch();

  useEffect(() => {
    //componentDidMount
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(getResidentChannels("live")) ;
    return () => {
      // componentWillUnmount
    };
  }, [dispatch]);

  console.log("new Render")
  return (
    <>
      <ChannelGridCantainer>
        {channels.map((ch: ChannelProps) => (
            <Channel key={ch.cid} {...ch} />
        ))}
      </ChannelGridCantainer>
    </>
  );
}

const ChannelGridCantainer = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  align-items: center;
`;
