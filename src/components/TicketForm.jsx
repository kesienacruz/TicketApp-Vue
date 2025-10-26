import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ALLOWED_STATUS } from "../utils/constants.js";
import { isValidationError } from "../utils/errors.js";

export default function TicketForm({
  mode = "create",
  initialTicket = null,
  onSave,
  onCancel,
}) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors: rhfErrors, isValid, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: initialTicket?.title || "",
      description: initialTicket?.description || "",
      status: initialTicket?.status || "open",
    },
  });

  function fieldServerError(name){
    if(serverError?.details?.fields?.[name]){
      return serverError.details.fields[name];
    }
    return null;
  }

  const topLevelMessage =
    serverError && isValidationError(serverError)
      ? serverError.message
      : null;

  async function submitHandler(values){
    setServerError(null);

    const payload = {
      id: initialTicket?.id,
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
    };

    try{
      await onSave(payload);
      reset();
      if(mode==="create"){
        navigate("/tickets");
      }else{
        onCancel && onCancel();
      }
    }catch(err){
      toast.error("Unable to save ticket.",{role:"alert"});
      setServerError(err);
    }
  }

  return (
    <div className="card p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-display-md font-semibold text-text">
            {mode==="edit"?"Edit ticket":"New ticket"}
          </h2>
          <p className="text-body-sm text-text-dim">
            {mode==="edit"
              ?"Update the details and status."
              :"Describe the issue so it can be resolved."}
          </p>
        </div>

        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-body-sm font-medium text-text-dim hover:text-text focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
          >
            ✕
          </button>
        ):null}
      </div>

      {topLevelMessage ? (
        <div
          className="rounded-card border border-danger-border bg-danger-bg px-3 py-2 text-danger-text text-body-sm"
          role="alert"
          aria-live="assertive"
        >
          {topLevelMessage}
        </div>
      ):null}

      <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-2">
          <label className="block text-body-sm font-medium text-text" htmlFor="ticket-title">
            Title <span className="text-danger-text">*</span>
          </label>

          <input
            id="ticket-title"
            className="w-full rounded-card border border-surface-border bg-surface px-3 py-2 text-body-md text-text focus-visible:ring-brand-500"
            placeholder="Printer not working"
            {...register("title",{
              required:"Title is required.",
              validate:(val)=>{
                if(!val || !val.trim()){
                  return "Title cannot be empty.";
                }
                return true;
              }
            })}
          />

          <p className="text-body-sm text-danger-text" role="alert">
            {rhfErrors.title?.message || fieldServerError("title")}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-body-sm font-medium text-text" htmlFor="ticket-description">
            Description <span className="text-text-dim text-body-xs">(optional)</span>
          </label>

          <textarea
            id="ticket-description"
            className="w-full min-h-[80px] rounded-card border border-surface-border bg-surface px-3 py-2 text-body-md text-text focus-visible:ring-brand-500"
            placeholder="It keeps jamming when we try to print labels."
            {...register("description",{
              maxLength:{
                value:500,
                message:"Description cannot exceed 500 characters."
              }
            })}
          />

          <p className="text-body-sm text-danger-text" role="alert">
            {rhfErrors.description?.message || fieldServerError("description")}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-body-sm font-medium text-text" htmlFor="ticket-status">
            Status <span className="text-danger-text">*</span>
          </label>

          <select
            id="ticket-status"
            className="w-full rounded-card border border-surface-border bg-surface px-3 py-2 text-body-md text-text focus-visible:ring-brand-500"
            {...register("status",{
              validate:(val)=>{
                if(!ALLOWED_STATUS.includes(val)){
                  return "Status is invalid.";
                }
                return true;
              }
            })}
          >
            {ALLOWED_STATUS.map(s=>(
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <p className="text-body-sm text-danger-text" role="alert">
            {rhfErrors.status?.message || fieldServerError("status")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`rounded-pill px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-500 ${
              !isValid || isSubmitting
                ? "bg-brand-600/50 text-white cursor-not-allowed"
                : "bg-brand-600 text-white hover:bg-brand-700"
            }`}
          >
            {mode==="edit"?"Save changes":"Create ticket"}
          </button>

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-pill bg-surface px-4 py-2 text-sm font-medium text-text border border-surface-border hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Cancel
            </button>
          ):null}
        </div>
      </form>
    </div>
  );
}
