import { Injectable } from "@angular/core";
import { of as observableOf, Observable } from "rxjs";
import {
  TemperatureHumidityData,
  Temperature,
} from "../models/temperature-humidity";

@Injectable({
  providedIn: "root",
})
export class TemperatureHumidityService extends TemperatureHumidityData {
  private temperatureDate: Temperature = {
    value: 0,
    min: 0,
    max: 1024,
  };

  private humidityDate: Temperature = {
    value: 0,
    min: 0,
    max: 1024,
  };

  getTemperatureData(): Observable<Temperature> {
    return observableOf(this.temperatureDate);
  }

  getHumidityData(): Observable<Temperature> {
    return observableOf(this.humidityDate);
  }
}
