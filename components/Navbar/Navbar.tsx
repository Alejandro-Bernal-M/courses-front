'use client'
import styles from './Navbar.module.css';
import { useSyncExternalStore } from 'react';
import store from "@/redux/store";
import Link from 'next/link';
import { logout } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';


const Navbar = () => {
  const dispatch = useDispatch();

  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const { user } = myStore;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
  };
  return(
    <nav className={styles.nav}>
      <div>
        <h1>Get Knowledge</h1>
      </div>
      <ul className={styles.ul}>
        <li><Link href="/courses" >Courses </Link></li>
        {user.isLogged ?
          (
            <>
              <li>Dashboard</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )
          :
          (
            <>
              <li><Link href='/signin' >Signin</Link></li>
              <li><Link href='/signup' >Signup </Link></li>
            </>
          )
        }
      </ul>
    </nav>
  )
};

export default Navbar;