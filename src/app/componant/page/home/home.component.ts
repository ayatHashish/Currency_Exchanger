import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../service/currency.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private currencyService: CurrencyService) { }
  popularCurrenciesConverted :any

  ngOnInit() {
    const base_code = '';
     const amount = '';

     this. popularCurrenciesConverted= this.currencyService.mostPopularConverter(base_code, amount);
 }




}
