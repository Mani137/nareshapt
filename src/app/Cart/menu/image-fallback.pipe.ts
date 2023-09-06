import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFallback'
})
export class ImageFallbackPipe implements PipeTransform {
  private static lastValidImage: string;

  transform(image: string, fallback: string): string {
    if (image && image !== "") {
      return "data:image/jpeg;base64," + image;
    } else if (fallback && fallback !== "") {
      return "data:image/jpeg;base64," + fallback;
    } else {
      return "/src/assets/images/backpattern.jpg";

    }
  }

}
