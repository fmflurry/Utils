import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheManager {
  private DEFAULT_MAX_AGE = 300; // seconds
  private cacheBag: {
    [key: string]: {
      itemAge: Date,
      subject: Observable<any>,
      result: any;
    }
  } = {};

  get(key: string, initialRequest: Observable<any>, maxAge = this.DEFAULT_MAX_AGE) {
    const cachedItem = this.cachedItemFor(key, maxAge);

    if (cachedItem.result) {
      return of(cachedItem.result);
    }

    // ensure to share initialRequest so we avoid multiple http calls
    cachedItem.subject = cachedItem.subject ||
      initialRequest.pipe(
        share(),
        tap(
          nextResult => { cachedItem.result = nextResult; },
          error => { throwError(error); },
        ));
    return cachedItem.subject;
  }

  invalid(key: string) {
    delete this.cacheBag[key];
  }

  invalidKeysStartingWith(key: string) {
    Array.from(Object.keys(this.cacheBag))
      .filter(k => k.startsWith(key))
      .forEach(k => { this.invalid(k); });
  }

  private cachedItemFor(key: string, duration: number) {
    const cachedItem = this.cacheBag[key];
    if (!cachedItem || this.isExpired(cachedItem.itemAge)) {
      this.cacheBag[key] = {
        itemAge: this.ageFor(duration),
        subject: null,
        result: null
      };
      return this.cacheBag[key];
    }
    return cachedItem;
  }

  private ageFor(itemAge: number) {
    const now = new Date(Date.now());
    return new Date(now.setSeconds(now.getSeconds() + itemAge));
  }

  private isExpired(itemAge: Date) {
    return new Date(Date.now()).getTime() >= itemAge.getTime();
  }
}
