import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ModalService} from '../modal.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private route: ActivatedRoute,
  	private modalService: ModalService, private ng2ImgMax: Ng2ImgMaxService) { }

    modalImage: any;
  	categories: any;
  	images:any;
    myThumbnail:any;

	ngOnInit() {
		this.categories = this.route.snapshot.data.home.categories;
		this.images = this.route.snapshot.data.home.images;
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
