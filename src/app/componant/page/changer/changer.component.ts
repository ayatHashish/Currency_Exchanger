import { Component } from '@angular/core';
import { CurrencyService } from '../../service/currency.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-changer',
  templateUrl: './changer.component.html',
  styleUrls: ['./changer.component.scss']
})
export class ChangerComponent {
  exchangeData: any;
  calculatedConversion: any;
  amount: any = 1;
  storeAmount: any;
  exchangeRates: any;
  conversion_result: any = '';
  conversion_rate: any = '1.9';
  base_code: any = 'EUR';
  target_code: any = 'USD';
  conversionResult: any;
  symbols: any;
  fromSelectedCurrency: string = 'EUR';
  toSelectedCurrency: string = 'USD';
  constructor(private formBuilder: FormBuilder, private currencyService: CurrencyService, private Home: HomeComponent) {
    this.getSympol()
  }
  conversionForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    fromCurrency: new FormControl('', [Validators.required]),
    toCurrency: new FormControl('', [Validators.required,
    ]),
  });

  //sympols
  getSympol() {
    this.currencyService.getSymbols().subscribe(
      (res) => {
        const symbolsJson = Object.keys(res.symbols);
        this.symbols = symbolsJson;
        console.log(this.symbols)
      },
      (e) => { },
      () => console.error('Error fetching exchange rates:')
    );
  }
  convertCurrency() {
    if (this.conversionForm.valid) {
      console.log(this.conversionForm.value)
      let storeAmount = this.conversionForm.get('amount')?.value;
      let fromCurrency = this.conversionForm.get('fromCurrency')?.value;
      let toCurrency = this.conversionForm.get('toCurrency')?.value;
      this.amount = storeAmount
      this.currencyService.convertCurrency(fromCurrency, toCurrency, storeAmount).subscribe(
        (res) => {
          this.conversion_result = res.conversion_result
          this.conversion_rate = res.conversion_rate
          this.base_code = res.base_code
          this.target_code = res.target_code
          // console.log(this.exchangeRates)
        },
        (e) => { },
        () => this.Home.mostPopularConverter(fromCurrency, storeAmount)
      );
    }
  }
}
