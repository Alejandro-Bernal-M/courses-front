'use client'

import toast from "react-hot-toast";
import apiEndpoints from "@/utils/apiEndpoints";
import axios from "axios";
import { useDispatch } from "react-redux";
import {signin} from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

type SigninProps = {
  email: FormDataEntryValue;
  password: FormDataEntryValue;
};

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let form = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if(!email || !password ){
      toast.error('Please fill all fields');
      return;
    }
    
    const body: SigninProps = {
      email,
      password,
    };
    

    axios.post(apiEndpoints.signin, body)
      .then(res => {
        console.log(res);
        dispatch(signin(res.data))
        toast.success('Signin successfully');
        form.reset();
        router.push('/');
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('user', JSON.stringify(res.data.user));
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.message || 'Something went wrong');
      });
      

  };
    return (
      <section>
      <form onSubmit={handleSubmit}>
        <h1>Signin</h1>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Submit"/>
      </form>
    </section>
    );
};

export default Signin;