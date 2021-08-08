import { Switcher } from "./types";

// export const API_SERVER_URL = "http://192.168.50.240:8000";
export const API_SERVER_URL = `https://lowkeydd.ddnsking.com`;

export const VISITS_DEFAULT_GROUPNAME = "Favorite";

export const CHANNELS_DEFAULT_GROUPNAME = "Resident";

export const SwitcherList: Array<Switcher> = [
  { checked: false, htmlFor: "live", afterColor: "#f00" },
  { checked: false, htmlFor: "wait", afterColor: "#0ff" },
  { checked: false, htmlFor: "off", afterColor: "#856" },
];

