import { AbstractControl } from "@angular/forms";

export class CustomValidators {

  static isTypeOfUser(control: AbstractControl) {
      let val = control.value;
      if(!val) { return null}

      if (val instanceof Object) {
        return null
      } else {
        return { 'notUser': true }
      };
    }
}
