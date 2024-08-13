
const required = "This Field is required";

export const FieldValidation = {
  required,
}

export const emailValidation = {
  required: "Email is required !!",
  pattern: {
    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    message: "invalid email!!",
  },
}

export const passLoginValidation = {
  required: "Password is required !!",
}
export const passRegValidation = {
  required: "Password is required !!",
  pattern: {
    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*0-9]).{5,}$/,
    message:
      "password must be 5 char, contains one uppercase letter, one lowercase letter, and  special char or number",
  },
}
export const otpValidation = {
  required: "OTP is required!!",
  pattern: {
    value: /^\d{6}$/,
    message: "Please enter a valid 6-digit OTP",
  },
}

export const fieldValidation = {
  required,
  minLength: {
    value: 3,
    message:
      "This Field shouldn't be less than three character",
  },
}

export const renderErrors = (errors: string | undefined) => {
    return errors ? (
      <span className="text-red-600 block mb-1">
        {errors}
      </span>
    ) : null;
  };