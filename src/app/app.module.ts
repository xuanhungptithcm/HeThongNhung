import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbProgressBarModule,
  NbInputModule,
  NbToggleModule,
  NbCardModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { ThemeModule } from "./theme.module";
import { TemperatureDraggerComponent } from "./components/temperature-dragger/temperature-dragger.component";
import { RoundPipe } from "./pipes/round.pipe";

const config: SocketIoConfig = {
  url: "http://207.148.71.252:7050",
  options: {},
};

@NgModule({
  declarations: [AppComponent, TemperatureDraggerComponent, RoundPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbProgressBarModule,
    NbInputModule,
    NbCardModule,
    NbToggleModule,
    SocketIoModule.forRoot(config),
    ThemeModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
