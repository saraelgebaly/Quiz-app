import { Check, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../../assets/images/Image.png";
import logo from "../../../assets/images/logo.png";
import { IFormForget } from "../../../Interfaces/AuthInterface";
import { AuthInput } from "../../../Shared/Ui/AuthInput";
import Button from "../../../Shared/Ui/Button";
import { useForgotPasswordMutation } from "../../../Toolkit/Auth/authSlice";
import { emailValidation, renderErrors } from "../../../utils/Validation";
function ForgetPassword() {
  const navigate = useNavigate();
  const [submitForget, { isLoading }] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormForget>();

  const handleForget = async (data: IFormForget) => {
    const response = await submitForget(data);
    if (
      "data" in response &&
      response.data?.message === "Reset password email sent"
    ) {
      navigate("/resetpass");
    }
  };
  return (
    <div className="min-h-screen bg-[#0D1321] text-white font-nunito">
      <div className="container flex">
        <div className="flex-1 h-screen pt-8">
          <img src={logo} className="w-[150px]" alt="Logo" />
          <div className="mt-10">
            <p className="text-[#C5D86D] text-2xl font-semibold">
              Forgot Password
            </p>
            <div>
              <form
                onSubmit={handleSubmit(handleForget)}
                className="space-y-4 font-[sans-serif] text-[#333]"
              >
                <AuthInput
                  {...register("email", emailValidation)}
                  className="mt-12 "
                  lable="Email address"
                  type="email"
                  placeholder="Type your email"
                  icon={<Mail />}
                />
                {renderErrors(errors?.email?.message)}
                <Button
                  isLoading={isLoading}
                  rounded={"lg"}
                  className="gap-3  "
                >
                  Send email{" "}
                  <Check
                    className="bg-black group-hover:bg-white rounded-full p-1 text-2xl text-white group-hover:text-black transition duration-200"
                    size={20}
                    strokeWidth={5}
                  />
                </Button>
              </form>
            </div>
            <div className="grid justify-items-end mt-60">
              <div>
                Login?
                <span className="text-[#C5D86D] font-semibold underline">
                  <Link to="/login">Click here</Link>
                </span>
              </div>
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

export default ForgetPassword;
