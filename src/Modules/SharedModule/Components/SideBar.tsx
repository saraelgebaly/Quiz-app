import {
  AlignJustify,
  BookOpenCheck,
  Check,
  GraduationCap,
  House,
  ListTodo,
  Lock,
  LogOut,
  Newspaper,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { IFormChangePass } from "../../../Interfaces/AuthInterface";
import {
  ConfirmPasswordInput,
  PasswordInput,
} from "../../../Shared/Ui/AuthInput";
import Button from "../../../Shared/Ui/Button";
import { AddModal } from "../../../Shared/Ui/Modals";
import { useChangePasswordMutation } from "../../../Toolkit/Auth/authSlice";
import CookieServices from "../../../utils/Cookies";
import { passRegValidation, renderErrors } from "../../../utils/Validation";

function SideBar({ toggled, toggleSidebar, setSelectedMenuItem }: any) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (item: any) => {
    setSelectedItem(item.to);
    setSelectedMenuItem(item.label); // Update the selected menu item text
  };
  const role = CookieServices.get("userInfo").role;

  const instructorItems = [
    { to: "", label: "Dashboard", icon: <House className="w-10 h-9" /> },
    {
      to: "student",
      label: "Students",
      icon: <GraduationCap className="w-10 h-9" />,
    },
    {
      to: "groups",
      label: "Groups",
      icon: <UsersRound className="w-10 h-9" />,
    },
    {
      to: "questions",
      label: "Questions",
      icon: <BookOpenCheck className="w-10 h-9" />,
    },
    { to: "quizes", label: "Quizes", icon: <ListTodo className="w-10 h-9" /> },
    {
      to: "results",
      label: "Results",
      icon: <Newspaper className="w-10 h-9" />,
    },
  ];
  const studentItems = [
    { to: "quizes", label: "Quizes", icon: <ListTodo className="w-10 h-9" /> },
    {
      to: "results",
      label: "Results",
      icon: <Newspaper className="w-10 h-9" />,
    },
  ];

  const menuItems = role === "Instructor" ? instructorItems : studentItems;

  const logout = () => {
    CookieServices.remove("userInfo");
    CookieServices.remove("accessToken");
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IFormChangePass>();

  const [submitChange, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (data: IFormChangePass) => {
    const response = await submitChange(data);
    if (
      "data" in response &&
      response.data?.message === "Record updated successfully"
    ) {
      reset();
      closeModal();
    }
  };
  return (
    <>
      <AddModal title="Change Password" {...{ setIsOpen, isOpen, closeModal }}>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <PasswordInput
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
                value === getValues("password_new") ||
                "password is don't match",
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
          </div>
        </form>
      </AddModal>

      <div className="sidebar-container h-screen sticky top-0 border-r-2 hidden sm:block   ">
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          breakPoint="sm"
          onBackdropClick={toggleSidebar}
          className=""
        >
          <Menu className="my-14 sm:my-0">
            <MenuItem
              className="hidden sm:block h-20 border-b-2 bg-yellow-10"
              onClick={handleCollapse}
              key="collapse"
            >
              <div className="icon-container flex justify-center">
                <AlignJustify />
              </div>
            </MenuItem>

            {menuItems.map((item) => (
              <>
                <MenuItem
                  key={item.to}
                  className="border-2 bg-blac relative border-t-0 border-r-0 border-l-0 overflow-hidden"
                  component={<Link to={item.to} />}
                  onClick={() => handleMenuItemClick(item)}
                  icon={
                    <div
                      className={`mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md ${
                        selectedItem === item.to
                          ? "bg-blue-950 text-white"
                          : "bg-menuItem"
                      }`}
                    >
                      {item.icon}
                    </div>
                  }
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {selectedItem === item.to && (
                      <div className="w-1 h-24 ml-2 absolute right-0 bg-blue-950"></div>
                    )}
                  </div>
                </MenuItem>
              </>
            ))}
            <MenuItem
              key="changePassword"
              onClick={openModal}
              className="border-2 bg-blac relative border-t-0 border-r-0 border-l-0 overflow-hidden"
              icon={
                <div className="mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md bg-menuItem">
                  <Lock className="w-10 h-9" />
                </div>
              }
            >
              {" "}
              <div className="flex items-center justify-between">
                <span>Change Password</span>
              </div>
            </MenuItem>
            <MenuItem
              key="logout"
              className="border-2 bg-blac relative border-t-0 border-r-0 border-l-0 overflow-hidden"
              onClick={logout}
              icon={
                <div className="mr-4 sm:mr-0 w-16 h-10 flex justify-center items-center rounded-md bg-menuItem">
                  <LogOut className="w-10 h-9" />
                </div>
              }
            >
              <div className="flex items-center justify-between">
                <span>Logout</span>
              </div>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default SideBar;
