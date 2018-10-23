import {Injectable} from '@angular/core';


declare const location: Location;


@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor() {
  }

  get(): string {
    return location.host;
  }
}
