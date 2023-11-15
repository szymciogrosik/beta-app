import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { SnackbarService } from '../_services/snackbar.service';
import { ErrorUtils } from '../../utils/error.utils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.hasRoleAdmin()) {
      return true;
    }

    this.snackbarService.openDefaultSnackBar(ErrorUtils.getMessage(ErrorUtils.NOT_ENOUGH_RIGHTS));
    return false;
  }

}
