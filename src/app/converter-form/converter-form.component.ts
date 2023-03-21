import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadCurrenciesService } from '../load-currencies.service';

@Component({
  selector: 'app-converter-form',
  templateUrl: './converter-form.component.html',
  styleUrls: ['./converter-form.component.less']
})
export class ConverterFormComponent implements OnInit, OnDestroy {
  convertFrom: number = 1;
  convertTo: number = 1;
  convertAmountFromVal: number = 0;
  convertAmountToVal: number = 0;
  convertedAmountFromVal: number = 0;
  convertedAmountToVal: number = 0;
  xmlItems: any[] = [{ currency: 'EUR', rate: 1 }];
  subscription!: Subscription;

  constructor(private loadCurrencies: LoadCurrenciesService) { }

  convertAmountFromBlur($event: any): void {
    this.convertAmountFromVal = $event.target.value || 0;
    this.calculateToResult(this.convertAmountFromVal);
  };

  convertAmountToBlur($event: any): void {
    this.convertAmountToVal = $event.target.value || 0;
    this.calculateFromResult(this.convertAmountToVal);
  };

  calculateFromResult(val: number) {
    this.convertedAmountToVal = val * this.convertTo;
    this.convertedAmountFromVal = this.convertedAmountToVal / this.convertFrom;
    this.convertAmountFromVal = this.convertedAmountFromVal;
  }

  calculateToResult(val: number) {
    this.convertedAmountFromVal = val * this.convertFrom;
    this.convertedAmountToVal = this.convertedAmountFromVal / this.convertTo;
    this.convertAmountToVal = this.convertedAmountToVal;
  }

  ngOnInit(): void {
    this.subscription = this.loadCurrencies.getXmlData().subscribe(
      (res: any) => {
        this.xmlItems = this.xmlItems.concat(res);
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
