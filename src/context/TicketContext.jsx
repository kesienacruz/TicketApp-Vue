import React, { createContext, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import { createTicket, updateTicket } from "../services/ticketsService.js";
import { makeError } from "../utils/errors.js";

const TicketContext = createContext(null);

function setPolite(msg){
  const n = document.getElementById("toast-live-polite");
  if(n) n.textContent = msg;
}

export function TicketProvider({children}){
  const createT = useCallback(async ({title,description,status})=>{
    try{
      const t = await createTicket({title,description,status});
      const msg="Ticket created.";
      toast.success(msg,{role:"alert"});
      setPolite(msg);
      return t;
    }catch(err){
      throw err;
    }
  },[]);

  const updateT = useCallback(async ({id,title,description,status})=>{
    try{
      await updateTicket({id,title,description,status});
      const msg="Ticket updated.";
      toast.success(msg,{role:"alert"});
      setPolite(msg);
      return true;
    }catch(err){
      throw err;
    }
  },[]);

  return (
    <TicketContext.Provider value={{createTicket:createT,updateTicket:updateT}}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicketsApi(){
  const ctx = useContext(TicketContext);
  if(!ctx){
    throw makeError("AUTH_ERROR","useTicketsApi must be used within <TicketProvider />");
  }
  return ctx;
}
