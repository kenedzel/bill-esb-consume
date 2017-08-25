import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BillsServiceProvider } from '../../providers/bills-service/bills-service';
import { PaymentFormPage } from '../payment-form/payment-form';

/**
 * Generated class for the BillerListingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-biller-listing',
  templateUrl: 'biller-listing.html',
})
export class BillerListingPage {

  billers: any;
  errors: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _billsService: BillsServiceProvider) {
    this.getBillers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillerListingPage');
    // alert(this.navParams.get('one'));
    this.getBillers();
  }

  getBillers() {
    this._billsService.getBillers()
          .then(data => {
            this.billers = data.content;
          })
          .catch(err => {
            this.errors = err;
          });
  }

  selectBiller(accountNumber, name) {
    let data = {
      billerAccountNumber: accountNumber,
      billerName: name
    };

    this.navCtrl.push(PaymentFormPage, data);
  }
}
