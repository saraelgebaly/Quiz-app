import logo from "../../../assets/images/logo.png";
import image from "../../../assets/images/Image.png";
import { useResetPasswordMutation } from "../../../Toolkit/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IFormResetPass } from "../../../Interfaces/AuthInterface";
import {
  AuthInput,
  PasswordInput,
} from "../../../Shared/Ui/AuthInput";
import {
  emailValidation,
  otpValidation,
  passRegValidation,
  renderErrors,
} from "../../../utils/Validation";
import { Check, Lock, Mail } from "lucide-react";
import Button from "../../../Shared/Ui/Button";
function ResetPassword() {
  const [submitResetPass, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormResetPass>();
  const navigate = useNavigate();

  const handleResetPass = async (data: IFormResetPass) => {
    const response = await submitResetPass(data);
    if (
      "data" in response &&
      response.data?.message === "Record updated successfully"
    ) {
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-[#0D1321] text-white font-nunito">
      <div className="container flex">
        <div className="flex-1 h-screen pt-8">
          <img src={logo} className="w-[150px]" alt="Logo" />
          <div className="mt-10">
            <p className="text-[#C5D86D] text-2xl font-semibold">
              Reset Password
            </p>
            <div>
              <form
                onSubmit={handleSubmit(handleResetPass)}
                className="space-y-4 font-[sans-serif] text-[#333]"
              >
                <AuthInput
                  className="mt-3"
                  {...register("email", emailValidation)}
                  lable="Your email address"
                  type="email"
                  placeholder="Type your email"
                  icon={<Mail />}
                />
                {renderErrors(errors?.email?.message)}

                <AuthInput
                  className="mt-3"
                  {...register("otp", otpValidation)}
                  lable="Type your otp"
                  type="text"
                  placeholder="Type your OTP"
                  icon={<Mail />}
                />
                {renderErrors(errors?.otp?.message)}

                <PasswordInput
                  className="mt-3"
                  {...register("password", passRegValidation)}
                  lable="Password"
                  type="password"
                  placeholder="Type your password"
                  icon={<Lock />}
                />
                {renderErrors(errors?.password?.message)}

                <div className="flex flex-col items-center justify-between mt-5 space-y-5 sm:space-y-0 sm:flex-row">
                  <Button
                    isLoading={isLoading}
                    rounded={"lg"}
                    className="gap-3 group"
                  >
                    Reset{" "}
                    <Check
                      className="p-1 text-2xl text-white transition duration-200 bg-black rounded-full group-hover:bg-white group-hover:text-black"
                      size={20}
                      strokeWidth={5}
                    />
                  </Button>

                  <h1 className="text-white">
                    Login ?{" "}
                    <Link to={"/"} className="underline text-[#C5D86D]">
                      click here
                    </Link>{" "}
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 hidden md:flex justify-end items-center h-screen">
          <img src={image} className="w-[80%]" alt="Background" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
