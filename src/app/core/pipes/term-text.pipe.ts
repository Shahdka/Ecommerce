import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
  standalone: true
})
export class TermTextPipe implements PipeTransform {

  transform(value: String): string {

    return  value.split(' ',2).join(" ");
  }

}
