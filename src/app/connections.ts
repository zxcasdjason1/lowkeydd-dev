type ConnectionConfigProps = {
  IsLocal: boolean;
  HostName: string;
};

export var ConnectionConfig: ConnectionConfigProps = {
  IsLocal: false,
  HostName: "",
};

export const decodeUrlToConnectionConfig = () => {
  console.log("decodeUrlToConnectionConfig");

  const IsLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const HostName = window.location.hostname;

  ConnectionConfig = {
    IsLocal,
    HostName,
  };
};
