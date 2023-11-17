 export type syllabus = {
  week: number;
  content: string;
  topic: string;
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

export type BasicCourseProps = {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  enrollmentStatus: string;
  prerequisites: string[];
}

export type EnrolledCourse = {
  _id: string;
  completed: boolean;
  completedAt: string;
  description: string;
  dueDate: string;
  enrolledAt: string;
  instructor: string;
  name: string;
  progress: number;
  thumbnail: string;
}
