import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environments';
import { roots } from './../shared/config/endPoints';
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl = environment?.apiUrl;
  apiKey = environment?.apiKey;
  base = environment?.base;
  apiConvertUrl = environment?.apiConvertUrl;

  constructor(private http: HttpClient) { }

  convertCurrency(from: any, to: any, amount: any): Observable<any> {
    const url = `${this.apiConvertUrl}${from + '/'}${to + '/'}${amount}`;
    return this.http.get(url);
  }
  getSymbols(): Observable<any> {
    const url = `${this.apiUrl + roots?.endpoint?.symbols}?access_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
