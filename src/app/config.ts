import {Switcher} from "./types"

export const API_SERVER_URL = "http://localhost:8002"
export const LOCAL_URL = "http://localhost/"

export const SwitcherList: Array<Switcher> = [
    { checked: false, htmlFor: "live", afterColor: "#f00" },
    { checked: false, htmlFor: "wait", afterColor: "#0ff" },
    { checked: false, htmlFor: "off", afterColor: "#856" },
  ];