import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  exchangeRatesUSD: any;
  exchangeRatesEUR: any;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    const currencies = ['USD', 'EUR'];

    currencies.forEach(currency => {
      this.currencyService.getExchangeRate(currency).subscribe((data: any) => {
        if (currency === 'USD') {
          this.exchangeRatesUSD = data.rates;
          console.log('exchangeRatesUSD', this.exchangeRatesUSD);
        } else if (currency === 'EUR') {
          this.exchangeRatesEUR = data.rates;
          console.log('exchangeRatesEUR', this.exchangeRatesEUR);
        }
      });
    });
  }
}
