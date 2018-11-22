import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

	constructor(private infoService: InfoService, private route: ActivatedRoute) { 
		this.route.parent.data.subscribe((auth) => {
	  auth.base.auth.subscribe(res =>{
	    if(res != null){
	      this.userEmail = res.email;
	      this.email.from = this.userEmail;
	    }
	    else
	      this.userEmail = undefined;
	  });
	  
	});
	}

	userEmail:any;
	error:any;
	email:any = {};

	ngOnInit() {
	}

	sendEmail(){
		this.infoService.sendEmail(this.email).subscribe((res:any) =>{
	  if(res.resp == 'OK'){
	  } else
	    this.error = "Greška!";
	});
	}

}
