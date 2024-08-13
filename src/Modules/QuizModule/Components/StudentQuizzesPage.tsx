import { useState } from "react";
import { Link } from "react-router-dom";
import QuizzesCardSkeleton from "./SkeletonCards";
import moment from "moment";
import Button from "../../../Shared/Ui/Button";
import { ArrowRight } from "lucide-react";
import quiz from "../../../assets/images/quiz.png";
import questions from "../../../assets/images/questions.png";
import student from "../../../assets/images/student.png";
import { JoinQuizModal } from "./CreateQuizModal";
import { ICompletedQuizzes, IUpcomingQuizzes } from "../../../Interfaces/QuizInterface";


interface IProps {
  CompletedQuizzes: [];
  UpcomingQuizzes: [];
  allDataLoaded: boolean;
}
const StudentQuizzesPage = ({
  CompletedQuizzes,
  UpcomingQuizzes,
  allDataLoaded,
}: IProps) => {
  const [isOpenJoinQuizModal, setIsOpenJoinQuiz] = useState(false);
  const openJoinQuizModal = () => setIsOpenJoinQuiz(true);
  const closeJoinQuizModal = () => setIsOpenJoinQuiz(false);

  const List = [
    {
      icon: quiz,
      text: "Join Quiz",
      className: "w-10 sm:w-12 lg:w-14 ",
      path: "",
      openModal: openJoinQuizModal,
    },
    {
      icon: student,
      text: "Results",
      className: "w-12 md:w-20",
      path: "/dashboard/results",
    },
  ];

  return (
    <>
      <JoinQuizModal
        {...{ closeJoinQuizModal, isOpenJoinQuizModal, openJoinQuizModal }}
      />

      <div className="flex w-full gap-3 ">
        <div className="flex flex-col space-y-2 w-[140px] md:w-[200px]  ">
          {!allDataLoaded &&
            Array.from({ length: 2 }, (_, idx) => (
              <div
                key={idx}
                className=" sm:w-[140px]  md:w-[200px] h-[190px] animate-pulse bg-gray-500 quizBox border-2 border-gray-200  rounded-md "
              ></div>
            ))}

          {allDataLoaded &&
            List?.map(({ icon, text, className, path, openModal }) => (
              <Link key={text} to={path}>
                <figure
                  onClick={openModal}
                  className="flex flex-col max-w-[250px] h-[190px] p-1 items-center justify-center  quizBox border-2 cursor-pointer  border-gray-200  text-center rounded-md"
                >
                  <img
                    src={icon}
                    className={`${className} m-auto my-1  `}
                    alt="quiz icon for set up a new quiz"
                  />
                  <figcaption className="my-1 overflow-y-hidden font-bold leading-tight capitalize">
                    <h3>{text}</h3>
                  </figcaption>
                </figure>
              </Link>
            ))}
        </div>

        <div className="flex flex-col flex-1">
          <div className="p-3 border-2 rounded-md">
            {!allDataLoaded ? (
              <h6 className="h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md">
                {""}
              </h6>
            ) : (
              <h2 className="font-semibold ">{"UpcomingQuizzes"}</h2>
            )}
            {!allDataLoaded &&
              Array.from({ length: 1 }, (_, idx) => (
                <QuizzesCardSkeleton key={idx} />
              ))}
            {allDataLoaded &&
              UpcomingQuizzes?.map(
                ({ title, createdAt, schadule, _id }: IUpcomingQuizzes) => (
                  <div
                    key={_id}
                    className="flex items-center mt-4 border-2 rounded-lg "
                  >
                    <img
                      src={questions}
                      alt="questions"
                      className=" w-[120px] p-3 hidden sm:block h-[120px] rounded-md"
                    />

                    <div className="flex items-center justify-between w-full p-3 ">
                      <div className="">
                        <h3 className="mb-2 font-bold ">{title}</h3>
                        <div className="text-[#4c4b4b]">
                          <span>{moment(createdAt).format("Do MMM YY")}</span> |{" "}
                          <span>{moment(schadule).format("HH:mmA")}</span>
                        </div>
                        <span className="hidden mt-3 font-bold md:block">
                          No. of student’s enrolled: 32
                        </span>
                      </div>
                      <div>
                        <Button
                          onClick={openJoinQuizModal}
                          className="flex items-center gap-1 font-bold text-white text-md md:me-5 "
                          variant={"secondary"}
                          rounded={"full"}
                        >
                          Join
                          <ArrowRight
                            className="rounded-full "
                            size={15}
                            strokeWidth={4}
                            color="white"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>

          <div className="p-3 mt-2 overflow-x-auto border-2 rounded-md">
            {!allDataLoaded ? (
              <div className="flex justify-between">
                <h6 className="h-[14px] mb-2 w-[90px] animate-pulse bg-gray-500 rounded-md">
                  {""}
                </h6>
                <h6 className="flex items-center text-xs animate-pulse bg-gray-500 h-[10px] w-[70px] rounded-md ">
                  {""}
                </h6>
              </div>
            ) : (
              <div className="flex justify-between font-semibold">
                {"CompletedQuizzes"}
                <Link
                  className="flex items-center text-xs"
                  to={"/dashboard/results"}
                >
                  {"results"}{" "}
                  <ArrowRight
                    className="p-1 "
                    size={23}
                    strokeWidth={4}
                    color="#C5D86D"
                  />
                </Link>
              </div>
            )}
            <table className="w-full mt-2 border-2 border-separate rounded-md border-slate-400">
              <thead className="text-white ">
                {!allDataLoaded ? (
                  <tr>
                    <th className="px-2 py-3 bg-black ">
                      <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                        {""}
                      </span>
                    </th>
                    <th className="px-2 py-3 bg-black">
                      <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md ">
                        {""}
                      </span>
                    </th>
                    <th className="hidden px-2 py-3 bg-black lg:table-cell">
                      <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                        {""}
                      </span>
                    </th>
                    <th className="hidden px-2 py-3 bg-black md:table-cell">
                      <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                        {""}
                      </span>
                    </th>
                    <th className="px-2 py-3 bg-black">
                      <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                        {""}
                      </span>
                    </th>
                  </tr>
                ) : (
                  <tr>
                    <th className="px-2 py-3 font-semibold bg-black">TITLE</th>
                    <th className="px-2 py-3 font-semibold bg-black">STATUS</th>
                    <th className="hidden px-2 py-3 font-semibold bg-black lg:table-cell">
                      ENROLLED
                    </th>
                    <th className="hidden px-2 py-3 font-semibold bg-black md:table-cell">
                      SCHADULE
                    </th>
                    <th className="px-2 py-3 font-semibold bg-black">CLOSED</th>
                  </tr>
                )}
              </thead>
              <tbody className="text-center text-black divide-y">
                {!allDataLoaded
                  ? Array.from({ length: 5 }, (_, idx) => (
                      <tr
                        key={idx}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-blue-200"
                      >
                        <td className="py-3 bg-white border whitespace-nowrap border-slate-300 ">
                          <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                            {""}
                          </span>
                        </td>
                        <td className="py-3 bg-white border border-slate-300">
                          <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md ">
                            {""}
                          </span>
                        </td>
                        <td className="hidden py-3 bg-white border lg:table-cell border-slate-300">
                          <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                            {""}
                          </span>
                        </td>
                        <td className="hidden py-3 bg-white border md:table-cell border-slate-300">
                          <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                            {""}
                          </span>
                        </td>
                        <td className="py-3 bg-white border border-slate-300">
                          <span className="inline-block h-[14px] w-[80px] animate-pulse bg-gray-500 rounded-md">
                            {""}
                          </span>
                        </td>
                      </tr>
                    ))
                  : null}

                {allDataLoaded &&
                  CompletedQuizzes?.map(
                    ({
                      title,
                      status,
                      participants,
                      schadule,
                      closed_at,
                      _id,
                    }: ICompletedQuizzes) => (
                      <tr
                        key={_id}
                        className="bg-white dark:border-gray-700 hover:bg-blue-200"
                      >
                        <td className="py-3 font-medium truncate border whitespace-nowrap border-slate-300">
                          {title}
                        </td>
                        <td className="py-3 border border-slate-300">
                          <span className="p-1 text-sm font-medium tracking-wider text-red-800 bg-red-200 rounded-full ">
                            {status}
                          </span>
                        </td>
                        <td className="hidden py-3 border lg:table-cell border-slate-300">
                          {participants}
                        </td>
                        <td className="hidden py-3 border md:table-cell border-slate-300">
                          {moment(schadule).format("Do MMM YY")}
                        </td>
                        <td className="py-3 border border-slate-300">
                          {moment(closed_at).format("HH:mm A")}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentQuizzesPage;
