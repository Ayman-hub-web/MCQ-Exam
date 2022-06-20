import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'result'
})
export class ResultPipe implements PipeTransform {

  transform(value: any): any {
    if(value < 50){
      return value+'%'+' You have to repeat the test';
    }else{
      return value+'%';
    }
  }

}
