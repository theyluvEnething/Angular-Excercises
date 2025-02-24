import { FormGroup, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';

export class UserValidators {
  static passwordFormat(fc: AbstractControl): ValidationErrors | null {
    const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    return passwordPattern.test(fc.value) ? null : { passwordFormat: true };
  }

  static passwordSame(fg: AbstractControl): ValidationErrors | null {
    const password = (fg as FormGroup).get('password')!.value;
    const passwordRepeat = (fg as FormGroup).get('passwordRepeat')!.value;
    return (password === passwordRepeat) ? null : { passwordSame: true };
  }

  static atLeastOneEmail(fa: AbstractControl): ValidationErrors | null {
    const containsValue = (fa as FormArray).controls.some(e => e.value ? true : false);
    return containsValue ? null : { atLeastOneEmail: true };
  }
}
