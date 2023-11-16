import type { CourseProps } from '@/types/course'
import styles from './course.module.css'

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
    <div className={styles.courseHolder}>
      <h2 className={styles.courseTitle}>{name}</h2>
      <div className={styles.infoHolder}>
        <div className={styles.imgHolder}>
          <img src={`${process.env.NEXT_PUBLIC_API}/public/${thumbnail}`} alt="" />
        </div>
        <div className={styles.courseContent}>
          <p className={styles.description}>{description}</p>
          <p> Duration: {duration}</p>
          <p> Status: {enrollmentStatus}</p>
          <p> Instructor:{instructor}</p>
          <p> Location: {location}</p>
          <p> Schedule: {schedule}</p>
          <p>Prerequisites:</p>
          <ul className={styles.prerequisitesUl}>
            {prerequisites.map((prerequisite) => (
              <li className={styles.prerequisitesLi}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.buttonsHolder}>
        <button className='button' >View Details</button>
      </div>
    </div>
  )
}

export default Course