import axios from "axios";
import { ChannelProps, VisitItem, VisitList } from "../../types";
import { setResident, setFavored } from "./slice";

export const getResidentChannels = (keyword: string) => (dispatch: any) => {
  axios.get(`http://localhost:8002/channels/${keyword}`).then(
    (response) => {
      console.log("成功了, 回應如下:\n", response.data);
      const { channels } = response.data;
      dispatch(setResident(channels));
    },
    (error) => {
      console.log("失敗了, 錯誤如下:\n", error);
    }
  );
};

export const getFavoredChannels =
  (username: string, ssid: string) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    axios.post("http://localhost:8002/letsdd", postform).then(
      (response) => {
        console.log("成功了, 回應如下:\n", response.data);
        const channels: ChannelProps[] = response.data["channels"];
        const visit: VisitList = response.data["visit"];

        const visitMap = new Map<string, VisitItem>();
        visit.list.forEach((item) => {
          visitMap.set(item.cid, item);
        });

        const favored: {
          [key: string]: ChannelProps[];
        } = {};

        const resident: ChannelProps[] = [];

        channels.forEach((ch) => {
          const { cid } = ch;
          if (visitMap.has(cid)) {
            const item = visitMap.get(cid);
            let groupName = item?.group || "undefined";
            if (!favored[groupName]) {
              favored[groupName] = [ch];
            } else {
              favored[groupName].push(ch);
            }
          } else {
            resident.push(ch);
          }
        });
        const newChannels = {
          resident,
          ...favored,
        }
        console.log({ newChannels });
        dispatch(setFavored(newChannels));
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };
