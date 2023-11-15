'use client'
import styles from './Navbar.module.css';
import { useSyncExternalStore } from 'react';
import store from "@/redux/store";
import Link from 'next/link';

const Navbar = () => {
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const { user } = myStore;


  return(
    <nav className={styles.nav}>
      <div>
        <h1>Get Knowledge</h1>
      </div>
      <ul className={styles.ul}>
        <li>Courses</li>
        {user.isLogged ?
          (
            <>
              <li>Dashboard</li>
              <li>Logout</li>
            </>
          )
          :
          (
            <>
              <li>Signin</li>
              <li><Link href='/signup' >Signup </Link></li>
            </>
          )
        }
      </ul>
    </nav>
  )
};

export default Navbar;