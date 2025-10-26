import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { login, signup, logout, getSession } from "../services/api.js";
import { makeError } from "../utils/errors.js";
import { MSG_SESSION_EXPIRED } from "../utils/constants.js";

const AuthContext = createContext(null);

function setPolite(msg){
  const n = document.getElementById("toast-live-polite");
  if(n) n.textContent = msg;
}
function setAssertive(msg){
  const n = document.getElementById("toast-live-assertive");
  if(n) n.textContent = msg;
}

export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(()=>{
    try {
      const session = getSession();
      setUser({ email: session.email });
    } catch {
      setUser(null);
    } finally {
      setHydrated(true);
    }
  },[]);

  const loginUser = useCallback(async ({email,password})=>{
    try{
      const res = await Promise.resolve(login({email,password}));
      setUser({email:res.email});
      const msg="Logged in successfully.";
      toast.success(msg,{role:"alert"});
      setPolite(msg);
      return {ok:true,email:res.email};
    }catch(err){
      return {ok:false,error:err};
    }
  },[]);

  const signupUser = useCallback(async ({email,password})=>{
    try{
      const res = await Promise.resolve(signup({email,password}));
      setUser({email:res.email});
      const msg="Account created.";
      toast.success(msg,{role:"alert"});
      setPolite(msg);
      return {ok:true,email:res.email};
    }catch(err){
      return {ok:false,error:err};
    }
  },[]);

  const logoutUser = useCallback(async ()=>{
    try{ await Promise.resolve(logout()); }catch{}
    setUser(null);
    const msg="Signed out.";
    toast.success(msg,{role:"alert"});
    setPolite(msg);
  },[]);

  const requireSessionExpired = useCallback(()=>{
    setUser(null);
    setAssertive(MSG_SESSION_EXPIRED);
    toast.error(MSG_SESSION_EXPIRED,{role:"alert"});
  },[]);

  return (
    <AuthContext.Provider value={{
      user,
      hydrated,
      loginUser,
      signupUser,
      logoutUser,
      requireSessionExpired
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if(!ctx){
    throw makeError("AUTH_ERROR","useAuth must be used within <AuthProvider />");
  }
  return ctx;
}
