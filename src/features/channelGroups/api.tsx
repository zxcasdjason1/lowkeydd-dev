import axios from "axios";
import { ChannelProps, VisitList } from "../../types";
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
        dispatch(setFavored({visit, channels}));
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };
