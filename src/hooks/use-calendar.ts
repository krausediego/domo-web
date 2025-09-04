import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TCalendarView } from "@/pages/_app/_authenticated/calendar/-components/calendar/types";

type CalendarStore = {
  calendarView: TCalendarView;
  setCalendarView: (calendarView: TCalendarView) => void;
  getCalendarView: () => TCalendarView;
};

export const useCalendarStore = create(
  persist<CalendarStore>(
    (set, get) => ({
      calendarView: "month",
      setCalendarView: (calendarView: TCalendarView) => {
        set({ calendarView });
      },
      getCalendarView: () => {
        const state = get();
        return state.calendarView;
      },
    }),
    {
      name: "calendar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
