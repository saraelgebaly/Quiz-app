export interface IGroupsList {
  _id: string;
  name: string;
  max_students: number;
}
export interface IGroups {
  name: string;
  students: string[];
}

export interface IGroupResponse {
  data: {
    name: string;
    students: string[];
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    instructor: string;
    max_students: number;
    __v: number;
  };
  message: string;
}



export interface IGroupStudents {
  _id: string;
  first_name: string;
  last_name: string;
}
