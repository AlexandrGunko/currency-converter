import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter';
  exchangeRates: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.currencyService.getExchangeRate('USD').subscribe((data: any) => {
      this.exchangeRates = data.rates;
    });
  }
}
