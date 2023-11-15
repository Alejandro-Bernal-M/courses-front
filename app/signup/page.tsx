'use client'
import { useState } from "react";
import toast from "react-hot-toast";
import apiEndpoints from "@/utils/apiEndpoints";
import axios from "axios";

type SignupProps = {
  firstName: FormDataEntryValue;
  lastName: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  adminPassword?: FormDataEntryValue;
  role?: string;
};

const Signup = () => {
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
        form.reset();
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.message || 'Something went wrong');
      });
      

  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {admin && (
          <p>Creating admin profile</p>
          )}
        <input type="text" name="firstName" placeholder="first name" />
        <input type="text" name="lastName" placeholder="last name" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="password" name="passwordConfirmation" placeholder="confirm password" />
        {admin && (
          <>
              <input type="password" name="adminPassword" placeholder="admin password" />
              <input type="text" name="role" value='admin' hidden readOnly />
            </>
          )
        }
        <input type="submit" value="Submit"/>
      </form>
      <button onClick={() => setAdmin(!admin)}>{admin ? "Register as user": "Register as admin"}</button>
    </section>
  );
};

export default Signup;