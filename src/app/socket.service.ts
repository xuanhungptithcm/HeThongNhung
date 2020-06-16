import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  constructor(private socket: Socket) {}
  $speed = new BehaviorSubject<number>(0);
  $light = new BehaviorSubject<number>(0);
  sendMessage(data: any) {
    this.socket.emit("driver", data);
  }
  changeMode(eventName, data) {
    this.socket.emit(eventName, data);
  }
  getMessage(event: string) {
    return this.socket.fromEvent(event);
  }
}
