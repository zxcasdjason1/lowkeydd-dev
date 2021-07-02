export type VisitItem = {
  cid: string;
  cname: string;
  owner: string;
  group: string;
  method: string;
};

export type VisitList = {
  group:string[],
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

export type ChannelGroupsType = {
  [key: string]: ChannelProps[];
};

export type UserSession = {
  ssid: string;
  username: string;
  expiration: number;
}

export type UserState = {
  username: string;
  ssid: string;
};

