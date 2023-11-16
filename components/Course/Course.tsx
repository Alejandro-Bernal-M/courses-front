import type { BasicCourseProps } from '@/types/course'
import styles from './course.module.css'
import { useRouter } from 'next/navigation';

function Course({
  _id,
  description,
  enrollmentStatus,
  name,
  prerequisites,
  thumbnail,
}: BasicCourseProps) {
  
  const { push } = useRouter();
  
  const handleViewDetails = (id:string) => {
    push(`/courses/${id}`)
  };

  return (
    <div className={styles.courseHolder}>
      <h2 className={styles.courseTitle}>{name}</h2>
      <div className={styles.infoHolder}>
        <div className={styles.imgHolder}>
          <img src={`${process.env.NEXT_PUBLIC_API}/public/${thumbnail}`} alt="" />
        </div>
        <div className={styles.courseContent}>
          <p className={styles.description}>{description}</p>
          <p> Status: {enrollmentStatus}</p>
          <p>Prerequisites:</p>
          <ul className={styles.prerequisitesUl}>
            {prerequisites.map((prerequisite) => (
              <li className={styles.prerequisitesLi}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.buttonsHolder}>
        <button className='button' onClick={() => handleViewDetails(_id)} >View Details</button>
      </div>
    </div>
  )
}

export default Course