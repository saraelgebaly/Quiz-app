export interface IUpcomingQuizzes {
  _id: string;
  title: string;
  createdAt: string;
  schadule: string;
}

export interface ICompletedQuizzes {
  closed_at: string;
  code: string;
  createdAt: string;
  description: string;
  difficulty: string;
  duration: number;
  group: string;
  instructor: string;
  participants: number;
  questions: [];
  questions_number: number;
  schadule: string;
  score_per_question: number;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface IQuizzesResponse {
  data: {
    closed_at: string;
    code: string;
    createdAt: string;
    description: string;
    difficulty: string;
    duration: number;
    group: string;
    instructor: string;
    participants: number;
    questions: [];
    questions_number: number;
    schadule: string;
    score_per_question: number;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  message: string;
}

export interface ICreateQuiz {
  title: string;
  description: string;
  group: string;
  questions_number: 1;
  difficulty: string;
  type: string;
  schadule: Date;
  duration: number;
  score_per_question: number;
}

export interface IEditQuiz {
  title: string;
}

export interface IQuizzesResponse {
  participants: [];
  quiz: {
    closed_at: string;
    code: string;
    createdAt: string;
    description: string;
    difficulty: string;
    duration: number;
    group: string;
    instructor: string;
    participants: number;
    questions: [];
    questions_number: number;
    schadule: string;
    score_per_question: number;
    status: string;
    title: string;
    type: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
}

export interface IJoinQuizResponse {
  data: {
    createdAt: string;
    participant: string;
    quiz: string;
    score: number;
    started_at: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  message: string;
}
export interface ISubmitQuizResponse {
  data: {
    finished_at: string;
    participant: string;
    questions: {}[];
    quiz: string;
    score: number;
    started_at: string;
    _id: string;
  };
  message: string;
}
export interface ISubmitQuiz {
  data: {
    data: {
      finished_at: string;
      participant: string;
      questions: {}[];
      quiz: string;
      score: number;
      started_at: string;
      _id: string;
    };
    message: string;
  };
}

export interface IJoinQuiz {
  code: string;
}
