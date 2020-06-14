import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}

  sendMessage(data: any) {
    this.socket.emit("driver", data);
  }
  changeMode(eventName, data) {
    this.socket.emit(eventName, data);
  }
  getMessage() {
    // return this.socket.fromEvent("message").map((data) => data.msg);
  }
}
