import {regExpEmail} from "./regExp";

class ValidationField {
    static minLength(val, minLength = -1) {
        return val.trim().length >= minLength  ? true : false
    }

    static email(val, min) {
        if(this.minLength(val, min) === false) return ({valid: false, message: `Минимальное кол-во символов ${min}`});
        const re = regExpEmail;
        return ({valid: re.test(val)});
    }


    static notEmpty(val, min) {
        if(this.minLength(val, min) === false) return false;
        return Boolean(val.trim().length)
    }

    static password(val, min) {
        if(this.minLength(val, min) === false) return ({valid: false, message: `Минимальное кол-во символов ${min}`});
        return {valid: false}
    }

    static confirmPassword(pass, confPass) {
        return pass === confPass
    }
}


export default ValidationField;