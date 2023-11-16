import type { CourseProps } from '@/types/course'

function Course({
    _id,
    description,
    duration,
    enrollmentStatus,
    instructor,
    location,
    name,
    prerequisites,
    schedule, 
    thumbnail,
    syllabus 
  }: CourseProps) {

  return (
    <div>
      <h1>{name}</h1>
      {description}
      {duration}
      {enrollmentStatus}
      {instructor}
      {location}
      {prerequisites.map((prerequisite) => (
        <p>{prerequisite}</p>
      ))}
      {schedule}

      <img src={`${process.env.NEXT_PUBLIC_API}/public/${thumbnail}`} alt="" />
    </div>
  )
}

export default Course