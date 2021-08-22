// expiration 會乘上1000倍，所以單位是秒
export function setSessionCookie(ssid: string, username: string, expiration: number) {
  var expires = new Date(Date.now() + expiration * 1000).toUTCString();
  document.cookie = `ssid=${ssid}; expires=${expires}; path=/`;
  document.cookie = `username=${username}; expires=${expires}; path=/`;
}

export function removeSessionCookie(ssid: string, username: string,) {
  // 透過把修改有限期限為現在，來讓它自動被清除掉。
  var expires = new Date(Date.now()).toUTCString();
  document.cookie = `ssid=${ssid}; expires=${expires}; path=/`;
  document.cookie = `username=${username}; expires=${expires}; path=/`;
}

export function getCookie(c_name: string): string {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
