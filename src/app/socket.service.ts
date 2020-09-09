import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor() {}
  $speed = new BehaviorSubject<number>(0);
  $light = new BehaviorSubject<number>(0);
  socket: SocketIOClient.Socket;

  sendMessage(data: any) {
    this.socket.emit("driver", data);
  }
  changeMode(eventName, data) {
    this.socket.emit(eventName, data);
  }
  getMessage(event: string) {
    return Observable.create((observer) => {
      this.socket.on(event, (msg) => {
        observer.next(msg);
      });
    });
  }
  // getCam(): Observable<any> {
  // const divSocket = io(environment.SOCKET_ENDPOINT + "/cam0");
  // return Observable.create((observer) => {
  //   divSocket.on("data", function (data) {
  //     observer.next(data);
  //   });
  // });
  // }
  setupSocketConnection() {
    console.log("Khoi tạo socket");
    this.socket = io("http://192.168.1.102:7050", {
      forceNew: true,
      autoConnect: true,
      reconnection: true,
      secure: false,
      reconnectionDelay: 4000,
    });
    this.socket.on("disconnect", () => {
      console.error("Socket disconnected");
      // this.$isConnect.next(false);
      // this.setupSocketConnection();
    });
    // this.send('authentication', { token: this.localStorageService.getToken() });
    this.socket.on("connect", () => {
      // this.send('authentication', { token: this.localStorageService.getToken() });
      // this.$isConnect.next(true);
      console.warn("Socket connected");
    });
    this.socket.on("connect_error", () => {
      console.warn("Socket connect_error");
    });
    this.socket.on("connect_timeout", () => {
      console.warn("Socket connect_timeout");
    });
    this.socket.on("connecting", () => {
      console.warn("Socket connecting");
    });
    this.socket.on("reconnect", () => {
      console.warn("Socket reconnect");
    });
    this.socket.on("reconnect_attempt", () => {
      console.warn("Socket reconnect_attempt");
    });
    this.socket.on("reconnect_failed", () => {
      console.warn("Socket reconnect_failed");
    });
    this.socket.on("reconnect_error", () => {
      console.warn("Socket reconnect_error");
    });
    this.socket.on("reconnecting", () => {
      console.warn("Socket reconnecting");
    });
    this.socket.on("ping", () => {
      console.warn("Socket ping");
    });
  }
}
