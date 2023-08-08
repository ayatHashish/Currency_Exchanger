import { Component } from '@angular/core';
import { CurrencyService } from '../../service/currency.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private currencyService: CurrencyService) { }
  popularCurrencies: string[] = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'EGP'];
  popularCurrenciesConverted: any[] = [];
  mostPopularConverter(base_code: any, amount: any) {
    this.popularCurrencies.forEach((toCurrency) => {
      this.currencyService.convertCurrency(base_code, toCurrency, amount).subscribe(
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
  }
}
