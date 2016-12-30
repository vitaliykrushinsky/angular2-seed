import { Employee } from './../models/employee.model';
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages: string[] = ['English', 'Spanish', 'Others'];
  model = new Employee('John', 'Doe', true, "w2", 'English');

  firstLetterToUpperCase(value: string): void {
    if (value.length > 0) {
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }
  }
}
