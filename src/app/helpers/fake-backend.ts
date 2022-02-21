

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';





@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //admin
        //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
        
        //another admin
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNoYWRhayIsImlhdCI6MTUxNjIzOTAyMiwiYWRtaW4iOnRydWV9.LtaoFo2D9W9_NUSoHOJfF0GbDgel4HBHwmezk0VCzW4';

        //not admin
        //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6ZmFsc2V9.fJLJaUOdzHz3DLfw3izO-XGSrC3golkxAGyFymuS2xs';

        request = request.clone({
            setHeaders: {
              'Content-Type' : 'application/json; charset=utf-8',
              'Accept'       : 'application/json',
              'Authorization': 'Bearer' + token,
            },
          });
      


        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users') || '{}');
        
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials

                let bodyy = JSON.parse(request.body);

                if (bodyy.email === 'mosh@domain.com' && bodyy.password === '1234') {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    console.log("hi mosh, this is the body");
                    return of(new HttpResponse({ status: 200, body: { token: token } }));
                } else {
                    // else return 400 bad request
                    // return throwError({ error: { message: 'Username or password is incorrect' } });
                    return of(new HttpResponse({ status: 200 }));
                }
            }

            // get users
            if (request.url.endsWith('/api/orders') && request.method === 'GET') {
                console.log("it works fine");
                console.log(request.headers);
                
                
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer' + token) {
                    return of(new HttpResponse({ status: 200, body: [100,200,300] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorized' } });
                }
            }


            

            // pass through any requests not handled above
            return next.handle(request);

        }))

            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};












