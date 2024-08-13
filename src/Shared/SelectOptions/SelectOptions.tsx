import quiz from "../../assets/images/quiz.png";
import questions from "../../assets/images/questions.png";
import student from "../../assets/images/student.png";

export const duration = [
  { _id: "1", title: "1" },
  { _id: "5", title: "5" },
  { _id: "10", title: "10" },
  { _id: "20", title: "20" },
  { _id: "30", title: "30" },
  { _id: "40", title: "40" },
  { _id: "50", title: "50" },
  { _id: "60", title: "60" },
  { _id: "70", title: "70" },
  { _id: "80", title: "80" },
];

export const questions_number = [
  { _id: "1", title: "1" },
  { _id: "2", title: "2" },
  { _id: "3", title: "3" },
  { _id: "4", title: "4" },
  { _id: "5", title: "5" },
  { _id: "6", title: "6" },
  { _id: "7", title: "7" },
  { _id: "8", title: "8" },
  { _id: "9", title: "9" },
  { _id: "10", title: "10" },
];

export const type = [
  { _id: "FE", title: "FE" },
  { _id: "BE", title: "BE" },
];

export const Answers = [
  { _id: "A", title: "A" },
  { _id: "B", title: "B" },
  { _id: "C", title: "C" },
  { _id: "D", title: "D" },
];

export const radioButtons = [
  { forId: "optionA", answer: "A" },
  { forId: "optionB", answer: "B" },
  { forId: "optionC", answer: "C" },
  { forId: "optionD", answer: "D" },
];

export const difficulty = [
  { _id: "easy", title: "Easy" },
  { _id: "medium", title: "Medium" },
  { _id: "hard", title: "Hard" },
];

export const List = [
  {
    icon: quiz,
    text: "SetUpAnewQuiz",
    className: "w-10 sm:w-12 lg:w-14",
    path: "",
  },
  {
    icon: questions,
    text: "QuestionBank",
    className: "w-10 sm:w-12 lg:w-14",
    path: "/dashboard/questions",
  },
  {
    icon: student,
    text: "students",
    className: "w-12 md:w-20",
    path: "/dashboard/student",
  },
];
