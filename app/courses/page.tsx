'use client'
import { getCourses } from "@/redux/slices/coursesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useSyncExternalStore } from "react";
import store from "@/redux/store";
import Course from "@/components/Course/Course";
import type { CourseProps } from '@/types/course'


function Courses() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const courseStore= myStore.courses;
  const courses = courseStore.courses;
  console.log(courses);
  return (
    <section>
      <h1>All our courses</h1> 
      <div>
        {courses.map((course:CourseProps) => (
          <Course
            key={course._id}
            _id={course._id}
            description={course.description}
            duration={course.duration}
            enrollmentStatus={course.enrollmentStatus}
            instructor={course.instructor}
            location={course.location}
            name={course.name}
            prerequisites={course.prerequisites}
            schedule={course.schedule}
            thumbnail={course.thumbnail}
            syllabus={course.syllabus}
          />
        ))}
      </div>
    </section>
  )
}

export default Courses