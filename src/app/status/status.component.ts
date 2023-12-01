import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Status} from "../_models/status";
import {Observable} from "rxjs";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  private static STATUS_URL: string = './assets/status/status.json';

  lastDeployTime: any = '';

  constructor(private httpClient: HttpClient) {
    this.getJSON().subscribe({
      next: (data: Status) => this.lastDeployTime = data.lastDeployTime,
      error: (error) => console.error(error)
    });
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get(StatusComponent.STATUS_URL);
  }

}
