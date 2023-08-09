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

  popularCurrencies: string[] = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'EGP'];
  popularCurrenciesConverted: any[] = [];
  constructor(private http: HttpClient) { }

  convertCurrency(from: any, to: any, amount: any): Observable<any> {
    const url = `${this.apiConvertUrl}${from + '/'}${to + '/'}${amount}`;
    return this.http.get(url);
  }
  getSymbols(): Observable<any> {
    const url = `${this.apiUrl + roots?.endpoint?.symbols}?access_key=${this.apiKey}`;
    return this.http.get(url);
  }

  mostPopularConverter(base_code: any, amount: any) {
    this.popularCurrencies.forEach((toCurrency) => {
      this.convertCurrency(base_code, toCurrency, amount).subscribe(
        (res) => {
          this.popularCurrenciesConverted.push({
            conversion_result: res.conversion_result,
            conversion_rate: res.conversion_rate,
            base_code: res.base_code,
            target_code: res.target_code,
          });
        },
        (e) => { },
      );
    });
    return this.popularCurrenciesConverted;
  }
}
