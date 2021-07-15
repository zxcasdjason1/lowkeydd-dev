import { NavItemProps, Switcher } from "./types";
import * as ai from "react-icons/ai";

export const API_SERVER_URL = "http://localhost:8002";

export const LOCAL_URL = "http://localhost/";

export const VISITS_DEFAULT_GROUPNAME = "Favorite";

export const CHANNELS_DEFAULT_GROUPNAME = "Resident";

export const SwitcherList: Array<Switcher> = [
  { checked: false, htmlFor: "live", afterColor: "#f00" },
  { checked: false, htmlFor: "wait", afterColor: "#0ff" },
  { checked: false, htmlFor: "off", afterColor: "#856" },
];

export const NavItemsArray: NavItemProps[] = [
  {
    title: "瀏覽",
    path: "/channels/",
    icon: <ai.AiOutlineHeart />,
  },
  {
    title: "影院",
    path: "/theater/",
    icon: <ai.AiOutlineVideoCamera />,
  },
  {
    title: "會員",
    path: "/login/",
    icon: <ai.AiOutlineUser />,
  },
  // {
  //   title: "收藏",
  //   path: "/visit/",
  //   icon: <ai.AiOutlineBook />,
  // },
];
