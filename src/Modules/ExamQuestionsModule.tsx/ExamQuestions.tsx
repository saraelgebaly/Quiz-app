import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { radioButtons } from "../../Shared/SelectOptions/SelectOptions";
import Button from "../../Shared/Ui/Button";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetQuestionsQuery } from "../../Toolkit/Questions/questionSlice";
import { Loader } from "lucide-react";
import { useSubmitQuizMutation } from "../../Toolkit/Quizes/quizSlice";
import SubmitButton from "./SubmitButton";
import { QuizResultModal } from "../QuizModule/Components/CreateQuizModal";

interface IRadioButtons {
  forId: string;
  answer: string;
}

function ExamQuestions() {
  const { id } = useParams();
  const { data: questionsData } = useGetQuestionsQuery(id);

  const [searchParams, setSearchParams] = useSearchParams({
    "question-number": "0",
  });
  const [questionNumber, setQuestionNumber] = useState(
    Number(searchParams.get("question-number"))
  );

  let Questions = questionsData?.data?.questions?.[questionNumber];

  const questionsDuration: number = questionsData?.data?.score_per_question;
  // when Refresh back to Start Question
  useEffect(() => {
    setSearchParams({ "question-number": "0" });
    const storedAnswers = localStorage?.getItem("examAnswers");
    if (storedAnswers) {
      setAllAnswers(JSON?.parse(storedAnswers));
    }

    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("examAnswers");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("examAnswers");
      });
    };
  }, []);
  const clearSelectedValue = () => {
    const inputs = document.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );
    inputs.forEach((input) => {
      input.checked = false;
    });
  };
  // Storing Question Number
  useEffect(() => {
    setQuestionNumber(Number(searchParams.get("question-number")));
  }, [searchParams]);

  // Next Button code
  const handleNextQuestion = () => {
    if (questionNumber + 1 < questionsData?.data?.questions?.length)
      setSearchParams({ "question-number": String(questionNumber + 1) });
    clearSelectedValue();
  };

  // Prev Button code
  const handlePrevQuestion = () => {
    if (questionNumber) {
      if (questionNumber >= 1)
        setSearchParams({ "question-number": String(questionNumber - 1) });
    }
    clearSelectedValue();
  };

  // Answers
  const [allAnswers, setAllAnswers] = useState<{
    answers: { question: string; answer: string; uncertain: false }[];
  }>({ answers: [] });

  // Handel Answers
  const [selectedAnswersCount, setSelectedAnswersCount] = useState(0);

  const handleChangeAnswers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const questionId = Questions?._id;
    const answerValue = e.target.value;
    //@ts-ignore

    setAllAnswers((prev) => {
      const updatedAnswers = prev.answers.map((answer) => {
        if (answer?.question === questionId) {
          return {
            question: questionId,
            answer: answerValue,
            uncertain: false,
          };
        }
        return answer;
      });

      if (!updatedAnswers?.find((answer) => answer?.question === questionId)) {
        updatedAnswers?.push({
          question: questionId,
          answer: answerValue,
          uncertain: false,
        });
      }

      const count = updatedAnswers.filter(
        (answer) => answer.answer !== ""
      ).length;
      setSelectedAnswersCount(count);

      return { answers: updatedAnswers };
    });
  };

  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (Questions && Questions.options && Questions?._id) {
      if (
        !answeredQuestions.includes(Questions?._id) &&
        allAnswers.answers.some((answer) => answer.question === Questions?._id)
      ) {
        setAnsweredQuestions((prev) => [...prev, Questions?._id]);
      }
    }
  }, [questionNumber, allAnswers.answers]);

  useEffect(() => {
    const selectedAnswer = allAnswers?.answers?.find(
      (answer) => answer?.question === Questions?._id
    )?.answer;
    if (selectedAnswer) {
      const input = document?.querySelector<HTMLInputElement>(
        `input[value="${selectedAnswer}"]`
      );
      if (input) {
        input.checked = true;
      }
    }
  }, [Questions, allAnswers, questionNumber]);

  const onButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    handelSubmitAnswers();
  };

  // Submit Quiz Answers

  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);
  const [score, setScore] = useState([0, 0, 0]);
  const [rightAnswers, setRightAnswers] = useState([]);
  const openInfoModal = (score: number[]) => {
    setIsOpenInfoModal(true);
    setScore(score);
  };

  const closeInfoModal = () => setIsOpenInfoModal(false);

  const [submitQuizAnswers, { isLoading }] = useSubmitQuizMutation();

  const handelSubmitAnswers = async () => {
    if (selectedAnswersCount !== questionsData?.data?.questions?.length) {
      alert(
        ` ${
          questionsData?.data?.questions?.length - selectedAnswersCount
        } questions without answers`
      );
      return;
    } else {
      const cleanedAnswers = allAnswers.answers.map((answer) => {
        const { uncertain, ...cleanedAnswer } = answer;
        return cleanedAnswer;
      });

      const response = await submitQuizAnswers({
        answers: cleanedAnswers,
        _id: id,
      });
      if (
        "data" in response &&
        response.data?.message === "Student submitted successfully"
      ) {
        response?.data?.data.questions.map((ques: any) =>
          //@ts-ignore

          setRightAnswers((prev) => [...prev, ques?.answer])
        );

        openInfoModal([
          response?.data?.data?.score,
          response?.data?.data?.questions?.length,
          questionsDuration,
        ]);
      }
    }
  };

  const handleUncertain = () => {
    //@ts-ignore

    setAllAnswers((prev) => {
      const updatedAnswers = prev.answers.map((answer) => {
        if (answer?.question === Questions?._id) {
          if (answer?.uncertain === false) {
            return {
              question: Questions?._id,
              answer: answer.answer,
              uncertain: true,
            };
          } else {
            return {
              question: Questions?._id,
              answer: answer.answer,
              uncertain: false,
            };
          }
        }
        return answer;
      });

      return { answers: updatedAnswers };
    });
  };
  return (
    <>
      {Questions ? (
        <>
          <QuizResultModal {...{ isOpenInfoModal, closeInfoModal, score }} />
          <form className="mt-2 overflow-x-auto border-2 rounded-md lg:p-3 xl:p-3">
            <Stepper
              {...{
                questionsData,
                answeredQuestions,
                setSearchParams,
                clearSelectedValue,
                selectedAnswersCount,
                allAnswers,
              }}
            />

            <div className="mx-5 ">
              <div className="flex items-center justify-between gap-5">
                <h3 className="w-full py-2 font-bold text-center text-white bg-red-500 rounded-md text-md xl:text-xl lg:text-lg ">
                  {Questions?.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2 mt-5 text-lg font-bold tracking-wider md:grid-cols-2">
                {radioButtons.map(({ answer, forId }: IRadioButtons) => (
                  <label
                    htmlFor={forId}
                    className={`flex font-bold ${
                      answeredQuestions.includes(Questions?._id) &&
                      rightAnswers[questionNumber] === answer
                        ? "border-green-600"
                        : ""
                    } text-black border-4 py-2  rounded-full px-5 items-center hover:bg-blue-400  group duration-500 transition-all inputWrapper`}
                  >
                    <div className="size-7 rounded-full flex justify-center items-center border-2 group-hover:text-white group-hover:bg-black text-[12px] md:text-[15px] char">
                      {answer}
                    </div>
                    <input
                      type="radio"
                      id={forId}
                      name="questions"
                      onChange={(e) => handleChangeAnswers(e)}
                      value={answer}
                      className="hidden"
                    />
                    <span className="text-[12px] md:text-[15px] text-center m-auto ">
                      {Questions?.options?.[answer]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex mt-4 mb-8 justify-evenly">
              <Button
                type="button"
                onClick={handlePrevQuestion}
                variant={"primary"}
                className={`uppercase ${questionNumber <= 0 ? "hidden" : ""}`}
              >
                Back
              </Button>
              {!rightAnswers[questionNumber] && (
                <button
                  onClick={handleUncertain}
                  type="button"
                  className={`bg-[#D1BA59] text-black px-4 text-md h-10 rounded-md font-extrabold  uppercase `}
                >
                  Uncertain
                </button>
              )}
              <SubmitButton
                {...{
                  questionNumber,
                  questionsData,
                  rightAnswers,
                  isLoading,
                  onButtonClick,
                }}
              />
              <Button
                type="button"
                onClick={handleNextQuestion}
                variant={"secondary"}
                className={`uppercase ${
                  questionNumber + 1 === questionsData?.data?.questions?.length
                    ? "hidden"
                    : ""
                }`}
              >
                Next
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col h-[70vh] justify-center items-center">
          <Loader className="animate-spin" size={150} color="#C5D86D" />
          <h4 className="mt-2 text-2xl font-bold tracking-widest">
            loading Questions...
          </h4>
        </div>
      )}
    </>
  );
}

export default ExamQuestions;
