import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async takePhoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      if (image?.dataUrl) {
        return image.dataUrl;
      } else {
        alert('An error occured when taking the picture');
        return '';
      }
    } catch (err) {
      alert('Could not access camera');
      return '';
    }
  }
}
