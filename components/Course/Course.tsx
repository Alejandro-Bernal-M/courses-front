import type { BasicCourseProps } from '@/types/course'
import styles from './course.module.css'
import { useSyncExternalStore } from "react";
import store from "@/redux/store";

function Course({
    _id,
    description,
    enrollmentStatus,
    name,
    prerequisites,
    thumbnail,
  }: BasicCourseProps) {
  
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const userStore = myStore.user;
  const loggedIn = userStore.isLogged;

  const handleViewDetails = (id:string) => {
    console.log('id', id)
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