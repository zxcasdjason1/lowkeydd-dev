/**
 * 每次開啟收藏清單時，驗證並獲取該收藏清單。
 */
import axios from "axios";
import { history } from "../../..";
import { API_SERVER_URL, VISITS_DEFAULT_GROUPNAME } from "../../../app/config";
import { VisitItem, VisitList, FavoredItem } from "../../../app/types";
import { onErrorAndClearUser } from "../../user/slice";
import { createFavoredItem } from "../shares/createFavoredItem";
import { setFavoredList } from "../slice";

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
          dispatch(setFavoredList({
            list: [],
            group: [VISITS_DEFAULT_GROUPNAME],
          }));
          dispatch(onErrorAndClearUser({msg:"發生錯誤了，麻煩請重新登入"}));
          history.push({ pathname: "/login" });
        }
      },
      (err) => {
        console.log("開啟VisitList 失敗了, 錯誤如下:\n", err);
        setFavoredList({
          list: [],
          group: [VISITS_DEFAULT_GROUPNAME],
        });
      }
    );
  };
