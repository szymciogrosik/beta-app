import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../_models/user';
import { RedirectionEnum } from '../../../utils/redirection.enum';
import { SnackbarService } from '../snackbar.service';
import { Router } from '@angular/router';
import { AuthPath } from './auth-ep.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient,
              private snackbarService: SnackbarService,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private static removeDataFromStorage(key: string): void {
    localStorage.removeItem(key);
  }

  private static removeUserFromStorage(): void {
    AuthService.removeDataFromStorage(environment.LOGGED_USER_KEY);
  }

  private static removeTokenFromStorage(): void {
    AuthService.removeDataFromStorage(environment.SECRET_USER_KEY_VALUE);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value!;
  }

  public login(loginData: string): Observable<User> {
    return this.http.post<any>(environment.BACKEND_URL + AuthPath.SIGNIN, loginData)
      .pipe(map(res => {
        let user = new User();
        // login successful if there's a jwt token in the response
        if (res && res.token && res.user) {
          // parse received data
          user = res.user;
          user.token = res.token;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.addOrUpdateUserToStorage(user);
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  public logout(): void {
    const wasUserLogged = this.isLoggedIn();

    AuthService.removeUserFromStorage();
    this.currentUserSubject.next(null);

    if (wasUserLogged) {
      this.snackbarService.openDefaultSnackBar('Logout successfully');
      this.router.navigate([RedirectionEnum.SEP + RedirectionEnum.HOME]).then();
    }
  }

  private addDataToStorage(key: string, value: any, cryptKey: string): void {
//     localStorage.setItem(key, this.encrDecrService.set(cryptKey, JSON.stringify(value)));
    localStorage.setItem(key, JSON.stringify(value));
  }

  private addOrUpdateUserToStorage(user: User): void {
    AuthService.removeUserFromStorage();
    this.addDataToStorage(environment.LOGGED_USER_KEY, user, environment.SECRET_USER_KEY_VALUE);
  }

  private getDataFromStorage(key: string, cryptKey: string): any {
    let valueFromStorage = null;
    try {
//       valueFromStorage = JSON.parse(this.encrDecrService.get(cryptKey, localStorage.getItem(key)));
      valueFromStorage = JSON.parse(localStorage.getItem(key)!);
    } catch (ex) {
      AuthService.removeUserFromStorage();
      AuthService.removeTokenFromStorage();
    }
    return valueFromStorage;
  }

  private getUserFromStorage(): User {
    return this.getDataFromStorage(environment.LOGGED_USER_KEY, environment.SECRET_USER_KEY_VALUE);
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

}
