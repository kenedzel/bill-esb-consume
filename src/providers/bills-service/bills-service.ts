import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the BillsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BillsServiceProvider {
  
  data: any;
  err: any;
  url: string = 'http://b1ce4a7b.ngrok.io/xapi/v1';
  billerPath: string = 'biller';
  billPath: string = 'bill';
  paymentPath: string = 'payment';
  separator: string = '/';

  constructor(public http: Http) {
    console.log('Hello BillsServiceProvider Provider');
  }

  getBillers() {
    let getURL = this.url + this.separator + this.billerPath;

    if (this.data == 0) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get(getURL)
                .map(res => res.json())
                .subscribe(data => {
                  this.data = data;
                  resolve(this.data);
                });
    });
  }

  subscriberInquiry(subscriberAccountNumber, billerAccountNuber) {

    if (this.data == 0) {
      return Promise.resolve(this.data);
    } 

    return new Promise(resolve => {
      this.http.get(this.url + this.separator + this.billPath + this.separator + subscriberAccountNumber + this.separator + billerAccountNuber, this.getOptions())
                    .map(res => res.json())
                    .subscribe(data => {
                      this.data = data;
                      resolve(this.data);
                    },
                        err => {
                      this.err = err;
                      resolve(this.err);
                    });
    });
  }

  billsPayment(subscriberAccountNumber, billerAccountNumber, amount) {
    return new Promise(resolve => {
      this.http.post(this.url + this.separator + this.paymentPath + this.separator + subscriberAccountNumber + this.separator + billerAccountNumber, {}, this.getOptionsWithParam(amount))
                .subscribe(data => {
                  resolve(data);
                });
    });
  }

  getHeaders(): any {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }

  getOptionsWithParam(param): RequestOptions {
    return new RequestOptions({
      headers: this.getHeaders(),
      params: this.transformAmount(param)
    });
  }

  getOptions(): RequestOptions {
    let header = new Headers();

    header.append('Content-Type', 'application/json')
    return new RequestOptions({
      headers: header
    });
  }

  transformAmount(param) {
    let amount = new URLSearchParams();
    amount.set('amount', param);
    return amount;
  }
}
