import SearchBox from "../../../components/SearchBox";
import { useDispatch, useSelector } from "../../../app/hooks";
import { fetchChannels } from "../api";

export function ChannelsSearch() {
  const { username, ssid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = (keyword: string) => {
    dispatch(fetchChannels(username, ssid, [keyword]));
  };

  return (
    <SearchBox
      onSubmit={onSubmit}
      theme={{ focusColor: "#1985a1", iconColor: "#c5c3c6" }}
    />
  );
}
