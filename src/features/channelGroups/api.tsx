import axios from "axios";
import { ChannelProps, VisitItem, VisitList } from "../../types";
import { setResident, setFavored } from "./slice";
import { API_SERVER_URL } from "../../app/config";

export const getResidentChannels = (keyword: string) => (dispatch: any) => {
  axios.get(`${API_SERVER_URL}/channels/${keyword}`).then(
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
    axios.post(`${API_SERVER_URL}/letsdd`, postform).then(
      (response) => {
        console.log("成功了, 回應如下:\n", response.data);
        const channels: ChannelProps[] = response.data["channels"];
        const visit: VisitList = response.data["visit"];

        const visitMap = new Map<string, VisitItem>();
        visit.list.forEach((item) => {
          visitMap.set(item.cid, item);
        });

        const newChannels: {
          [key: string]: ChannelProps[];
        } = {
          resident: [], //常駐的頻道
        };

        channels.forEach((ch) => {
          const { cid } = ch;

          if (visitMap.has(cid)) {
            const groupName = visitMap.get(cid)?.group || "undefined";
            if (!newChannels[groupName]) {
              newChannels[groupName] = [ch];
            } else {
              newChannels[groupName].push(ch);
            }
          } else {
            newChannels["resident"].push(ch);
          }
        });

        console.log({ newChannels });
        dispatch(setFavored(newChannels));
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };
