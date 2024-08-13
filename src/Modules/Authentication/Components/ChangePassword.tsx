import React, { useState } from "react";
import { AddModal } from "../../../Shared/Ui/Modals";
import {
  ConfirmPasswordInput,
  PasswordInput,
} from "../../../Shared/Ui/AuthInput";
import { Check, Lock } from "lucide-react";
import Button from "../../../Shared/Ui/Button";
import { passRegValidation, renderErrors } from "../../../utils/Validation";
import { useChangePasswordMutation } from "../../../Toolkit/Auth/authSlice";
import { IFormChangePass } from "../../../Interfaces/AuthInterface";
import { useForm } from "react-hook-form";

function ChangePassword({register,errors,getValues,isLoading}):any {
  

  return (
      <>
        {/* <PasswordInput
          containerStyle="border-2 border-black text-black"
          textColor="text-black"
          {...register("password", passRegValidation)}
          lable="Old Password"
          placeholder="Type your old password"
          icon={<Lock color="black" />}
        />
        {renderErrors(errors?.password?.message)}

        <ConfirmPasswordInput
          containerStyle="border-2 border-black"
          textColor="text-black"
          {...register("password_new", {
            required: "New Password is required!!",
          })}
          lable="New Password"
          placeholder="Type your new password"
          icon={<Lock color="black" />}
        />
        {renderErrors(errors?.password_new?.message)}

        <ConfirmPasswordInput
          containerStyle="border-2 border-black"
          textColor="text-black"
          {...register("confirmPassword", {
            required: "Confirm New Password is required!!",
            validate: (value) =>
              value === getValues("password_new") || "password is don't match",
          })}
          lable="Confirm New Password"
          placeholder="Type your confirm new password"
          icon={<Lock color="black" />}
        />
        {renderErrors(errors?.confirmPassword?.message)}
        <div className="flex justify-center">
          <Button
            isLoading={isLoading}
            rounded={"lg"}
            className="gap-2 mt-4"
            variant={"ghost"}
          >
            Change
            <Check
              className="rounded-full p-1 text-2xl "
              size={22}
              strokeWidth={5}
            />
          </Button>
        </div> */}
      </>
  )
  
}

export default ChangePassword;
