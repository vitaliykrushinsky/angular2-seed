import { Employee } from './../models/employee.model';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  languages: string[] = [];
  hasPrimaryLanguageError: boolean = false;

  // preselected field with data
  //model = new Employee('John', 'Doe', true, "w2", 'default');
  // default data
  model = new Employee('', '', false, '', 'default');

  constructor(private formService: FormService) {

  }

  ngOnInit() {
    this.formService.getLanguages()
      .subscribe(
        data => this.languages = data,
        error => console.log('get error ', error)
      );
  }

  validatePrimaryLanguage(value: string): void {
    value === 'default' ? this.hasPrimaryLanguageError = true : this.hasPrimaryLanguageError = false;
  }

  submitForm(form: NgForm): void {
    // validate form
    // validate select field
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError) {
      return;
    }
    // post form data
    this.formService.postEmployeeForm(this.model)
      .subscribe(
        data => console.log('post success ', data),
        error => console.log('post error ', error)
      )
  }

  firstLetterToUpperCase(value: string): void {
    if (value.length > 0) {
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      this.model.firstName = value;
    }
  }
}
