"use client";

import { useState, useTransition } from "react";
import { updateApplicationStatus } from "../../actions";
import type { ApplicationStatus } from "@/types";

interface Props {
  reference: string;
  currentStatus: ApplicationStatus;
  statuses: ApplicationStatus[];
  labels: Record<ApplicationStatus, string>;
}

export default function StatusForm({ reference, currentStatus, statuses, labels }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    startTransition(async () => {
      await updateApplicationStatus(reference, status);
      setSaved(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-wrap">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
        className="border-2 border-[#EFEFEF] rounded-xl px-4 py-2.5 text-[13.5px] font-semibold outline-none focus:border-[#C8102E] transition-colors cursor-pointer"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{labels[s]}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending || status === currentStatus}
        className="bg-[#C8102E] text-white px-5 py-2.5 rounded-xl font-display font-black text-[13px] hover:bg-[#a00d24] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? "Saving…" : "Save"}
      </button>
      {saved && !isPending && <span className="text-[12.5px] font-semibold text-[#1AA84B]">Saved.</span>}
    </form>
  );
}
