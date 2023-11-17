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
    if(userStore.role !== 'user'){
      return;
    }
    dispatch(getenrolledCourses(userStore.token));
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Enrolled Courses</h1>
      <div className={styles.coursesHolder}>
        {enrolledCourses.length > 0 && userStore.role == 'user' ? (enrolledCourses.map((course: any) => (
          <EnrolledCourse key={course._id} course={course} />
        )))
        :
        (<h2 className={styles.title}>No courses enrolled</h2>)}
      </div>
    </section>
  )
}

export default Dashboard