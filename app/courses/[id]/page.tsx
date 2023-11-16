'use client'
import styles from './page.module.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {ThunkDispatch} from '@reduxjs/toolkit'
import { useSyncExternalStore } from 'react'
import store from '@/redux/store'
import { getSpecificCourse } from '@/redux/slices/coursesSlice'

function page({params}: {params: {id: string}}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const courseStore= myStore.courses;
  const loading = courseStore.loading;
  const course =courseStore.course;

  useEffect(() => {
    dispatch(getSpecificCourse(params.id));
  }, [dispatch]);

  return (
    <section className={styles.section}>
      {!loading ? (<div className={styles.courseHolder}>
        <h1 className={styles.courseTitle}>{course.name}</h1>
        <div className={styles.infoHolder}>
          <div className={styles.imgHolder}>
            <img src={`${process.env.NEXT_PUBLIC_API}/public/${course.thumbnail}`} alt="" />
          </div>
          <div className={styles.courseContent}>
            <p className={styles.description}>{course.description}</p>
            <p>Status: {course.enrollmentStatus}</p>
            <p>Duration: {course.duration} </p>
            <p>Schedule: {course.schedule} </p>
            <p>Location: {course.location} </p>
            <p>Instructor: {course.instructor} </p>
            <p>Prerequisites:</p>
            <ul className={styles.prerequisitesUl}>
              {course.prerequisites.map((prerequisite) => (
                <li className={styles.prerequisitesLi}>{prerequisite}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.buttonsHolder}>
          <button className='button'>Enroll</button>
        </div>
      </div>):
      (<div>Loading...</div>)}
    </section>
  )
}

export default page