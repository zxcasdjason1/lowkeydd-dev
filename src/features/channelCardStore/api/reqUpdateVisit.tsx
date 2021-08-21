/**
 * 上傳頻道收藏清單
 */
import axios from "axios";
import { API_SERVER_URL } from "../../../app/config";
import { VisitList } from "../../../app/types";

export const reqUpdateVisit =
  (username: string, ssid: string, visit: VisitList) =>
  (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    postform.append("visit", JSON.stringify({ ...visit }));
    axios.post(`${API_SERVER_URL}/visit/update`, postform).then(
      (resp) => {
        console.log("更新VisitList, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        // const visit: VisitList = resp.data["visit"];
        const msg: string = resp.data["msg"];
        if (code === "success") {
          console.log("更新VisitList成功了, msg:\n", msg);
        } else {
          console.log("更新VisitList失敗了, msg:\n", msg);
        }
      },
      (err) => {
        console.log("更新VisitList失敗了, 錯誤如下:\n", err);
      }
    );
  };
