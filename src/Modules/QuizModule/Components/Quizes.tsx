import { Link } from "react-router-dom";
import quizImg from "../../../assets/images/img.png";

import { ArrowRight } from "lucide-react";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { List } from "../../../Shared/SelectOptions/SelectOptions";
import {
  useCompletedQuizzesQuery,
  useGetFirstUpcomingQuizzesQuery,
} from "../../../Toolkit/Quizes/quizSlice";
import CookieServices from "../../../utils/Cookies";
import { CreateQuizModal, InfoQuizModal } from "./CreateQuizModal";
import QuizzesCardSkeleton from "./SkeletonCards";
import StudentQuizzesPage from "./StudentQuizzesPage";
import { ICompletedQuizzes, IUpcomingQuizzes } from "../../../Interfaces/QuizInterface";


function Quizes() {
  //Create New Quiz
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Get upcomming & completed Quizzes
  const { isLoading: upcomingQuizzesLoading, data: UpcomingQuizzes } =
    useGetFirstUpcomingQuizzesQuery(0);
  const { isLoading: completedQuizzesLoading, data: CompletedQuizzes } =
    useCompletedQuizzesQuery(0);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  useLayoutEffect(() => {
    if (!upcomingQuizzesLoading && !completedQuizzesLoading) {
      setAllDataLoaded(true);
    }
  }, [upcomingQuizzesLoading, completedQuizzesLoading]);

  // Quiz info
  const [quizCode, setQuizCode] = useState("");
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const openInfoModal = (code: string) => {
    setIsOpenInfoModal(true);
    setQuizCode(code);
  };
  const closeInfoModal = () => setIsOpenInfoModal(false);

  return (
    <>
      {CookieServices.get("userInfo").role === "Instructor" ? (
        <>
          <CreateQuizModal {...{ isOpen, closeModal, openInfoModal }} />
          <InfoQuizModal {...{ isOpenInfoModal, closeInfoModal, quizCode }} />
        </>
      ) : null}
      <div className="flex w-full gap-3  ">
        {CookieServices.get("userInfo").role === "Instructor" ? (
          <>
            <div className="flex flex-col space-y-2 ">
              {!allDataLoaded &&
                Array.from({ length: 3 }, (_, idx) => (
                  <div
                    key={idx}
                    className=" hidden sm:block  sm:w-[130px]  md:w-[200px] h-[190px] animate-pulse bg-gray-500  quizBox border-2 border-gray-200  rounded-md "
                  ></div>
                ))}

              {allDataLoaded &&
                List?.map(({ icon, text, className, path }) => (
                  <Link onClick={openModal} key={text} to={path}>
                    <figure className="flex flex-col max-w-[250px] h-[190px] p-1 items-center justify-center  quizBox border-2 cursor-pointer  border-gray-200  text-center rounded-md">
                      <img
                        src={icon}
                        className={`${className} m-auto my-1 `}
                        alt="quiz icon for set up a new quiz"
                      />
                      <figcaption className="my-1 overflow-y-hidden font-bold leading-tight capitalize">
                        <h3>{text}</h3>
                      </figcaption>
                    </figure>
                  </Link>
                ))}
            </div>

            <div className="flex flex-col flex-1 ">
              <div className="p-3 border-2 rounded-md">
                {!allDataLoaded ? (
                  <h6 className="h-[14px] w-[90px] animate-pulse bg-gray-500 rounded-md"></h6>
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
                          src={quizImg}
                          alt="quizImg"
                          className=" w-[120px] p-3 hidden sm:block h-[120px] rounded-md"
                        />
                        <div className="w-full p-3 ">
                          <h3 className="font-bold ">{title}</h3>
                          <div className="text-[#777]">
                            <span>{moment(createdAt).format("Do MMM YY")}</span>{" "}
                            | <span>{moment(schadule).format("HH:mmA")}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold">
                              No. of student’s enrolled: 32
                            </span>
                            <Link
                              className="flex items-center gap-1 font-bold"
                              to={`/dashboard/quiz-details/${_id}`}
                            >
                              Open
                              <ArrowRight
                                className="rounded-full bg-[#C5D86D]"
                                size={15}
                                strokeWidth={4}
                                color="white"
                              />
                            </Link>
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
                  <div className="flex items-center justify-between font-semibold">
                    <h3>{"CompletedQuizzes"}</h3>
                    <Link
                      className="flex items-center "
                      to={"/dashboard/results"}
                    >
                      {"Results"}{" "}
                      <ArrowRight
                        className="p-1 "
                        size={24}
                        strokeWidth={6}
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
                        <th className="px-2 py-3 font-semibold bg-black">
                          TITLE
                        </th>
                        <th className="px-2 py-3 font-semibold bg-black">
                          STATUS
                        </th>
                        <th className="hidden px-2 py-3 font-semibold bg-black lg:table-cell">
                          ENROLLED
                        </th>
                        <th className="hidden px-2 py-3 font-semibold bg-black md:table-cell">
                          SCHADULE
                        </th>
                        <th className="px-2 py-3 font-semibold bg-black">
                          CLOSED
                        </th>
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
                              <span className="p-1 font-medium tracking-wider text-red-800 bg-red-200 rounded-full ">
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
          </>
        ) : (
          <StudentQuizzesPage
            {...{ CompletedQuizzes, UpcomingQuizzes, allDataLoaded }}
          />
        )}
      </div>
    </>
  );
}

export default Quizes;
