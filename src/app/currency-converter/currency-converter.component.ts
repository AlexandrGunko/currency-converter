import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  exchangeRates: any;
  converterForm: FormGroup;

  constructor(private fb: FormBuilder, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchExchangeRates();
  }

  initForm() {
    this.converterForm = this.fb.group({
      amount1: [1],
      currency1: ['USD'],
      amount2: [null],
      currency2: ['UAH'],
    });
  }

  fetchExchangeRates() {
    this.currencyService.getExchangeRate('USD').subscribe((data: any) => {
      this.exchangeRates = data.rates;
      this.updateExchangeRate();
    });
  }

  updateExchangeRate() {
    const selectedCurrency1 = this.converterForm.get('currency1').value;
    const selectedCurrency2 = this.converterForm.get('currency2').value;
    const exchangeRate1 = this.exchangeRates[selectedCurrency1];
    const exchangeRate2 = this.exchangeRates[selectedCurrency2];

    this.converterForm.get('amount2').setValue(this.calculateConvertedAmount(this.converterForm.get('amount1').value, exchangeRate1, exchangeRate2));
  }

  calculateConvertedAmount(amount: number, exchangeRate1: number, exchangeRate2: number): number {
    const result = (amount * exchangeRate2) / exchangeRate1;
    return parseFloat(result.toFixed(2));
  }

  onCurrencyChange() {
    this.updateExchangeRate();
    this.convertCurrencies();
  }

  convertCurrencies() {
    const selectedCurrency1 = this.converterForm.get('currency1').value;
    const selectedCurrency2 = this.converterForm.get('currency2').value;
    const exchangeRate1 = this.exchangeRates[selectedCurrency1];
    const exchangeRate2 = this.exchangeRates[selectedCurrency2];

    const amount1 = this.converterForm.get('amount1').value;
    const amount2 = this.converterForm.get('amount2').value;

    if (this.converterForm.get('amount1').dirty) {
      this.converterForm.get('amount2').setValue(this.calculateConvertedAmount(amount1, exchangeRate1, exchangeRate2));
    } else if (this.converterForm.get('amount2').dirty) {
      this.converterForm.get('amount1').setValue(this.calculateConvertedAmount(amount2, exchangeRate2, exchangeRate1));
    }
  }
}





