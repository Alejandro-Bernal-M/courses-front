'use client'
import styles from './page.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createCourse} from '@/redux/slices/coursesSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useSyncExternalStore } from 'react';
import store from '@/redux/store';
import toast from 'react-hot-toast';

function Admin() {
  const [numberOfPreRequisites, setNumberOfPreRequisites] = useState(0);
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const [numberOfkeywords, setNumberOfKeywords] = useState(0);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const token = myStore.user.token;

  const handlePreRequisites = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPreRequisites(+e.target.value);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfWeeks(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const description = formData.get('description');
    const instructor = formData.get('instructor');
    const schedule = formData.get('schedule');
    const location = formData.get('location');
    const enrollmentStatus = formData.get('enrollmentStatus');
    const thumbnail = formData.get('thumbnail');
    const duration = formData.get('duration') + ' weeks';
    const prerequisites = Array.from({ length: numberOfPreRequisites }, (_, index) => formData.get(`prerequisite ${index}`));
    const syllabus = Array.from({ length: numberOfWeeks }, (_, index) => ({
      week: index + 1,
      topic: formData.get(`topic ${index}`),
      content: formData.get(`content ${index}`),
    }));
    const keywords = Array.from({ length: numberOfkeywords }, (_, index) => formData.get(`keyword ${index}`));
    if(!name || !description || !instructor || !schedule || !location || !enrollmentStatus || !thumbnail || !duration || !prerequisites || !syllabus){
      toast.error('Please fill all fields');
      return;
    }
    formData.set('duration', duration);
    formData.set('prerequisites', JSON.stringify(prerequisites));
    formData.set('syllabus', JSON.stringify(syllabus));
    formData.set('keywords', JSON.stringify(keywords));
    try {
      dispatch(createCourse({formData, token}));
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('something went wrong')
    }
  };
  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <h1>Add courses</h1>
        <input name="name" type="text" placeholder="name" className={styles.input} />
        <textarea name ="description" placeholder="description" className={styles.input}/>
        <input name="instructor" type="text" placeholder="instructor"  className={styles.input}/>
        <input name="schedule" type="text" placeholder="Schedule" className={styles.input}/>
        <input name="location" type="text" placeholder="Location" className={styles.input}/>
        <label htmlFor="" className={styles.label}>
          <span>Enrollment Status</span>
          <select name="enrollmentStatus" defaultValue="Open" className={styles.input}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="InProgress">In progess</option>
          </select>
        </label>
        <label htmlFor="thumbanil" className={styles.label}>
          <span>Thumbnail</span>
          <input name="thumbnail" type="file" className={styles.input} />
        </label>
        <label htmlFor="duration" className={styles.label}>
          <span>Duration</span>
          <input type="Number" name="duration" min={1} max={20} onChange={(e) => handleDuration(e)} placeholder='number of weeks' className={styles.input}/>
        </label>
        <div className={styles.div}>
          <h2>Pre-requisites</h2>
          <input type="number" onChange={(e) => handlePreRequisites(e)} className={styles.input} min={0} placeholder='number of prerequisites' />
          {
            Array.from({ length: numberOfPreRequisites }, (_, index) => (
              <input key={index} name={`prerequisite ${index}`} type="text" placeholder={`Pre-requisite ${index + 1}`} className={styles.input}/>
            ))
          }
        </div>
        <div className={styles.div}>
          <h2>Keywords</h2>
          <input type="number" onChange={(e) => setNumberOfKeywords(+e.target.value)} className={styles.input} min={0} placeholder='number of keywords' />
          {
            Array.from({ length: numberOfkeywords }, (_, index) => (
              <input key={index} name={`keyword ${index}`} type="text" placeholder={`Keyword ${index + 1}`} className={styles.input}/>
            ))
          }
        </div>
        <div className={styles.div}>
          <h2>Syllabus</h2>
          {
            Array.from({ length: numberOfWeeks }, (_, index) => (
              <div key={index} className={styles.div}>
                <h3>Week {index + 1}</h3>
                <input name={`week ${index + 1}`} type="text" hidden readOnly value={index + 1}/>
                <input name={`topic ${index}`} type="text" placeholder={`Topic ${index + 1}`} className={styles.input} />
                <input name={`content ${index}`} type="text" placeholder={`Content ${index + 1}`}  className={styles.input}/>
              </div>
            ))
          }
        </div>
        <input type="submit" value="Submit" className="button" />
      </form>
    </section>
  )
}

export default Admin