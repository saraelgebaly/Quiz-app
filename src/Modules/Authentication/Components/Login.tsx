import CookieServices from "../../../utils/Cookies";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../../Shared/Auth/AuthContainer";
import { useLoginMutation } from "../../../Toolkit/Auth/authSlice";
import { useForm } from "react-hook-form";
import { IFormLogin } from "../../../Interfaces/AuthInterface";
import { AuthInput, PasswordInput } from "../../../Shared/Ui/AuthInput";
import { emailValidation, passLoginValidation, renderErrors } from "../../../utils/Validation";
import { Check, Lock, Mail } from "lucide-react";
import Button from "../../../Shared/Ui/Button";


function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = async (user: IFormLogin) => {
    const response = await login(user);

    if ("data" in response && response.data?.message === "Login Success") {
      CookieServices.get("userInfo").role === "Instructor"
        ? navigate("/dashboard")
        : navigate("/dashboard/quizes");
    }
  };

  return (
    <>
      <AuthContainer header="Continue your learning journey with QuizWiz!">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <AuthInput
            {...register("email", emailValidation)}
            lable="Registered email address"
            type="email"
            placeholder="Type your email"
            icon={<Mail />}
          />
          {renderErrors(errors?.email?.message)}

          <PasswordInput
            className="mt-3"
            {...register("password", passLoginValidation)}
            lable="Password"
            placeholder="Type your password"
            icon={<Lock />}
          />
          {renderErrors(errors?.password?.message)}

          <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row  justify-between items-center mt-5 ">
            <Button
              isLoading={isLoading}
              rounded={"lg"}
              className="gap-3 group "
            >
              Sign in
              <Check
                className="bg-black group-hover:bg-white rounded-full p-1 text-2xl text-white group-hover:text-black transition duration-200"
                size={20}
                strokeWidth={5}
              />
            </Button>

            <span>
              Forgot password ?
              <Link
                to={"./forget-password"}
                className="text-[#C5D86D] underline"
              >
                click here
              </Link>
            </span>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}

export default Login;
