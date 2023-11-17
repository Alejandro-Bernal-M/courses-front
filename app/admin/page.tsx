'use client'
import styles from './page.module.css'
import { useState } from 'react'

function Admin() {
  const [numberOfPreRequisites, setNumberOfPreRequisites] = useState(0);
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const handlePreRequisites = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPreRequisites(+e.target.value);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfWeeks(+e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  };
  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
          <h2>Syllabus</h2>
          {
            Array.from({ length: numberOfWeeks }, (_, index) => (
              <div key={index} className={styles.div}>
                <h3>Week {index + 1}</h3>
                <input name={`topic ${index}`} type="text" placeholder={`Topic ${index + 1}`} className={styles.input} />
                <input name={`content ${index}`} type="text" placeholder={`Content ${index + 1}`}  className={styles.input}/>
              
              </div>
            ))
          }
        </div>
      </form>
    </section>
  )
}

export default Admin