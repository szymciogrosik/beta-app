import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../_models/user/user';
import {RoleEnum} from '../../../utils/role.enum';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class UserService {

  public currentUser: User | null;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  hasRoleUser(): boolean {
    return (this.isLoggedIn() && this.currentUser!.roles.find(role => role.name === RoleEnum.USER) != null);
  }

  hasRoleAdmin(): boolean {
    return (this.isLoggedIn() && this.currentUser!.roles.find(role => role.name === RoleEnum.ADMIN) != null);
  }

  // Todo: for now only sample
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.backend_url + '/users');
  }

}
