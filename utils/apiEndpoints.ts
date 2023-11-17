const apiEndpoints = {
  signup: process.env.NEXT_PUBLIC_API+'/api/signup',
  signin: process.env.NEXT_PUBLIC_API+'/api/signin',
  courses: process.env.NEXT_PUBLIC_API+'/api/courses',
  specificCourse: (id:string) => process.env.NEXT_PUBLIC_API+`/api/courses/${id}`,
  specificCourseSignin: (userId:string, courseId:string ) => process.env.NEXT_PUBLIC_API+`/api/user/${userId}/courses/${courseId}`,
};

export default apiEndpoints;
