const apiEndpoints = {
  signup: process.env.NEXT_PUBLIC_API+'/api/signup',
  signin: process.env.NEXT_PUBLIC_API+'/api/signin',
  courses: process.env.NEXT_PUBLIC_API+'/api/courses',
  specificCourse: (id:string) => process.env.NEXT_PUBLIC_API+`/api/courses/${id}`,
  specificCourseSignin: (userId:string, courseId:string ) => process.env.NEXT_PUBLIC_API+`/api/user/${userId}/courses/${courseId}`,
  enrollCourse: (courseId:string, userId:string) => process.env.NEXT_PUBLIC_API+`/api/courses/${courseId}/enroll/${userId}`,
  getEnrolled: process.env.NEXT_PUBLIC_API +'/api/user/getEnrolled',
  markAsCompleted: (userId:string, courseId:string) => process.env.NEXT_PUBLIC_API+`/api/user/${userId}/courses/${courseId}/mark-as-completed`,
  createCourse: process.env.NEXT_PUBLIC_API+'/api/admin/courses/create',
  search: (query:string) => process.env.NEXT_PUBLIC_API+`/api/courses/search?q=${query}`,
};

export default apiEndpoints;
