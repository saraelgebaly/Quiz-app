import image from "../../assets/images/Image.png";
import logo from "../../assets/images/logo.png";

import { Link, useLocation } from "react-router-dom";

interface AuthLayoutProps {
  header: string;
  children: React.ReactNode;
}

export default function AuthContainer({ header, children }: AuthLayoutProps) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="min-h-screen overflow-auto bg-[#0D1321] text-white">
        <div className="container">
          <div className="flex">
            <div className="flex-1 h-screen pt-5">
              <img src={logo} className="w-[150px]" alt="" />
              <div className="mt-5">
                <p className="text-[#C5D86D] text-2xl font-semibold">{header}</p>
                {pathname === "/" || pathname === "/register" ? (
                  <div className="flex gap-9 pt-7">
                    <Link to="/">
                      <div
                        className={`bg-[#333333] p-10 rounded-md text-center h-[150px] w-[150px] ${
                          pathname === "/" ? "border-4 border-[#C5D86D]" : ""
                        }`}
                      >
                       
                        {pathname === "/" ? (
                          <i className="fa solid fa-user text-[40px] text-[#C5D86D]"></i>
                        ) : (
                          <i className="fa solid fa-user text-[40px]"></i>
                        )}
                        <p>Sign in</p>
                      </div>
                    </Link>

                    <Link to="/register">
                      <div
                        className={`bg-[#333333] p-10 rounded-md text-center h-[150px] w-[150px] ${
                          pathname === "/register"
                            ? "border-4 border-[#C5D86D]"
                            : ""
                        }`}
                      >
                       {pathname === "/register" ? (
                          <i className="fa solid fa-user-plus text-[40px] text-[#C5D86D]"></i>
                        ) : (
                          <i className="fa solid fa-user-plus text-[40px]"></i>
                        )}
                        <p>Sign Up</p>
                      </div>
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="mt-3">{children}</div>
            </div>
            <div className="flex-1 hidden md:flex justify-end items-center h-screen">
              <img src={image} className="w-[80%]" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
