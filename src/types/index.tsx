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

export type GroupedVisitItemsType = {
  group: string[];
  list: Array<VisitItem>;
  groupMap: { [key: string]: string };
  view: Array<VisitItem[]>;
  current:ChannelProps|null;
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

export type GroupedChannelsType = {
  visitGroup: string[];
  view: Array<ChannelProps[]>;
  tags: string[];
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
