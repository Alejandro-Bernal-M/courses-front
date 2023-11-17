'use client'

import styles from './page.module.css'
import { getCourses } from "@/redux/slices/coursesSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useSyncExternalStore } from "react";
import store from "@/redux/store";
import Course from "@/components/Course/Course";
import type { BasicCourseProps } from '@/types/course'
import { FaSearch } from "react-icons/fa";
import { searchCourses} from "@/redux/slices/coursesSlice";

function Courses() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const courseStore= myStore.courses;
  const courses = courseStore.courses;

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleSearch = () => {
    if(search === ''){
      return;
    }
    let query = search.trim()
    if(statusValue !== ''){
      query += `&enrollmentStatus=${statusValue}`;
    }
    dispatch(searchCourses(query));
  };

  const handleClean = () => {
    setSearch('');
    setStatus(false);
    setStatusValue('');
    dispatch(getCourses());
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>All our courses</h1>
      <div className={styles.searchDiv}>
        <p className={styles.searchP}>Search <FaSearch /> </p>
        <div className={styles.searchDivDiv}>
          {status ? 
            (<select name="status" defaultValue={""} className={styles.input} onChange={(e) => setStatusValue(e.target.value)}>
              <option value="" className={styles.input}>Select status</option>
              <option value="Open" className={styles.input}>Open</option>
              <option value="Closed" className={styles.input}>Closed</option>
              <option value="InProgress" className={styles.input}>In progress</option>
            </select>)
            : 
            null 
          }
          <button className='button' onClick={() => setStatus(!status)} >{status ? 'Without status': 'With status'}</button>
        </div>
        <div className={styles.searchDivDiv}>
          <input type="text" placeholder="Course name or instructor" className={styles.search} value={search} onChange={(e) => {setSearch(e.target.value)}} />
          <button className='button' onClick={handleSearch}>Search</button>
          <button className='button' onClick={handleClean}>Clean</button>
        </div>
      </div>
      <div className={styles.coursesHolder}>
        {courses.length === 0 && <h2 className={styles.title}>No courses found</h2>}
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