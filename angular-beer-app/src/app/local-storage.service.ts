import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageChangedObject: BehaviorSubject<any>;

  constructor() { 
    this.localStorageChangedObject = new BehaviorSubject<any>({});
  }

  public changeLocalStorageObject(object) {
    this.localStorageChangedObject.next(object);
  }

  getChangedObject(): Observable<any> {
    return this.localStorageChangedObject.asObservable();
  }
}
