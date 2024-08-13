import { AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";
import Pagination from "../../../Shared/Ui/Pagination";
import { useGetStudentsQuery } from "../../../Toolkit/Students/studentSlice";
import noData from "../../../assets/images/No-Data.jpg";
import userImg from "../../../assets/images/student.png";
import StudentCart from "./StudentCart";
import { StudentDetailsModal } from "./StudentDetailsModal";
interface UserListProps {
  email: string;
  first_name: string;
  group: {
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: string[];
  };
  last_name: string;
  role: string;
  status: string;
  _id: string;
}

function Students() {
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [detailsItemId, setDetailsItem] = useState("");
  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
    setDetailsItem("");
  };

  const openDetailsModal = (_id: string) => {
    setIsOpenDetailsModal(true);
    setDetailsItem(_id);
  };
  const { isLoading, data: users } = useGetStudentsQuery(0);

  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 20;
  const startIndex = currentPage * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = users?.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <StudentDetailsModal
        {...{ detailsItemId, isOpenDetailsModal, closeDetailsModal }}
      />
      <div className="border-2 rounded-md p-3 ">
        {isLoading ? (
          <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">
            {""}
          </h6>
        ) : (
          <h2 className=" font-semibold">{"StudentsList"}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
          {isLoading ? (
            Array.from({ length: 20 }, (_, index) => (
              <StudentCart key={index} />
            ))
          ) : currentStudents?.length > 0 ? (
            <>
              <AnimatePresence initial={false}>
                {currentStudents.map((user: UserListProps) => (
                  <div
                    key={user._id}
                    className="border flex shadow-md shadow-slate-300"
                  >
                    <img className="w-12" src={userImg} alt="Stundent-amg" />
                    <div className="flex items-center justify-between w-full">
                      <div className=" m-auto ">
                        <h4 className="">
                          {user.first_name + " " + user.last_name}
                        </h4>
                      </div>
                      <Eye
                        className="mr-2 cursor-pointer text-[#C5D86D]"
                        onClick={() => openDetailsModal(user._id)}
                      />
                    </div>
                  </div>
                ))}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 ">
              <img
                src={noData}
                className="max-w-full w-1/2 h-auto"
                alt="noData"
              />
              <p className="text-xl  font-nunito text-red-500 font-bold">
                No Students
              </p>
            </div>
          )}
        </div>
      </div>

      {!isLoading && users && (
        <Pagination
          members={users}
          count={studentsPerPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default Students;
