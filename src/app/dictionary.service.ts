import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import Dictionary from '../assets/dict.json'

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private readonly http: HttpClient) { }

  // getDictionary() {
  //   return Dictionary;
  // }

  readonly dictUrl = 'assets/dict.json';

  getDict() {
    return this.http.get<string[]>(this.dictUrl);
  }

}
