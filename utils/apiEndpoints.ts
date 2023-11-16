const apiEndpoints = {
  signup: process.env.NEXT_PUBLIC_API+'/api/signup',
  signin: process.env.NEXT_PUBLIC_API+'/api/signin',
  courses: process.env.NEXT_PUBLIC_API+'/api/courses',
  specificCourse: (id:string) => process.env.NEXT_PUBLIC_API+`/api/courses/${id}`,
};

export default apiEndpoints;