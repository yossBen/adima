import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import * as querystring from "querystring";
import {catchError} from "rxjs/internal/operators/catchError";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Request
    req = req.clone({
      url: `${environment.SERVER}${req.url}`,
      body: typeof req.body === 'object' ? querystring.stringify(req.body) : req.body,
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Ajouter l'Authentification JWT
    const token: string = this.authenticationService.token;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Response
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        console.log("Probleme d'authentification");
        this.authenticationService.logout();
        location.reload(true);
        /!*this.router.navigate(['/login']);*!/
      }
      // const error = err.error.message || err.statusText;
      return throwError(err);
    }))
    // return next.handle(req) ;
  }
}
