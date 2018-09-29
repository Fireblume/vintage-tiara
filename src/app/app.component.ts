import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vintage-tiara-app';


	status:any = { 'one':true, 
					'two':false};

  clickEvent(number){
		this.status = {};
		this.status[number] = true
	}
}
