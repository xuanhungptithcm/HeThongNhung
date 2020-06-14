import { SocketService } from "./socket.service";
import { Component, HostListener } from "@angular/core";
import { RxStompConfig } from "@stomp/rx-stomp";
import * as SockJS from "sockjs-client";
import { NbIconLibraries } from "@nebular/theme";
import { FormControl } from "@angular/forms";
export enum KEY_CODE {
  KEY_UP = 38,
  KEY_DOWN = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "HeThongNhung";
  speed: number = 800;
  isClick: boolean = false;
  intervalRerequst: any;
  mode__Speed: number = 0;
  speedForm = new FormControl(0);
  isKey: boolean = true;
  progress: number = 0;
  modeAuto: boolean = false;
  constructor(
    private iconLibraries: NbIconLibraries,
    private socket: SocketService
  ) {
    iconLibraries.registerSvgPack("social-networks", {
      gas__speed: `<svg height="499pt" viewBox="0 -24 499.312 499" width="499pt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="249.656" x2="249.656" y1="451.468" y2=".1552"><stop offset="0" stop-color="#9f2fff"/><stop offset="1" stop-color="#0bb1d3"/></linearGradient><path d="m189.65625 225.125-11.3125-11.3125 16-16 11.3125 11.3125zm80-80-11.3125-11.3125-48 48 11.3125 11.3125zm-67.3125 92.6875 11.3125 11.3125 16-16-11.3125-11.3125zm43.3125-20.6875 48-48-11.3125-11.3125-48 48zm8 40-11.3125-11.3125-16 16 11.3125 11.3125zm16-16 48-48-11.3125-11.3125-48 48zm8 40-11.3125-11.3125-16 16 11.3125 11.3125zm16-16 48-48-11.3125-11.3125-48 48zm-19.3125 44.6875 11.3125 11.3125 16-16-11.3125-11.3125zm32-32 11.3125 11.3125 48-48-11.3125-11.3125zm-144-48-80 80 11.3125 11.3125 80-80zm24 24-80 80 11.3125 11.3125 80-80zm24 24-80 80 11.3125 11.3125 80-80zm24 24-80 80 11.3125 11.3125 80-80zm-56 104 11.3125 11.3125 80-80-11.3125-11.3125zm253.65625-405.65625 67.3125 67.3125-76 76 12 12-45.257812 45.253906c6.433593 10.335938 9.945312 22.265625 9.945312 34.746094 0 17.617188-6.855469 34.167969-19.3125 46.625l-150.0625 150.0625c-12.457031 12.457031-29.007812 19.3125-46.625 19.3125s-34.175781-6.855469-46.625-19.3125l-129.375-129.375c-5.160156-5.152344-8-12.015625-8-19.3125s2.839844-14.160156 8-19.3125l28.6875-28.6875c10.3125-10.3125 28.3125-10.3125 38.625 0l12.6875 12.6875 129.375-129.375c12.449219-12.457031 29.007812-19.3125 46.625-19.3125 12.480469 0 24.40625 3.503906 34.742188 9.941406l45.257812-45.253906 12 12zm-48 235.3125c0-13.335938-5.191406-25.878906-14.625-35.3125l-70.0625-70.0625c-9.433594-9.433594-21.976562-14.625-35.3125-14.625s-25.878906 5.191406-35.3125 14.625l-140.6875 140.6875-24-24c-2.144531-2.136719-4.976562-3.3125-8-3.3125s-5.855469 1.175781-8 3.3125l-28.6875 28.6875c-2.136719 2.144531-3.3125 4.976562-3.3125 8s1.175781 5.855469 3.3125 8l129.375 129.375c9.433594 9.433594 21.976562 14.625 35.3125 14.625s25.878906-5.191406 35.3125-14.625l150.0625-150.0625c9.433594-9.433594 14.625-21.976562 14.625-35.3125zm28.6875-80-68.6875-68.6875-32.6875 32.6875 68.6875 68.6875zm64-88-44.6875-44.6875-64.6875 64.6875 44.6875 44.6875zm0 0" fill="url(#a)"/></svg>`,
      stop__speed: `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 368 368" style="enable-background:new 0 0 368 368;" xml:space="preserve">
     <path style="fill:#CCE4FF;" d="M296,176v152c0,17.68-14.32,32-32,32H104c-17.68,0-32-14.32-32-32V176c0-4.4,3.6-8,8-8h72h64h72
       C292.4,168,296,171.6,296,176z"/>
     <g>
       <path style="fill:#007AFF;" d="M112,216c0,4.424,3.584,8,8,8h128c4.424,0,8-3.576,8-8s-3.576-8-8-8H120
         C115.584,208,112,211.576,112,216z"/>
       <path style="fill:#007AFF;" d="M248,256H120c-4.416,0-8,3.576-8,8s3.584,8,8,8h128c4.424,0,8-3.576,8-8S252.424,256,248,256z"/>
       <path style="fill:#007AFF;" d="M248,304H120c-4.416,0-8,3.576-8,8s3.584,8,8,8h128c4.424,0,8-3.576,8-8S252.424,304,248,304z"/>
       <path style="fill:#007AFF;" d="M80,160c-8.824,0-16,7.176-16,16v152c0,22.056,17.944,40,40,40h160c22.056,0,40-17.944,40-40V176
         c0-8.824-7.176-16-16-16h-64V16h24c4.424,0,8-3.576,8-8s-3.576-8-8-8H120c-4.416,0-8,3.576-8,8s3.584,8,8,8h24v144H80z M288,328
         c0,13.232-10.768,24-24,24H104c-13.232,0-24-10.768-24-24V176h208V328z M160,16h48v144h-48V16z"/>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     <g>
     </g>
     </svg>
     `,
      // ...
    });
  }
  @HostListener("window:keydown", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event.keyCode);

