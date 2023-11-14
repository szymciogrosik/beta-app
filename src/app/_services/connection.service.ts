import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private backendAliveSubject: BehaviorSubject<boolean | null>;
  public backendAlive: Observable<boolean | null>;
  
  constructor(private http: HttpClient) {
    this.backendAliveSubject = new BehaviorSubject<boolean | null>(false);
    this.backendAlive = this.backendAliveSubject.asObservable();
  }

  public checkBackendAlive(): void {
    this.http.get<any>(environment.BACKEND_URL + '/alive').subscribe({
      next: (data) => this.backendAliveSubject.next(true),
      error: (error) => this.backendAliveSubject.next(false)
    });
  }
}
