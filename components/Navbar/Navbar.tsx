'use client'
import styles from './Navbar.module.css';
import { useSyncExternalStore } from 'react';
import store from "@/redux/store";

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
          <li>Login</li>
        }
      </ul>
    </nav>
  )
};

export default Navbar;