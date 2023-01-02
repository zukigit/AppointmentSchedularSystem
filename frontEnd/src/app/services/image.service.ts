import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imgaeUrl:string;
  constructor() { }

  public byteArrayToImage(byteArray: Uint8Array): string {
    
    const file = new File([byteArray], 'image.png', { type: 'image/png' });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgaeUrl = reader.result as string;
    };
    console.log("url" + this.imgaeUrl)
    return this.imgaeUrl;
  }
}
