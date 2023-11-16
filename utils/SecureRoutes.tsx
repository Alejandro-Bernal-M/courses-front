'use client'
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSyncExternalStore } from "react";
import store from "@/redux/store";
import { signin } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";

const RouteSecurity = ({ children }: {children: React.ReactNode}) => {
  const dispatch = useDispatch();
  if(typeof window !== 'undefined'){
    const userObject = localStorage.getItem('user') || null;
    const token = localStorage.getItem('token') || null;
    if(userObject && token){
      dispatch(signin({user: JSON.parse(userObject), token: JSON.parse(token)}));
    }
  }
  
  const { push } = useRouter();
  const pathname = usePathname();
  const myStore = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  const loggedInUser = myStore.user.isLogged;

  const permitedRoutes = ["/", "/signin", "/signup"];
  const restrictedSignedInRoutes = ["/signin", "/signup"];

  useEffect(() => {
    if ( !permitedRoutes.includes(pathname)  && !loggedInUser) {
      toast.error("Please login first");
      push("/");
    }
    if (restrictedSignedInRoutes.includes(pathname) && loggedInUser) {
      toast.success("You are already logged In");
      push("/");
    }
  }, [pathname, loggedInUser]);

  return <>{children}</>;
};


export default RouteSecurity;
