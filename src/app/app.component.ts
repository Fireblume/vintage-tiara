import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vintage-tiara';

 	 notAdmin:boolean;
 	 @ViewChild('viewSection') viewSection: ElementRef
 	 @ViewChild('upButton') upButton: ElementRef
 	 @ViewChild('section') section: ElementRef

	constructor(private route: Router) { }

	ngOnInit() {
		
		if(window.location.pathname === '/admin' || window.location.pathname === '/admin/dashboard'){
			this.notAdmin = false;
			//this.section.nativeElement.style.display = 'block';
		}
		else{
			this.notAdmin = true;
			//this.section.nativeElement.style.display = 'inline-block';
		}

		window.addEventListener("scroll", (e: Event) => {this.scrollFunction()});
	  }

	status:any = { 'one':true, 
					'two':false};

    clickEvent(number){
		this.status = {};
		this.status[number] = true
	}

	gotoSection() {
        //this will provide smooth animation for the scroll
        this.viewSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    scrollFunction(){
    	let y = window.scrollY;
    	if(y >= 200)
    		this.upButton.nativeElement.style.display = 'block';
    	else
    		this.upButton.nativeElement.style.display = 'none';
    }
}
