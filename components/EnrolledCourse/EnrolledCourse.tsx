import styles from './enrolledCourse.module.css'
import type { EnrolledCourse } from '@/types/course'
import { FaSpinner } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

function EnrolledCourse({
  course
}: {
  course: EnrolledCourse
}) {
  const dueDate = new Date(course.dueDate);

  return (
    <div className={styles.courseHolder}>
      <div className={styles.imgHolder}>
        <img src={`${process.env.NEXT_PUBLIC_API}/public/${course.thumbnail}`} alt={course.name} />
      </div>
      <div className={styles.courseInfo} >
        <h2 className={styles.courseName}>{course.name}</h2>
        <p>Instructor: {course.instructor}</p>
        <p>Due date: {course.completed ? 'Finished': dueDate.toDateString()}</p>
        <div className={styles.progressContainer}>
          <p>Progress:</p>
          <p>{course.progress}%</p>
          <div className={styles.progressBar} style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>
      <div className={styles.progressInfo}>
        <div className={styles.completedDiv}>
          {course.completed ? 
            <p className={styles.completedP}>
              Completed <FaCheckCircle className={styles.icon}/> 
            </p>
            : 
            <p className={styles.completedP}>
              In progress <FaSpinner className={styles.icon}/> 
            </p>
            }
        </div>
        <button className='button'>Details</button>
        {course.completed ? null: <button className='button' >Mark as completed</button>}
      </div>
    </div>
  )
}

export default EnrolledCourse