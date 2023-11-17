'use client'
import styles from './navbar.module.css';
import { useSyncExternalStore } from 'react';
import store from "@/redux/store";
import Link from 'next/link';
import { logout } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const { user } = myStore;

  const handleLogout = () => {
    router.push('/');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
  };
  return(
    <nav className={styles.nav}>
      <div>
        <span className={styles.title}><Link href="/" className={styles.link}> Get Knowledge</Link></span>
      </div>
      <ul className={styles.ul}>
        <li><Link href="/courses" className={styles.link} >Courses </Link></li> 
        {user.isLogged ?
          (
            <>
              <li><Link href="/dashboard" className={styles.link} >Dashboard </Link></li> 
              <li><button onClick={handleLogout} className='button'>Logout</button></li>
            </>
          )
          :
          (
            <>
              <li><Link href='/signin' className={styles.link} >Sign in</Link></li>
              <li><Link href='/signup' className={styles.link} >Sign up </Link></li>
            </>
          )
        }
        {user.role === 'admin' && <li><Link href='/admin' className={styles.link} >Admin </Link></li>}
      </ul>
    </nav>
  )
};

export default Navbar;