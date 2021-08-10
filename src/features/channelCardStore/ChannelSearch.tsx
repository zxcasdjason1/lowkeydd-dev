import SearchBox from "../../components/SearchBox";
import { useDispatch, useSelector } from "../../app/hooks";
import { reqFetchChannels } from "./api";
import { reqSearchChannel } from "./api";
import { selectUser } from "../user/slice";

export function ChannelSearch() {
  const { username, ssid } = useSelector(selectUser);
  const dispatch = useDispatch();

  const onSubmit = (keyword: string) => {
    if (keyword === "") return;
    if (
      keyword === "all" ||
      keyword === "live" ||
      keyword === "wait" ||
      keyword === "off" ||
      keyword === "failure"
    ) {
      dispatch(reqFetchChannels(username, ssid, [keyword]));
    } else {
      dispatch(reqSearchChannel(keyword));
    }
  };

  return (
    <SearchBox
      onSubmit={onSubmit}
      theme={{ focusColor: "#1985a1", iconColor: "#c5c3c6" }}
    />
  );
}
