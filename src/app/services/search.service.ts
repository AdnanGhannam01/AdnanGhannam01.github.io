import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  #value = "";
  get value() {
    return this.#value;
  }
  set value(val: string) {
    this.#value = val;
    this.valueChange.emit(this.#value);
  }

  valueChange = new EventEmitter<string>();

  constructor() { }
}
