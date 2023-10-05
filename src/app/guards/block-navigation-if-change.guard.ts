import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BlockNavigationIfChangeGuard implements CanDeactivate<any> {
  canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (component.cannotLeave()) {
      return confirm('Your changes will be lost');
    }

    return true;
  }
}