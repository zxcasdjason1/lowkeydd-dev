import axios from "axios";
import { addVisitItem, setVisitList } from "./slice";
import { VisitList, VisitItem, ChannelProps } from "../../types";

export const editVisit = (username: string) => (dispatch: any) => {
  const postform = new FormData();
  postform.append("username", username);
  axios.post("http://localhost:8002/visit/edit", postform).then(
    (resp) => {
      console.log("開啟VisitList成功了, 回應如下:\n", resp.data);

      const code: string = resp.data["code"];
      const visit: VisitList = resp.data["visit"];
      if (code === "success") {
        console.log("資料OK");
        dispatch(setVisitList(visit.list));
      }
    },
    (err) => {
      console.log("開啟VisitList 失敗了, 錯誤如下:\n", err);
    }
  );
};

export const updateVisit =
  (username: string, visit: VisitList) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("visit", JSON.stringify({ visit }));
    axios.post("http://localhost:8002/visit/update", postform).then(
      (resp) => {
        console.log("更新VisitList成功了, 回應如下:\n", resp.data);

        const code: string = resp.data["code"];
        const visit: VisitList = resp.data["visit"];
        if (code === "success") {
          console.log("資料OK");
          dispatch(setVisitList(visit.list));
        }
      },
      (err) => {
        console.log("更新VisitList失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const getVisitItem = (url: string) => (dispatch: any) => {
  const postform = new FormData();
  postform.append("url", url);
  axios.post("http://localhost:8002/channels/search", postform).then(
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
