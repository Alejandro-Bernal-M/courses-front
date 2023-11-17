'use client'
import styles from './page.module.css'
import { useEffect, useSyncExternalStore } from 'react'
import { useDispatch } from 'react-redux'
import { getenrolledCourses } from '@/redux/slices/userSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import store from '@/redux/store'
import EnrolledCourse from '@/components/EnrolledCourse/EnrolledCourse'

function Dashboard() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const userStore = myStore.user;
  const enrolledCourses = userStore.enrolledCourses;

  useEffect(() => {
    dispatch(getenrolledCourses(userStore.token));
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Enrolled Courses</h1>
      <div className={styles.coursesHolder}>
        {enrolledCourses.map((course: any) => (
          <EnrolledCourse key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

export default Dashboard