'use client'

import styles from "./page.module.css"
import { useState } from "react";
import toast from "react-hot-toast";
import apiEndpoints from "@/utils/apiEndpoints";
import axios from "axios";
import { useDispatch } from "react-redux";
import {signin} from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

type SignupProps = {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  adminPassword?: FormDataEntryValue;
  role?: string;
};

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const passwordConfirmation = formData.get('passwordConfirmation');

    if(!firstName || !lastName || !email || !password || !passwordConfirmation){
      toast.error('Please fill all fields');
      return;
    }

    if(password !== passwordConfirmation){
      toast.error('Passwords do not match');
      return;
    }
    
    const body: SignupProps = {
      firstName,
      lastName,
      email,
      password,
    };
    
    if(admin){
      const { adminPassword } = Object.fromEntries(formData.entries());
      body.adminPassword = adminPassword;
      body.role = 'admin';
    }
    
    axios.post(apiEndpoints.signup, body)
      .then(res => {
        console.log(res);
        toast.success('User created successfully');
        dispatch(signin(res.data))
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('user', JSON.stringify(res.data.user));
        form.reset();
        router.push('/');
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.message || 'Something went wrong');
      });
      

  };
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Signup</h2>
        {admin && (
          <p className={styles.alert}>Creating admin profile</p>
          )}
        <input type="text" name="firstName" placeholder="first name" className={styles.input} />
        <input type="text" name="lastName" placeholder="last name" className={styles.input} />
        <input type="email" name="email" placeholder="email" className={styles.input} />
        <input type="password" name="password" placeholder="password" className={styles.input} />
        <input type="password" name="passwordConfirmation" placeholder="confirm password" className={styles.input} />
        {admin && (
          <>
              <input type="password" name="adminPassword" placeholder="admin password" className={styles.input} />
              <input type="text" name="role" value='admin' hidden readOnly />
            </>
          )
        }
        <input type="submit" value="Submit" className="button"/>
      </form>
      <button onClick={() => setAdmin(!admin)} className="button" >{admin ? "Register as user": "Register as admin"}</button>
    </section>
  );
};

export default Signup;