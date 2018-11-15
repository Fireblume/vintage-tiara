import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'convert'})
export class ConvertObject  implements PipeTransform {
    transform(map:any): any {
    	let obj: any = []
	    for (let k of Object.keys(map.value)) {
	        map.value[k].key = k;
	        map.value[k].parent = map.key;
	        obj.push(map.value[k]);
	    }
	    console.log(obj)
	    return obj;
    }
}