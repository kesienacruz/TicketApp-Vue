import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import LayoutShell from "../components/LayoutShell.jsx";
import { fetchTickets } from "../services/ticketsService.js";
import circleLg from "../assets/bg-circle.svg";
import circleSm from "../assets/decor-circle.svg";
import heroWave from "../assets/hero-wave.svg";
import decorCircle from "../assets/decor-circle.svg";
import { MSG_LOAD_ERROR } from "../utils/constants.js";
import { toast } from "react-toastify";

export default function Dashboard(){
  const [tickets,setTickets] = useState([]);
  const [loadError,setLoadError] = useState(null);

  const loadStats = useCallback(async ()=>{
    setLoadError(null);
    try{
      const list = await fetchTickets();
      setTickets(list||[]);
    }catch(err){
      setLoadError(MSG_LOAD_ERROR);
      toast.error(MSG_LOAD_ERROR,{role:"alert"});
      const n = document.getElementById("toast-live-assertive");
      if(n) n.textContent = MSG_LOAD_ERROR;
    }
  },[]);

  useEffect(()=>{
    loadStats();
  },[loadStats]);

  const stats = useMemo(()=>{
    let open=0,inProg=0,closed=0;
    for(const t of tickets){
      if(t.status==="open") open++;
      else if(t.status==="in_progress") inProg++;
      else if(t.status==="closed") closed++;
    }
    return {
      open,
      in_progress: inProg,
      closed,
      total: tickets.length,
    };
  },[tickets]);

  return (
    <LayoutShell>
      <section className="space-y-8">
        <div className="relative overflow-hidden rounded-card border border-surface-border bg-surface shadow-card px-6 py-6 md:px-8 md:py-8">
          <img
            src={heroWave}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-24 -left-24 w-[220px] blur-2xl opacity-60 md:w-[280px] md:-top-28 md:-left-28"
          />
          <img
            src={decorCircle}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-4 right-4 w-20 blur-xl opacity-80 md:w-28 md:top-6 md:right-6"
          />
          <header className="relative space-y-2">
            <h1 className="text-display-lg font-semibold text-text">
              Welcome back 👋
            </h1>
            <p className="text-body-md text-text-dim">
              Quick snapshot of your tickets.
            </p>
          </header>

          {loadError ? (
            <p className="text-body-sm text-danger-text mt-4" role="alert" aria-live="assertive">
              {loadError}
            </p>
          ):null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Open" value={stats.open} hint="Needs attention"/>
          <StatCard label="In Progress" value={stats.in_progress} hint="Being worked on"/>
          <StatCard label="Closed" value={stats.closed} hint="Resolved"/>
          <StatCard label="Total" value={stats.total} hint="All tickets"/>
        </div>

        <div>
          <Link
            to="/tickets"
            className="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-white text-sm font-medium hover:bg-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          >
            View Tickets →
          </Link>
        </div>
      </section>
    </LayoutShell>
  );
}

function StatCard({label,value,hint}){
  return (
    <div className="card p-4">
      <p className="text-body-sm text-text-dim">{label}</p>
      <p className="text-display-md text-text font-semibold">{value}</p>
      <p className="text-body-xs text-text-dim text-[12px] leading-[16px]">
        {hint}
      </p>
    </div>
  );
}
