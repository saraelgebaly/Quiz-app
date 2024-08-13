export interface IFormLogin {
    email: string;
    password: string;
  }
  
  export interface IFormRegister {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    password: string;
  }
  
  export interface IFormForget {
    email: string;
  }
  
  export interface IFormResetPass {
    email: string;
    otp: string;
    password: string;
  }
  
  export interface IFormChangePass {
    password: string;
    password_new: string;
    confirmPassword: string;
  }
  
  export interface ILoginResponse {
    data: {
      accessToken: string;
      profile: {
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        status: string;
        _id: string;
      };
      refreshToken: string;
    };
    message: string;
  }
  
  
  
  export interface IRegisterResponse {
    data: {
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      status: string;
      _id: string;
      updatedAt: string;
      createdAt: string;
      __v: number;
    };
    message: string;
  }
  
  export interface IResetPassResponse {
    data: {
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      status: string;
      _id: string;
    };
    message: string;
  }
  
  export interface IChangePassResponse {
    data: {
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      status: string;
      _id: string;
    };
    message: string;
  }
  
  export interface IForgetResponse {
    message: string;
  }
  
  export interface IFormError {
    data: {
      message: string,
      timestamp: string
    };
    status: number;
  }
  
  export interface IForgetError {
    data: {
      message: string[],
      timestamp: string
    };
    status: number;
  }
  
  
  