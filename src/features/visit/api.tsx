import axios from "axios";
import { addVisitItem,  setWholeVisit} from "./slice";
import { VisitList, VisitItem, ChannelProps } from "../../types";
import { API_SERVER_URL } from "../../app/config";

export const reqEditVisit = (username: string) => (dispatch: any) => {
  const postform = new FormData();
  postform.append("username", username);
  axios.post(`${API_SERVER_URL}/visit/edit`, postform).then(
    (resp) => {
      console.log("開啟VisitList成功了, 回應如下:\n", resp.data);

      const code: string = resp.data["code"];
      const visit: VisitList = resp.data["visit"];
      if (code === "success") {
        dispatch(setWholeVisit(visit));
      }
    },
    (err) => {
      console.log("開啟VisitList 失敗了, 錯誤如下:\n", err);
    }
  );
};

export const reqUpdateVisit =
  (username: string, visit: VisitList) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("visit", JSON.stringify({ ...visit }));
    axios.post(`${API_SERVER_URL}/visit/update`, postform).then(
      (resp) => {
        console.log("更新VisitList成功了, 回應如下:\n", resp.data);

        const code: string = resp.data["code"];
        const visit: VisitList = resp.data["visit"];
        if (code === "success") {
          dispatch(setWholeVisit(visit));
        }
      },
      (err) => {
        console.log("更新VisitList失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const reqSearchChannel = (url: string) => (dispatch: any) => {
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
          group: "main",
          method: ch.method,
        };
        dispatch(addVisitItem(newItem));
      }
    },
    (err) => {
      console.log("失敗了, 錯誤如下:\n", err);
    }
  );
};
