export interface IResultsResponse {
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
export interface IParticipants {
  score: number;
  started_at: string;
}
