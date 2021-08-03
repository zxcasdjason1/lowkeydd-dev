export type VisitItem = {
  cid: string;
  cname: string;
  owner: string;
  avatar: string;
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
  favored: Array<VisitItem>;
  isListChanged: boolean;
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
  current: ChannelProps | null;
  group: string[];
  tags: string[];
  view: Array<ChannelProps[]>;
  list: VisitItem[];
};

export type UserSession = {
  ssid: string;
  username: string;
  expiration: number;
};

export type UserLoginResponse = {
  ssid: string;
  username: string;
  expiration: number;
  msg: string;
};

export type UserRegisterResponse = {
  ssid: string;
  username: string;
  expiration: number;
  msg: string;
};

export type UserState = {
  username: string;
  ssid: string;
  msg: string;
};

export type NavItemProps = {
  title: string;
  path: string;
  icon: any;
};

export type TheaterState = {
  fromChannel: ChannelCardProps[];
  elements: TheaterElement[];
  playlist: PlayerIframe[];
  chatlist: ChatboxIframe[];
  //slider
  slider: {
    sliderIndex: number;
    isTakenOverAnim: boolean;
    isFolded: boolean;
  };
  //iframe
  gridlayout: {
    flexType: string;
    ratio: number;
    clientWidth: number;
    clientHeight: number;
    col: number;
    row: number;
  };
};

export type TheaterElement = {
  cid: string;
  cname: string;
  avatar: string;
  streamurl: string;
  preview: string;
  method: string;
  checked: boolean;
};

export type IframeProps = {
  cid: string;
  cname: string;
  avatar: string;
  streamurl: string;
  preview: string;
  method: string;
  src: string;
  ratio: number;
  w: number;
  h: number;
};

export interface PlayerIframe extends IframeProps {}

export interface ChatboxIframe extends IframeProps {
  isEnable: boolean;
}

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

export type ChannelCardProps = {
  cid: string;
  cname: string;
  owner: string;
  avatar: string;

  // visit
  group: string;

  // channel
  status: string;
  rendertype: string;
  streamurl: string;
  thumbnail: string;
  title: string;
  viewcount: string;
  starttime: string;
  method: string;
  updatetime: string;

  // theme
  heart: boolean;
};

export type FavoredItem = {
  cid: string;
  cname: string;
  owner: string;
  avatar: string;
  group: string;
  method: string;
  isChanged: boolean;
  isDeleted: boolean;
  isNewAdded: boolean;
};

export type ConnectionConfigProps = {
  IsLocal: boolean;
  HostName: string;
};
