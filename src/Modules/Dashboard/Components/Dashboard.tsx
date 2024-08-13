import { ArrowRight } from "lucide-react";
import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetFirstUpcomingQuizzesQuery } from "../../../Toolkit/Quizes/quizSlice";
import { useGetTopFiveStudentsQuery } from "../../../Toolkit/Students/studentSlice";
import quiz1 from "../../../assets/images/Quiz img.png";
import user from "../../../assets/images/user.png";
import QuizzesCardSkeleton from "../../QuizModule/Components/SkeletonCards";
import StudentCartSkeleton from "../../StudentsModule/Components/StudentCartSkeleton";
import { IUpcomingQuizzes } from "../../../Interfaces/QuizInterface";
import { ITopFiveStudents } from "../../../Interfaces/StudentInterface";


function Dashboard() {
  const { isLoading: upcomingQuizzesLoading, data: UpcomingQuizzes } =
    useGetFirstUpcomingQuizzesQuery(0);
  const { isLoading: topFiveStudentsLoading, data: TopFiveStudents } =
    useGetTopFiveStudentsQuery(0);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useLayoutEffect(() => {
    if (!upcomingQuizzesLoading && !topFiveStudentsLoading) {
      setAllDataLoaded(true);
    }
  }, [upcomingQuizzesLoading, topFiveStudentsLoading]);
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 items-start ">
        <div className="p-3 border-2 rounded-md flex-1 ">
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
              ({ title, schadule, _id, createdAt }: IUpcomingQuizzes) => (
                <div
                  key={_id}
                  className="flex items-center mt-4 border-2 rounded-lg "
                >
                  <img
                    src={quiz1}
                    alt="quizImg"
                    className=" w-[120px] p-3 hidden sm:block h-[120px] rounded-md"
                  />
                  <div className="w-full p-3 ">
                    <h3 className="font-bold ">{title}</h3>
                    <div className="tedxt-[#777]">
                      <span>{moment(createdAt).format("Do MMM YY")}</span> |{" "}
                      <span>{moment(schadule).format("HH:mmA")}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold">
                        No. of student’s enrolled: 32
                      </span>
                      <Link
                        className="flex items-center gap-1 font-bold"
                        to={`/dashboard/quiz-details/${_id}`}
                      >
                        Open{" "}
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

        <div className="p-3 border-2 rounded-md ">
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
            <div className="flex justify-between">
              <h2>{"Top5Students"}</h2>
              <Link
                className="flex items-center text-xs"
                to={"/dashboard/student"}
              >
                {"AllStudents"}
                <ArrowRight
                  className="p-1 "
                  size={23}
                  strokeWidth={4}
                  color="#C5D86D"
                />
              </Link>
            </div>
          )}

          {!allDataLoaded &&
            Array.from({ length: 5 }, (_, idx) => (
              <StudentCartSkeleton key={idx} />
            ))}
          {allDataLoaded &&
            TopFiveStudents?.map(
              ({
                first_name,
                last_name,
                avg_score,
                group,
                _id,
              }: ITopFiveStudents) => (
                <div
                  key={_id}
                  className="flex items-center mt-4 border-2 rounded-lg "
                >
                  <img src={user} alt="studentImg" />

                  <div className="flex items-center justify-between w-full p-2 ">
                    <div>
                      <h3 className="font-bold">
                        {first_name + " " + last_name}
                      </h3>
                      <div className="text-[#777]">
                        <span>Group: {group?.name}</span> |{" "}
                        <span>
                          Average Score
                          {avg_score === 0 ? 0.7 : Math.round(avg_score)}
                        </span>
                      </div>
                    </div>
                    <Link to={"/dashboard/student"}>
                      {" "}
                      <ArrowRight
                        className=" bg-[#C5D86D] rounded-full p-[2.5px] mr-1"
                        size={20}
                        strokeWidth={3}
                        color="white"
                      />
                    </Link>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
