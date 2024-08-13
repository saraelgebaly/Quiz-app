export interface ITopFiveStudents {
  _id: string;
  first_name: string;
  last_name: string;
  avg_score: number;
  group: {
    createdAt: string;
    instructor: string;
    max_students: number;
    name: string;
    status: string;
    students: string[];
    updatedAt: string;
    __v: 0;
    _id: string;
  };
}

export interface IAllStudents {
  _id: string;
  first_name: string;
  last_name: string;
}
