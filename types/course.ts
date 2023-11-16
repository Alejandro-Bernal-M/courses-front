 export type syllabus = {
  week: number;
  content: string;
}

export type CourseProps ={
  _id: string;
  description: string;
  duration: string;
  enrollmentStatus: string;
  instructor: string;
  location: string;
  name: string;
  prerequisites: string[];
  schedule: string;
  thumbnail: string;
  syllabus?: syllabus[];
}