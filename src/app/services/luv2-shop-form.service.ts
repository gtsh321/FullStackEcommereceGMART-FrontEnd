import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth:number): Observable<number[]>{
   let data:number[]=[];

   //build an array for month dropdown list
   //start at current month and loop intil 12

   for(let theMonth=startMonth; theMonth<=12; theMonth++)
   {
    data.push(theMonth);
   }

   return of(data);  // the of operator from rxjs will wrap the data array as an observable
  }

  getCreditCardYears():Observable<number[]>
  {
    let data:number[]=[];

    //build an data array for year downlist
    //- start at current year and loop for next 10 years

    const startYear:number = new Date().getFullYear();
    const endYear:number = startYear + 10;

    for(let theYear=startYear;theYear<=endYear;theYear++)
    {
      data.push(theYear);
    }
    return of(data);
  }
}
