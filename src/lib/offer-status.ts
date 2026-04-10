export const OFFER_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  COUNTERED: "countered",
  COUNTER_ACCEPTED: "counter_accepted",
  COUNTER_REJECTED: "counter_rejected",
} as const;

export type OfferStatus = (typeof OFFER_STATUS)[keyof typeof OFFER_STATUS];

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Declined",
    countered: "Counter Sent",
    counter_accepted: "Counter Accepted",
    counter_rejected: "Counter Declined",
  };
  return labels[status] ?? status;
}

export function statusClasses(status: string): string {
  const classes: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    accepted: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
    rejected: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
    countered: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
    counter_accepted: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
    counter_rejected: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  };
  return classes[status] ?? "bg-surface text-muted";
}
