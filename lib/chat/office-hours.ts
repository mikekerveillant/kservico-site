const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;

/** KServico support is staffed Mon–Sun, 9AM–6PM Philippine time. */
export function isOfficeHours(date = new Date()): boolean {
  const manilaHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      hour12: false,
    }).format(date)
  );

  return manilaHour >= OPEN_HOUR && manilaHour < CLOSE_HOUR;
}

export const OFFICE_HOURS_LABEL = "Mon–Sun, 9AM–6PM (Philippine time)";
