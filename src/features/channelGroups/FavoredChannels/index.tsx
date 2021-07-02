import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../app/hooks";
import Channel from "../../../components/Channel";
import { ChannelProps } from "../../../types";
import styled from "styled-components";
import { getFavoredChannels, getResidentChannels } from "../api";

export function FavoredChannels() {
  const channelGroups = useSelector((state) => state.channelgroups.value);
  const {group} = useSelector((state) => state.visit);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.ssid == ""){
      dispatch(getResidentChannels("all")) ;
      return
    }
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(getFavoredChannels(user.username, user.ssid));
    return () => {
      // componentWillUnmount
    };
  }, [dispatch]);

  return (
    <>
    {
      channelGroups.map((channels, i)=>{
       return  <GroupChannels key={"GroupChannels_"+group[i]} channels = {channels} groupName={group[i]} />
      })
    }
    </>
  );
}

function GroupChannels(props: { channels: ChannelProps[], groupName:string }) {
  const { channels,groupName } = props;
  return (
    <>
    <p>{groupName||"resident"}</p>
    <ChannelGridCantainer>
      
      {channels.map((ch: ChannelProps) => 
        <Channel key={ch.cid} {...ch} />
      )}
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
