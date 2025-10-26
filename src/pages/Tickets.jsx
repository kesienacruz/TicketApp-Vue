import React, { useState, useCallback, useEffect } from "react";
import LayoutShell from "../components/LayoutShell.jsx";

import TicketsList from "../components/TicketsList.jsx";
import TicketForm from "../components/TicketForm.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";

import {
  fetchTickets as svcFetchTickets,
  deleteTicket as svcDeleteTicket,
} from "../services/ticketsService.js";

import { useTicketsApi } from "../context/TicketContext.jsx";
import { toast } from "react-toastify";
import { MSG_LOAD_ERROR, MSG_DELETE_ERROR } from "../utils/constants.js";

export default function Tickets(){
  const { createTicket, updateTicket } = useTicketsApi();

  const [tickets,setTickets] = useState([]);
  const [loading,setLoading] = useState(true);
  const [loadError,setLoadError] = useState(null);

  const [showForm,setShowForm] = useState(false);
  const [mode,setMode] = useState("create");
  const [activeTicket,setActiveTicket] = useState(null);

  const [ticketToDelete,setTicketToDelete] = useState(null);

  const loadData = useCallback(async ()=>{
    setLoading(true);
    setLoadError(null);
    try{
      const data = await svcFetchTickets();
      setTickets(data||[]);
    }catch(err){
      setLoadError(MSG_LOAD_ERROR);
      toast.error(MSG_LOAD_ERROR,{role:"alert"});
      const n = document.getElementById("toast-live-assertive");
      if(n) n.textContent = MSG_LOAD_ERROR;
    }finally{
      setLoading(false);
    }
  },[]);

  useEffect(()=>{
    loadData();
  },[loadData]);

  const handleNew = useCallback(()=>{
    setMode("create");
    setActiveTicket(null);
    setShowForm(true);
  },[]);

  const handleView = useCallback((ticket)=>{
    setMode("edit");
    setActiveTicket(ticket);
    setShowForm(true);
  },[]);
  const handleEdit = useCallback((ticket)=>{
    setMode("edit");
    setActiveTicket(ticket);
    setShowForm(true);
  },[]);

  const handleSave = useCallback(async ({id,title,description,status})=>{
    if(mode==="edit" && id){
      await updateTicket({id,title,description,status});
    }else{
      await createTicket({title,description,status});
    }
    await loadData();
    setShowForm(false);
    setActiveTicket(null);
  },[mode,updateTicket,createTicket,loadData]);

  const handleDeleteRequest = useCallback((ticket)=>{
    setTicketToDelete(ticket);
  },[]);

  const handleConfirmDelete = useCallback(async ()=>{
    if(!ticketToDelete) return {ok:false};
    const id = ticketToDelete.id;

    const prev = tickets;
    const next = prev.filter(t=>t.id!==id);
    setTickets(next);

    try{
      await svcDeleteTicket(id);
      return {ok:true};
    }catch(err){
      setTickets(prev);
      toast.error(MSG_DELETE_ERROR,{role:"alert"});
      const n = document.getElementById("toast-live-assertive");
      if(n) n.textContent = MSG_DELETE_ERROR;
      return {ok:false};
    }
  },[ticketToDelete,tickets]);

  const handleCancelDelete = useCallback(()=>{
    setTicketToDelete(null);
  },[]);

  return (
    <LayoutShell>
      <section className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
          <div>
            <h1 className="text-display-md font-semibold text-text">Tickets</h1>
            <p className="text-body-sm text-text-dim">Manage and track all requests.</p>
          </div>

          <button
            onClick={handleNew}
            className="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          >
            + New Ticket
          </button>
        </header>

        <TicketsList
          tickets={tickets}
          loading={loading}
          loadError={loadError}
          onRetry={loadData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />

        {showForm && (
          <TicketForm
            mode={mode}
            initialTicket={activeTicket}
            onSave={handleSave}
            onCancel={()=>{
              setShowForm(false);
              setActiveTicket(null);
            }}
          />
        )}

        {ticketToDelete && (
          <ConfirmDeleteModal
            ticketTitle={ticketToDelete.title}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </section>
    </LayoutShell>
  );
}
