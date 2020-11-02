import { Injectable } from '@angular/core';
import { Observable, BehaviorSbuject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheManager {
  private DEFAULT_MAX_AGE = 300; // seconds
  private cacheBag: {
    [key: string]: {
      itemAge: Date,
      subject: Observable<any>
    }
  } = {};

  get<T>(key: string, initialRequest?: Observable<any>, maxAge = this.DEFAULT_MAX_AGE): Observable<T> {
    const cachedItem = this.cachedItemFor(key, maxAge);
    if (!initialRequest) {
      return cachedItem.subject;
    }

    cachedItem.subject = cachedItem.subject
      || initialRequest.pipe(shareReplay());
    return cachedItem.subject;
  }
  
  set<T>(key: string, value: T, maxAge = this.DEFAULT_MAX_AGE) {
    const cachedItem = this.cachedItemFor(key, maxAge);
    cachedItem.subject = new BehaviorSubject<T>(value);
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
