import { RightAnswers } from "../Shared/TypeOfRightAnswers/RightAnswers";

export interface IEditQuestion {
  answer: typeof RightAnswers;
}

export interface IQuestions {
  title: string;
  description: string;
  answer: typeof RightAnswers;
  difficulty: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  };
  type: string;
  _id: string;
}

export interface ICreateQuestions {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: typeof RightAnswers;
  difficulty: string;
  type: string;
}

export interface IQuestionResponse {
  data: {
    answer: string;
    createdAt: string;
    description: string;
    difficulty: string;
    instructor: string;
    options: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    points: number;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  message: string;
}