    if (this.isKey) {
      if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
        // this.increment();
        this.sendRequest(4);
      }

      if (event.keyCode === KEY_CODE.LEFT_ARROW) {
        // this.decrement();
        this.sendRequest(3);
      }
      if (event.keyCode === KEY_CODE.KEY_DOWN) {
        // this.decrement();
        this.sendRequest(2);
      }
      if (event.keyCode === KEY_CODE.KEY_UP) {
        // this.decrement();
        this.sendRequest(1);
      }
    }
    this.isKey = false;
  }
  @HostListener("window:keyup", ["$event"])
  clearKey(event: KeyboardEvent) {
    this.clearRequest();
    this.isKey = true;
  }
  changeMode(event) {
    this.modeAuto = event;
    this.socket.changeMode("changeMode", {
      mode: event ? 1 : 0,
    });
  }
  sendRequest(mode: number) {
    console.log(this.isClick);
    this.mode__Speed = mode;
    this.intervalRerequst = setInterval(() => {
      if (this.speed + 70 >= 1024) {
        this.speed = 1024;
      } else {
        this.speed += 70;
      }
      this.progress = Math.floor((this.speedForm.value / 1024) * 100);
      this.speedForm.setValue(this.speed);
      this.socket.sendMessage({
        control: mode,
        speed: this.speed,
      });
      console.log({
        control: mode,
        speed: this.speed,
      });
    }, 100);
  }
  sendResquestWithSpeed(speed: any) {
    this.socket.sendMessage({
      control: 1,
      speed: this.speedForm.value,
    });
  }
  stop() {
    this.socket.sendMessage({
      control: 1,
      speed: 0,
    });
  }
  accept() {
    this.isClick = true;
  }
  clearRequest() {
    console.log("clear " + this.speed);

    if (this.modeAuto) {
      this.isClick = false;
      this.speed = 800;
      this.progress = 0;
      this.mode__Speed = 0;
      this.speedForm.setValue(0);
      clearInterval(this.intervalRerequst);
      // this.stop();
      this.socket.sendMessage({
        control: 1,
        speed: 1024,
      });
    } else {
      this.isClick = false;
      this.speed = 800;
      this.progress = 0;
      this.mode__Speed = 0;
      this.speedForm.setValue(0);
      clearInterval(this.intervalRerequst);
      this.stop();
    }
  }
}
