
import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
export class LocalicacionService {
  
  constructor() { }


getCurrentLocation = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  const {coords} = coordinates;
  const { latitude, longitude } = coords;
  return {latitude, longitude};
}

}
