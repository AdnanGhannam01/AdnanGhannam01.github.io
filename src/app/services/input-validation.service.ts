import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }

  validate(form: FormGroup<any>) {
    for (let control in form.controls)
    {
      const errors = form.controls[control]?.errors;
      if (!errors) continue;

      if (errors["required"]) {
        return `The '${control}' field is required`;
      }

      // 
      if (errors["minlength"]) {
        return `The '${control}' field should be at least ${errors["minlength"]["requiredLength"]} characters, your input is ${errors["minlength"]["actualLength"]} characters long.`;
      }
    }

    return null;
  }
}
