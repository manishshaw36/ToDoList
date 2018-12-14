import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './Item';


declare var $: any;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  new: string;
  arrItem;
  transform(items: Item[], filterItem: any) {
    // filterItem = this.filterHeader.filterItem;
    console.log('item' + filterItem);
    this.new = filterItem.slice(8, filterItem.length);
    console.log('item' + filterItem);

    // if (filterItem === 'All') {
    if (!items || (this.new === 'All')) {
      return items;
    } else {
      console.log(items);

      if (items.find(ind => ind.taskcatogory === this.new)) {
        return items.filter(item => item.taskcatogory.includes(this.new));
      } else {
        return items.filter(item => item.taskpriority.indexOf(this.new) !== -1);
      }
    }
  }
}
