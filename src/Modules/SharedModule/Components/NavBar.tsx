import CookieServices from "../../../utils/Cookies";

interface NavbarProps {
  toggleSidebar: () => void;
  selectedMenuItem: string;
}

function NavBar({ selectedMenuItem }: NavbarProps) {
  const userInfo = CookieServices.get("userInfo");

  return (
    <>
      <nav className="w-full bg-yellow-30 h-20 border-2 border-l-0 flex sticky bottom-0 items-center">
        <div className="bg-green-40 h-20 flex flex-1">
          <div className="flex bg-red-10 justify-between items-center flex-1 border-r-2 px-2 gap-4">
            <h1 className="font-semibold">{selectedMenuItem}</h1>
          </div>

          <div className=" md:flex flex px-10 gap-4 bg-red-5 justify-center border-r-2">
            <div className="px-4 ">
              <div className="md:flex items-center gap-3">
                <p className="text-sm md:text-base">
                  {userInfo?.first_name + " " + userInfo?.last_name}
                </p>
                <p className="text-sm md:text-base  text-[#C5D86D]">
                  {userInfo.role}
                </p>
              </div>

              <p className="text-sm md:text-base">{userInfo?.email}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
