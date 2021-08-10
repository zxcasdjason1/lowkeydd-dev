import { ReactElement } from "react";

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

export type ChannelCardStore = {
  hasFetchChannels: boolean;
  clusters: ChannelCardProps[][];
  group: string[];
  favoredList: FavoredItem[];
  tags: string[];
  current: ChannelCardProps | null;
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

export type NavButtonProps = {
  title: string;
  path: string;
  icon: any;
  closeMenu:Function; 
  children?:ReactElement;
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
    isFullScreen:boolean;
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
