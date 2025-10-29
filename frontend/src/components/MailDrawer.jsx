import React, { useEffect } from "react";
import {LogOut} from 'lucide-react'
import {categoryStyles} from '../utils/miscellaneous.js'
export default function MailDrawer({ open, mail, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mail) return null;


  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="absolute right-0 top-0 h-full w-full md:w-[520px] bg-white shadow-xl border-l border-slate-200 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between p-4 border-b border-slate-200">
          <div className="pr-4 flex flex-col gap-4">
            <h3 className="text-lg font-semibold leading-snug break-words">{mail.subject}</h3>
            <div className="mt-1 text-sm text-slate-500 break-words">
              <h2 className={`${categoryStyles[mail?.category]} text-xl font-semibold`}>{mail?.category}</h2>
              From: <span className="text-slate-700 font-medium">{mail.from}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close"
          >
            <LogOut />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="whitespace-pre-wrap text-sm text-slate-800">{mail.content}</div>
        </div>
      </aside>
    </div>
  );
}
