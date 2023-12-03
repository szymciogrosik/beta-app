import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../_services/user/user.service';
import {RedirectionEnum} from '../../utils/redirection.enum';
import {AuthService} from '../_services/auth/auth.service';
import {CustomTranslateService} from '../_services/translate/custom-translate.service';
import {LanguageEnum} from "../_services/translate/language-enum";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  protected readonly LanguageEnum = LanguageEnum;
  protected readonly rp = RedirectionEnum;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    public translateService: CustomTranslateService,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
