import { CustomerComponent } from './customer/customer.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tetantrulz';

  onButtonClick() {
      this.title = 'Hello from Kendo UI!';
  }
}
