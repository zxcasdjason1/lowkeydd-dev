import axios from "axios";
import { setSearchResult, editList, updateList } from "./slice";
import { VisitList, VisitItem, ChannelProps } from "../../app/types";
import { API_SERVER_URL, VISITS_DEFAULT_GROUPNAME } from "../../app/config";
import { history } from "../..";
import { fetchChannels } from "../channelStore/api";

export const reqEditVisit =
  (username: string, ssid: string, already: VisitItem[]) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);
    axios.post(`${API_SERVER_URL}/visit/edit`, postform).then(
      (resp) => {
        console.log("開啟VisitList成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const visit: VisitList = resp.data["visit"];

        // 即使success，也可能使用者為初始建立，導致清單為空。
        // already 是已經存在的表單，例如我的最愛。
        if (code === "success") {
          if (visit.list) {
            const group = visit.group || [VISITS_DEFAULT_GROUPNAME];
            const list: VisitItem[] = visit.list;

            let mp = new Map<string, boolean>();
            list.forEach((l) => {
              mp.set(l.cid, true);
            });

            const nonRedundant: VisitItem[] = [];
            already.forEach((al: VisitItem) => {
              if (!mp.has(al.cid)) {
                nonRedundant.push(al);
              }
            });

            const newList = nonRedundant.concat(list);
            dispatch(editList({ list: newList, group }));
          } else {
            dispatch(
              editList({
                list: already,
                group: [VISITS_DEFAULT_GROUPNAME],
              })
            );
          }
        } else {
          dispatch(
            editList({ list: already, group: [VISITS_DEFAULT_GROUPNAME] })
          );
        }
      },
      (err) => {
        console.log("開啟VisitList 失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const reqUpdateVisit =
  (username: string, ssid: string, visit: VisitList, tags:string[]) => (dispatch: any) => {
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
          const newGroup = visit.group || [];

          // 更新並清除Favored；重置List狀態
          dispatch(updateList({ list: newList, group: newGroup }));
        }

        setTimeout(() => {
          dispatch(fetchChannels(username, ssid, tags));
          history.push({ pathname: "/channels/" });
        }, 100);
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
          if (ch.status === "failure" || !ch.cid) {
            console.error("獲取的訊息無法解析或內容有誤:\n");
            dispatch(setSearchResult({ ...visit, current: ch }));
            return;
          }
          const newItem: VisitItem = {
            avatar: ch.avatar,
            cid: ch.cid,
            cname: ch.cname,
            owner: ch.owner,
            method: ch.method,
            group: VISITS_DEFAULT_GROUPNAME,
          };

          const newList =
            visit.list === null
              ? [newItem]
              : [newItem, ...visit.list.filter((o) => o.cid !== ch.cid)];

          const newGroup =
            visit.group === null
              ? [VISITS_DEFAULT_GROUPNAME]
              : [
                  VISITS_DEFAULT_GROUPNAME,
                  ...visit.group.filter((g) => g !== VISITS_DEFAULT_GROUPNAME),
                ];

          dispatch(
            setSearchResult({ list: newList, group: newGroup, current: ch })
          );
        }
      },
      (err) => {
        console.log("失敗了, 錯誤如下:\n", err);
      }
    );
  };
