import axios from "axios";
import { setWholeVisit,setSearchResult } from "./slice";
import { VisitList, VisitItem, ChannelProps } from "../../types";
import { API_SERVER_URL } from "../../app/config";

const Default_GroupName = "Favorite";

export const reqEditVisit =
  (username: string, ssid: string) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    axios.post(`${API_SERVER_URL}/visit/edit`, postform).then(
      (resp) => {
        console.log("開啟VisitList成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const visit: VisitList = resp.data["visit"];
        if (code === "success") {
          const newList = visit.list || [];
          const newGroup = visit.group || []
          dispatch(setWholeVisit({ list: newList, group: newGroup }));
        }
      },
      (err) => {
        console.log("開啟VisitList 失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const reqUpdateVisit =
  (username: string, ssid: string, visit: VisitList) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    postform.append("visit", JSON.stringify({ ...visit }));
    axios.post(`${API_SERVER_URL}/visit/update`, postform).then(
      (resp) => {
        console.log("更新VisitList成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const visit: VisitList = resp.data["visit"];
        if (code === "success") {
          const newList = visit.list || [];
          const newGroup = visit.group || []
          dispatch(setWholeVisit({ list: newList, group: newGroup }));
        }
      },
      (err) => {
        console.log("更新VisitList失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const reqSearchChannel =
  (url: string, visit: VisitList) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("url", url);
    axios.post(`${API_SERVER_URL}/channels/search`, postform).then(
      (resp) => {
        console.log("[ChanelSearch]成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const ch: ChannelProps = resp.data["channels"][0];
        if (code === "success") {
          const newItem: VisitItem = {
            cid: ch.cid,
            cname: ch.cname,
            owner: ch.owner,
            method: ch.method,
            group: Default_GroupName,
          };

          const newList =
            visit.list === null
              ? [newItem]
              : [newItem, ...visit.list.filter((o) => o.cid != ch.cid)];

          const newGroup =
            visit.group === null
              ? [Default_GroupName]
              : [Default_GroupName, ...visit.group];

          dispatch(setSearchResult({list: newList, group: newGroup , current: ch}));
        }
      },
      (err) => {
        console.log("失敗了, 錯誤如下:\n", err);
      }
    );
  };
