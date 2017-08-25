import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BillsServiceProvider } from '../../providers/bills-service/bills-service';
import { Dialogs } from '@ionic-native/dialogs';
/**
 * Generated class for the PaymentFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment-form',
  templateUrl: 'payment-form.html',
})
export class PaymentFormPage {

  billerName: any;
  bill: any;
  data: any;
  err: any;

  @Input() accountNumber: any;
  @Input() amount: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private _billsService: BillsServiceProvider, private _alertCtrl: AlertController, private _dialog: Dialogs) {
  }

  ionViewDidLoad() {
    this.billerName = this.navParams.get('billerName');
  }

  billsPayment() {
    let billerAccountNumber = this.navParams.get('billerAccountNumber');

    this._billsService.subscriberInquiry(this.accountNumber, billerAccountNumber)
                        .then(data => {
                          this.bill = data.content
                          this.constructConfirmationAlert(this.bill);
                        })
                        .catch(err => {
                          this.err = err;
                          this.constructErrorAlert();
                        });
  }

  constructErrorAlert() {
    let alertDialog = this._alertCtrl.create({
      title: 'Error',
      message: 'We cannot find your Account Number in this Biller. Please try again.',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    });
    alertDialog.present();
  }

  performPayment(subscriberAccountNumber, billerAccountNumber, amount) {

    this._billsService.billsPayment(subscriberAccountNumber, billerAccountNumber, amount)
                                  .then(data => {
                                    this.data = data;
                                    this._dialog.alert('Your payment has been successfully sent! \n Thank you.', 'Success', 'OK');
                                    this.resetFields();
                                  })
                                  .catch(error => {
                                    this._dialog.alert('Please try again.', 'Error', 'OK');
                                    this.resetFields();
                                  });
  }

  constructConfirmationAlert(object) {
    let alertDialog = this._alertCtrl.create({
      title: 'Payment Confirmation',
      message: this.constructBillInfo(object),
      buttons: [{
        text: 'CONFIRM',
        handler: data => {
          this.performPayment(this.accountNumber, object.billerAccountNumber, this.amount)
        }
      },
      {
        text: 'CANCEL',
        role: 'cancel'
      }]
    });
    alertDialog.present();
  }

  constructBillInfo(object) {
    return 'Biller Name: ' + this.billerName + "<br>" + 
            'Subscriber Account Number: ' + object.subscriberAccountNumber + "<br>" +
            'Outstanding Balance: ' + object.outstandingBalance + "<br><br>" + 
            'Amount: ' + this.amount;
  }

  resetFields() {
    this.accountNumber = '';
    this.amount = '';
  }
}
