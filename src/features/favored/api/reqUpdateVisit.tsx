/**
 * 1) 當清單狀態改變時，於開啟清單前執行一次，避免不同步。
 * 2) 關閉清單時，若有異動時，保存新的頻道收藏清單。
 */
import axios from "axios";
import { history } from "../../..";

import { API_SERVER_URL, VISITS_DEFAULT_GROUPNAME } from "../../../app/config";
import { FavoredItem, VisitItem, VisitList } from "../../../app/types";
import { setMsg } from "../../user/slice";

import { createFavoredItem } from "../shares/createFavoredItem";
import { setFavoredList } from "../slice";

export const reqUpdateVisit =
  (username: string, ssid: string, visit: VisitList, tags: string[]) =>
  (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    postform.append("visit", JSON.stringify({ ...visit }));
    axios.post(`${API_SERVER_URL}/visit/update`, postform).then(
      (resp) => {
        console.log("更新VisitList, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        // const msg: string = resp.data["msg"];

        if (code === "success") {
          // 安全地設置新的group，且添加 "Favorite" 分群
          const group =
            visit.group && visit.group.length > 0
              ? visit.group.includes(VISITS_DEFAULT_GROUPNAME)
                ? visit.group
                : [VISITS_DEFAULT_GROUPNAME, ...visit.group]
              : [VISITS_DEFAULT_GROUPNAME];

          // 安全地設置新的 FavoredList
          const newFavoredList: FavoredItem[] =
            visit.list && visit.list.length > 0
              ? visit.list.map((l: VisitItem) =>
                  createFavoredItem(l, {
                    isChanged: false,
                    isDeleted: false,
                    isNewAdded: false,
                  })
                )
              : [];

          dispatch(
            setFavoredList({
              list: newFavoredList,
              group: group,
            })
          );
        } else if (code === "failure") {
          console.log("code failure，重新導引到登入頁面:\n");
          setFavoredList({
            list: [],
            group: [VISITS_DEFAULT_GROUPNAME],
          });
          history.push({ pathname: "/login" });
          dispatch(setMsg("發生錯誤了，麻煩請重新登入"));
        }
      },
      (err) => {
        console.log("更新VisitList失敗了, 錯誤如下:\n", err);
      }
    );
  };
