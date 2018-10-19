import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HomeService } from './home.service';
import { ModalService} from '../modal.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  constructor(private homeService: HomeService, private route: ActivatedRoute,
  	private modalService: ModalService, private ng2ImgMax: Ng2ImgMaxService) { }

    modalImage: any = [];
  	categories: any = [];
  	images:any;
    myThumbnail:any;
    hovered:any = {};

	ngOnInit() {
		this.route.snapshot.data.home.categories.subscribe(
      (res) => {
         this.categories = this.object_to_ctg(res[0].value);

         this.route.snapshot.data.home.subctg.subscribe(
            (res2) => {
               let subctgs = this.object_to_subctg(res2[0].value);
               
               this.categories.forEach(val => { 
                  let subcSet:any = [];

                  subctgs.forEach(val2 => { 
                    if(val.key == val2.parentId)
                      subcSet.push(val2);
                  })

                  val.subctgs = subcSet;
               })
              })

          console.log(this.categories)

        })
    

		//this.images = this.route.snapshot.data.home.images;
	}

  object_to_ctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        map[k].key = k;
        categories.push(map[k]);
    }

    return categories;
  }

  object_to_subctg(map) {
    let categories: any = []
    for (let k of Object.keys(map)) {
        for (let j of Object.keys(map[k])) {
            map[k][j].key = j;
            map[k][j].parentId = k;
            categories.push(map[k][j]);
        }
    }

    return categories;
  }

	openModal(id: string, modalImage: string) {
     /* var file = new File([this.dataURItoBlob("../../src/image/"+modalImage)], 'resized', {type: 'image/jpeg'});
      
      setTimeout(()=>{    
         this.ng2ImgMax.resizeImage(file, 400, 400).subscribe(
            result => {
            console.log(result)
              this.myThumbnail = result
              this.modalImage = "../../src/image/"+modalImage;
              this.modalService.open(id);
            },
            error => {
              console.log('😢 Oh no!', error);
            }
          );  
      }, 1000);*/

      this.myThumbnail = "../../src/image/logo-tryTmb.jpg";
      this.modalImage = "../../src/image/"+modalImage;
      this.modalService.open(id);
      	    
    }
 
    closeModal(id: string) {
        this.modalService.close(id);
    }

  dataURItoBlob(dataURI) {
     const byteString = dataURI;
     const arrayBuffer = new ArrayBuffer(byteString.length);
     const int8Array = new Uint8Array(arrayBuffer);
     for (let i = 0; i < byteString.length; i++) {
       int8Array[i] = byteString.charCodeAt(i);
     }
     const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });    
     return blob;
  }
}
