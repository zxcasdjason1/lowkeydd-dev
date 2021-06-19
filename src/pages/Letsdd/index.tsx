import { useEffect, useState } from "react";
import axios from "axios";
import Channel, { ChannelProps } from "../../components/Channel";
import Search from "../../components/Search";
import styled from "styled-components";

export default function Letsdd() {
  const [channels, setChannels] = useState<Array<ChannelProps>>([]);

  const getChannels = (keyword: string) => {
    axios.get(`https://lowkeydd.ddns.net/channels/${keyword}`).then(
      (response) => {
        console.log("成功了, 回應如下:\n", response.data);
        const { channels } = response.data;
        setChannels(channels);
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };

  useEffect(() => {
    //componentDidMount

    // 透過當前路徑去解析，取得要獲取的資源標籤
    getChannels("live");
    console.log("live");

    return () => {
      // componentWillUnmount
      // cleanup
    };
  }, []);

  return (
    <>
      <Search onSubmit={getChannels} />
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
