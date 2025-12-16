/**
 * Validation utility functions
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Egyptian phone number (11 digits starting with 01)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('01');
}

/**
 * Validate required field
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Validate age (1-120)
 */
export function isValidAge(age: number): boolean {
  return age >= 1 && age <= 120;
}

/**
 * Validate credit card number (basic Luhn check)
 */
export function isValidCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate CVV (3-4 digits)
 */
export function isValidCVV(cvv: string): boolean {
  const cleaned = cvv.replace(/\D/g, '');
  return cleaned.length >= 3 && cleaned.length <= 4;
}

/**
 * Validate expiry date (MM/YY format, not expired)
 */
export function isValidExpiryDate(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const expiryDate = new Date(year, month);

  return expiryDate > now;
}

/**
 * Validate passenger form
 */
export function validatePassenger(passenger: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(passenger.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!isRequired(passenger.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!isRequired(passenger.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(passenger.email)) {
    errors.email = 'Invalid email format';
  }

  if (!isRequired(passenger.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(passenger.phone)) {
    errors.phone = 'Invalid Egyptian phone number (11 digits starting with 01)';
  }

  if (!isValidAge(passenger.age)) {
    errors.age = 'Age must be between 1 and 120';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate payment form
 */
export function validatePayment(payment: {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(payment.cardNumber)) {
    errors.cardNumber = 'Card number is required';
  } else if (!isValidCardNumber(payment.cardNumber)) {
    errors.cardNumber = 'Invalid card number';
  }

  if (!isRequired(payment.cardHolder)) {
    errors.cardHolder = 'Card holder name is required';
  }

  if (!isRequired(payment.expiryDate)) {
    errors.expiryDate = 'Expiry date is required';
  } else if (!isValidExpiryDate(payment.expiryDate)) {
    errors.expiryDate = 'Invalid or expired date (MM/YY)';
  }

  if (!isRequired(payment.cvv)) {
    errors.cvv = 'CVV is required';
  } else if (!isValidCVV(payment.cvv)) {
    errors.cvv = 'Invalid CVV';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate login form
 */
export function validateLogin(credentials: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(credentials.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(credentials.email)) {
    errors.email = 'Invalid email format';
  }

  if (!isRequired(credentials.password)) {
    errors.password = 'Password is required';
  } else if (!minLength(credentials.password, 6)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate registration form
 */
export function validateRegistration(data: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!isRequired(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!isRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!isRequired(data.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Invalid Egyptian phone number (11 digits starting with 01)';
  }

  if (!isRequired(data.password)) {
    errors.password = 'Password is required';
  } else if (!minLength(data.password, 6)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
