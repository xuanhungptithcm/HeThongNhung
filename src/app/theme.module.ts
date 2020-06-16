import { CORPORATE_THEME } from "./themes/styles/theme.corporate";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { DARK_THEME } from "./themes/styles/theme.dark";
import { COSMIC_THEME } from "./themes/styles/theme.cosmic";
import { DEFAULT_THEME } from "./themes/styles/theme.default";

const NB_MODULES = [
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
  NbEvaIconsModule,
  NbProgressBarModule,
  NbButtonModule,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule],
  declarations: [],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: "cosmic",
          },
          [CORPORATE_THEME, DARK_THEME, COSMIC_THEME, DEFAULT_THEME]
        ).providers,
      ],
    };
  }
}
