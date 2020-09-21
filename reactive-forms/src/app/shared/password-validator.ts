import { AbstractControl } from '@angular/forms';
import { equal, notEqual } from 'assert';

export function passwordValidator(control :AbstractControl):{ [key:string]:boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if(password.pristine || confirmPassword.pristine ){
        return null;
    }
    return password && confirmPassword && password.value != confirmPassword.value ?{'misMatch':true}:null;
    }