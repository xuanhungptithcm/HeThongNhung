import { RxStompConfig } from "@stomp/rx-stomp";
import * as SockJS from "sockjs-client";

const configSock: RxStompConfig = {
  debug: (msg: string): void => {},
  connectHeaders: {
    login: "guest",
    passcode: "guest",
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 2000,
  reconnectDelay: 2000,
  beforeConnect() {
    console.log("before connect");
  },
};
configSock.webSocketFactory = function () {
  console.log(1312312312);

  return new SockJS("http://192.168.1.7:3000");
};
export const myRxStompConfig: RxStompConfig = configSock;
