export type VisitItem = {
  cid: string;
  cname: string;
  owner: string;
  group: string;
  method: string;
};

export type VisitList = {
  group: string[];
  list: Array<VisitItem>;
};

export type visitStoreState = {
  group: string[];
  list: Array<VisitItem>;
  current: ChannelProps | null;
};

export type ChannelProps = {
  cid: string;
  cname: string;
  owner: string;
  avatar: string;
  status: string;
  rendertype: string;
  streamurl: string;
  thumbnail: string;
  title: string;
  viewcount: string;
  starttime: string;
  method: string;
  updatetime: string;
};

export type ChannelStoreState = {
  group: string[];
  tags: string[];
  view: Array<ChannelProps[]>;
};

export type UserSession = {
  ssid: string;
  username: string;
  expiration: number;
};

export type UserState = {
  username: string;
  ssid: string;
};

export type NavItemProps = {
  title: string;
  path: string;
  icon: any;
};

export type TheaterState = {
  elements: IframeProps[];
  playlist: IframeProps[];
  //slider
  slider:{
    sliderIndex: number;
    isTakenOverAnim: boolean;
    isFolded:boolean;
  },
  //iframe
  iframes:{
    ratio: number;
    size: IframeSizeProps;
  }
};

export type IframeProps = {
  src: string;
  avatar: string;
  cid: string;
  cname: string;
  preview: string;
  checked:boolean;
};

export type IframeSizeProps = {
  col: number;
  row: number;
  w: number;
  h: number;
};

export type Switcher = {
  checked: boolean;
  htmlFor: string;
  afterColor: string;
};