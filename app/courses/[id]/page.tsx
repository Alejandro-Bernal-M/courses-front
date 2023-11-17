'use client'
import styles from './page.module.css'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {ThunkDispatch} from '@reduxjs/toolkit'
import { useSyncExternalStore } from 'react'
import store from '@/redux/store'
import { getSpecificCourse } from '@/redux/slices/coursesSlice'
import { MdExpandMore } from "react-icons/md";
import toast from 'react-hot-toast'
import apiEndpoints from '@/utils/apiEndpoints'
import axios from 'axios'

function Page({params}: {params: {id: string}}) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const courseStore= myStore.courses;
  const loading = courseStore.loading;
  const course =courseStore.course;
  const userStore = myStore.user;
  const isLogged = userStore.isLogged;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getSpecificCourse(params.id));
  }, [dispatch]);

  const handleExpand = () => {
    if(!isLogged){
      toast.error('Login to see details');
      return;
    }else {
      setExpanded(!expanded);
    }
  };

  const handleEnroll = () => {
    if(!isLogged){
      toast.error('Login to enroll');
      return;
    }else {
      try {
        const config ={
          headers: {
            Authorization: userStore.token
          }
        };
        axios.patch(apiEndpoints.enrollCourse(params.id, userStore.id), {}, config)
        .then((res) => {
          if(res.status === 200){
            toast.success(res.data.message);
          }else{
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };
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
            <p className={styles.description}>{course.description}</p>
            <p>Status: {course.enrollmentStatus}</p>
            <p>Duration: {course.duration} </p>
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
          <button className='button' onClick={handleEnroll}>Enroll</button>
        </div>
      </div>):
      (<div className={styles.loading}>Loading...</div>)}
    </section>
  )
}

export default Page