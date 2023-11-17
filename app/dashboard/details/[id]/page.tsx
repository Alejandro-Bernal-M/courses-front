'use client'
import styles from './page.module.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {ThunkDispatch} from '@reduxjs/toolkit'
import { useSyncExternalStore } from 'react'
import store from '@/redux/store'
import { getSpecificCourseSignin } from '@/redux/slices/coursesSlice'
import { MdExpandMore } from "react-icons/md";
import toast from 'react-hot-toast'
import { FaSpinner } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { markAsCompleted } from '@/utils/commonFunction'

function page({params}: {params: {id: string}}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const courseStore= myStore.courses;
  const loading = courseStore.loading;
  const course =courseStore.course;
  const userStore = myStore.user;
  const isLogged = userStore.isLogged;
  const [expanded, setExpanded] = useState(false);
  let completedAt = undefined;
  let dueDate = undefined;
  let enrolledAt = undefined;
  const [counter, setCounter] = useState(0);

  if(course.completedAt){
    completedAt = new Date(course.completedAt).toDateString();
  }

  if(course.dueDate){
    dueDate = new Date(course.dueDate).toDateString();
  }

  if(course.enrolledAt){
    enrolledAt = new Date(course.enrolledAt).toDateString();
  }

  useEffect(() => {
    dispatch(getSpecificCourseSignin({userId: userStore.id, courseId: params.id, token: userStore.token}));
  }, [dispatch, counter]);

  const handleExpand = () => {
    if(!isLogged){
      toast.error('Login to see details');
      return;
    }else {
      setExpanded(!expanded);
    }
  };

  const handleComplete =async() => {
    const response = await markAsCompleted(userStore.id, course._id, userStore.token);
    if(response == 1){
      setCounter(counter + 1);
    }
  };

  return (
    <section className={styles.section}>
      {!loading ? (<div className={styles.courseHolder}>
        <h1 className={styles.courseTitle}>{course.name}</h1>
        <div className={styles.infoHolder}>
          <div className={styles.imgHolder}>
            <img src={`${process.env.NEXT_PUBLIC_API}/public/${course.thumbnail}`} alt="" />
          </div>
          <div className={styles.courseContent}>
            <div className={styles.completedDiv}>
              {course.completed ? 
                <>
                  <p className={styles.completedP}>
                    Completed <FaCheckCircle className={styles.icon}/> 
                  </p>
                  <p>
                    Completed at: {completedAt}
                  </p>
                </>
                : 
                <>
                  <p className={styles.completedP}>
                    In progress <FaSpinner className={styles.icon}/> 
                  </p>
                  <p>
                    Due date: {dueDate}
                  </p>
                </>
                }
            </div>
            <p>Enrolled at: {enrolledAt}</p>
            <div className={styles.progressContainer}>
              <p>Progress:</p>
              <p>{course.progress?.toFixed(1)}%</p>
              <div className={styles.progressBar} style={{ width: `${course.progress}%` }}></div>
            </div>
            <p className={styles.description}>{course.description}</p>
            <p>Schedule: {course.schedule} </p>
            <p>Location: {course.location} </p>
            <p>Instructor: {course.instructor} </p>
            <p>Prerequisites:</p>
            <ul className={styles.prerequisitesUl}>
              {course.prerequisites.map((prerequisite, index) => (
                <li key={index} className={styles.prerequisitesLi}>{prerequisite}</li>
              ))}
            </ul>
            <button className='button' onClick={handleExpand}>Syllabus <MdExpandMore className={styles.expandIcon} /></button>
            { expanded && course.syllabus &&(
              <div  className={styles.syllabusHolder}>
                  {course.syllabus.map((syllabusItem, index) => (
                      <ul key={index} className={styles.syllabusUl}>
                        <li className={styles.syllabusLi}> 
                          <div className={styles.syllabusDiv}>
                            <p>Week {syllabusItem.week}</p>
                            <p>Topic: {syllabusItem.topic}</p>
                            <p>Content: {syllabusItem.content}</p>
                          </div>
                        </li>
                      </ul>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttonsHolder}>
          {course.completed ? null: <button className='button' onClick={handleComplete} >Mark as completed</button>}
        </div>
      </div>):
      (<div className={styles.loading}>Loading...</div>)}
    </section>
  )
}

export default page