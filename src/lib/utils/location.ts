export interface DaySchedule {
  dayOfWeek: number; // 0 = Sun, 1 = Mon ... 6 = Sat
  openTime: string;  // "09:00"
  closeTime: string; // "21:00"
  isClosed: boolean;
}

export interface LocationData {
  _id: string;
  name: string;
  slug: string;
  address?: string;
  city: string;
  state: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  status: "open" | "coming_soon" | "temporarily_closed";
  imageUrl?: string;
  weeklySchedule?: DaySchedule[];
  specialNotice?: string;
}

/**
 * Evaluates whether a location is currently open based on its status and weeklySchedule.
 */
export function getLocationOpenStatus(location: LocationData): {
  isOpenNow: boolean;
  statusBadgeText: string;
  statusColorClass: string;
} {
  if (location.status === "coming_soon") {
    return {
      isOpenNow: false,
      statusBadgeText: "Coming Soon",
      statusColorClass: "bg-amber-100 text-amber-800 border-amber-300",
    };
  }

  if (location.status === "temporarily_closed") {
    return {
      isOpenNow: false,
      statusBadgeText: "Temporarily Closed",
      statusColorClass: "bg-red-100 text-red-800 border-red-300",
    };
  }

  if (!location.weeklySchedule || location.weeklySchedule.length === 0) {
    return {
      isOpenNow: true,
      statusBadgeText: "Open 9-to-9",
      statusColorClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    };
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = location.weeklySchedule.find((s) => s.dayOfWeek === currentDay);

  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      isOpenNow: false,
      statusBadgeText: "Closed Today",
      statusColorClass: "bg-zinc-100 text-zinc-800 border-zinc-300",
    };
  }

  const [openH, openM] = todaySchedule.openTime.split(":").map(Number);
  const [closeH, closeM] = todaySchedule.closeTime.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return {
      isOpenNow: true,
      statusBadgeText: `Open Now (until ${todaySchedule.closeTime})`,
      statusColorClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    };
  }

  return {
    isOpenNow: false,
    statusBadgeText: `Closed (Opens at ${todaySchedule.openTime})`,
    statusColorClass: "bg-zinc-100 text-zinc-800 border-zinc-300",
  };
}
