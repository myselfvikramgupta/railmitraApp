import { Component } from '@angular/core';

/**
 * Generated class for the SidemenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidemenu',
  templateUrl: 'sidemenu.html'
})
export class SidemenuComponent {

  text: string;

  constructor() {
    console.log('Hello SidemenuComponent Component');
    this.text = 'Hello World';
  }

}
