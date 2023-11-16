'use client'

import styles from './page.module.css'
import { getCourses } from "@/redux/slices/coursesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useSyncExternalStore } from "react";
import store from "@/redux/store";
import Course from "@/components/Course/Course";
import type { BasicCourseProps } from '@/types/course'

function Courses() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const courseStore= myStore.courses;
  const courses = courseStore.courses;
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>All our courses</h1> 
      <div className={styles.coursesHolder}>
        {courses.map((course:BasicCourseProps) => (
          <Course
            key={course._id}
            _id={course._id}
            description={course.description}
            enrollmentStatus={course.enrollmentStatus}
            name={course.name}
            prerequisites={course.prerequisites}
            thumbnail={course.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}

export default Courses