import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'activated-route-test-issue';
  content: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.content = JSON.stringify(this.activatedRoute.snapshot.queryParams);
  }
}
