import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../interface/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ProductsArray:Iproduct[],textSearch:string): any {
    return  ProductsArray.filter((item)=>item.title.toLowerCase().includes(textSearch.toLowerCase())) ;
  }

}
