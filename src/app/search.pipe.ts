import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './Item';
// import { from } from 'rxjs';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Item[], searchTerm: string) {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(item =>
      item.taskname.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
