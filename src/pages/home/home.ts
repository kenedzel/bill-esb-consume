import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BillerListingPage } from '../biller-listing/biller-listing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToBillersListing() {
    let data = {
      one: 'data1',
      two: 'data2'
    };
    this.navCtrl.push(BillerListingPage, data);
  }

}
