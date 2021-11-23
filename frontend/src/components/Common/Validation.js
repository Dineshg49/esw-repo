import validator from 'validator';

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return 'Email is required';
    } else if (!validator.isEmail(email)) {
      return 'Invalid Email';
    }
    return false;
  }

  validateUsername(username) {
    if (validator.isEmpty(username)) {
      return 'This field is required';
    } 
    return false;
  }

  validateNumber(para) {
    if(typeof para !== 'string')
      para=para.toString();
    let isnum = /^\d+$/.test(para);
    if(!isnum){
      return 'Value must be an integer';
    }
    else if(para<"0"){
      return 'Value must be positive'
    }
    return false;
  }

  validatePassword(password) {
    if (validator.isEmpty(password)) {
      return 'Password is required';
    } else if (!validator.isLength(password, { min: 6 })) {
      return 'Password should be minimum 6 characters';
    }
    return false;
  }

  validateBigDate(para) {
    if (!/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[-]([01][0-9]|2[0-4])[-]([0-5][0-9])$/.test(para)) {
      return 'Enter Valid Date';
    }
    return false;
  }
  
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };