import { Pipe, PipeTransform } from '@angular/core';
import { Business } from './business';

@Pipe({
  name: 'tablesearch'
})
export class TablesearchPipe implements PipeTransform {

  searchText: string = ''; number = '';
  
  transform(list: Business[], searchText: string): any {

    if (!list)
      return [];
    if (!searchText)
      return list;

    searchText = searchText.toLocaleLowerCase();

    list = list.filter(s => {
      return s &&
  (s.businessId && s.businessId.toLocaleLowerCase().includes(searchText)) ||
  (s.businessName && s.businessName.toLocaleLowerCase().includes(searchText)) ||
  (s.contactpersonName && s.contactpersonName.toLocaleLowerCase().includes(searchText)) ||

  (s.businessType && s.businessType.toLocaleLowerCase().includes(searchText)) ||

  (s.about && s.about.toString().toLocaleLowerCase().includes(searchText)) ||

  (s.address && s.address.toString().toLocaleLowerCase().includes(searchText)) ||

  (s.emailId && s.emailId.toLocaleLowerCase().includes(searchText)) ||
  (s.registrationDate && s.registrationDate.toLocaleLowerCase().includes(searchText)) ||
  (s.phoneNo && s.phoneNo.toString().includes(searchText));
 
  

    });
    return list;

  }
}
