import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(private router: Router) { }

  serverErrorRedirect<T>() {
    return catchError<T, Observable<never>>(() => {
        this.router.navigate(['/connectless'])
        return throwError('Something bad happened; please try again later.');
      })
  }
}
