import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  private prefix = "http://localhost:5000";

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: this.prefix + request.url });
    }
    return next.handle(request);
  }
}
