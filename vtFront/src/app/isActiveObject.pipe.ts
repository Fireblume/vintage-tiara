import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'checkActive'})
export class ActiveObject  implements PipeTransform {
    
    transform(objects: any[]): any[] {
        if(objects) {
            return objects.filter(object => {
                return object.active === 'Y';
            });
        }
    }
}