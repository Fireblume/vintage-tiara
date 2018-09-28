import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private route: ActivatedRoute) { }

	categories: any;
	images:any;

	ngOnInit() {
		this.categories = this.route.snapshot.data.home.categories;
		this.images = this.route.snapshot.data.home.images;
	}

}
