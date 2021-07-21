import axios from "axios";
import {
  API_SERVER_URL,
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../../app/config";
import { FavoredItem, VisitItem, VisitList } from "../../../app/types";
import { createVisitItem } from "../share";
import { setFavoredList } from "../slice";
import { reqUpdateVisit } from "./reqUpdateVisit";

export const reqEditVisit =
  (username: string, ssid: string, already: FavoredItem[], tags: string[]) =>
  (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    axios.post(`${API_SERVER_URL}/visit/edit`, postform).then(
      (resp) => {
        console.log("開啟VisitList成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const visit: VisitList = resp.data["visit"];

        // 尚未登入時已有添加喜歡的對象到表單，登入後自動獲取該表單與回應收到的結果進行合併。

        // 即使success，也可能新的使用者初始清單為空。
        if (code === "success" && visit.list) {
          // 安全地添加 "Favorite" 分群
          const group = visit.group.includes(VISITS_DEFAULT_GROUPNAME)
            ? visit.group
            : [VISITS_DEFAULT_GROUPNAME, ...visit.group];

          // 被添加到最愛的頻道都會被標記為 isNewAdded = true，蒐集後並轉換型態成VisitItem[]
          const newAdded: VisitItem[] = already.reduce(
            (result: VisitItem[], cur: FavoredItem) =>
              cur.isNewAdded && !cur.isDeleted
                ? result.concat(createVisitItem(cur))
                : result,
            []
          );

          // 取出"新的且沒被刪除的"被添加到最愛的頻道，並與回應收到的表單頻道比對後去除重複的。
          const mp = new Map<string, boolean>();
          const newlist: VisitItem[] = newAdded
            .concat(visit.list)
            .reduce((result: VisitItem[], cur: VisitItem) => {
              if (!mp.has(cur.cid)) {
                mp.set(cur.cid, true);
                return result.concat(cur);
              } else {
                return result;
              }
            }, []);
          setTimeout(() =>
            (function (group: string[], list: VisitItem[]) {
              dispatch(reqUpdateVisit(username, ssid, { group, list }, tags));
            })(group, newlist)
          );
        } else {
          dispatch(
            setFavoredList({
              list: already,
              group: [VISITS_DEFAULT_GROUPNAME, CHANNELS_DEFAULT_GROUPNAME],
            })
          );
        }
      },
      (err) => {
        console.log("開啟VisitList 失敗了, 錯誤如下:\n", err);
      }
    );
  };
