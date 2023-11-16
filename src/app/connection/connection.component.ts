import {Component} from '@angular/core';
import {ConnectionService} from '../_services/connection/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {

  public backendAlive: boolean | null;

  constructor(
    private connectionService: ConnectionService
  ) {
    this.connectionService.backendAlive.subscribe(x => this.backendAlive = x);
    this.connectionService.checkBackendAlive();
  }

}
