import { isSameDay, parseISO } from "date-fns";
import { useMemo } from "react";

import { useCalendarStore } from "@/hooks/use-calendar";

import { useCalendar } from "../contexts/calendar-context";
import { CalendarAgendaView } from "./agenda-view/calendar-agenda-view";
import { DndProviderWrapper } from "./dnd/dnd-provider";
import { CalendarHeader } from "./header/calendar-header";
import { CalendarMonthView } from "./month-view/calendar-month-view";
import { CalendarDayView } from "./week-and-day-view/calendar-day-view";
import { CalendarWeekView } from "./week-and-day-view/calendar-week-view";
import { CalendarYearView } from "./year-view/calendar-year-view";

export function ClientContainer() {
  const { selectedDate, selectedUserId, events } = useCalendar();
  const { getCalendarView } = useCalendarStore();

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventStartDate = parseISO(event.startDate);
      const eventEndDate = parseISO(event.endDate);

      if (getCalendarView() === "year") {
        const yearStart = new Date(selectedDate.getFullYear(), 0, 1);
        const yearEnd = new Date(
          selectedDate.getFullYear(),
          11,
          31,
          23,
          59,
          59,
          999,
        );
        const isInSelectedYear =
          eventStartDate <= yearEnd && eventEndDate >= yearStart;
        const isUserMatch =
          selectedUserId === "all" || event.user.id === selectedUserId;
        return isInSelectedYear && isUserMatch;
      }

      if (getCalendarView() === "month" || getCalendarView() === "agenda") {
        const monthStart = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1,
        );
        const monthEnd = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );
        const isInSelectedMonth =
          eventStartDate <= monthEnd && eventEndDate >= monthStart;
        const isUserMatch =
          selectedUserId === "all" || event.user.id === selectedUserId;
        return isInSelectedMonth && isUserMatch;
      }

      if (getCalendarView() === "week") {
        const dayOfWeek = selectedDate.getDay();

        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - dayOfWeek);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const isInSelectedWeek =
          eventStartDate <= weekEnd && eventEndDate >= weekStart;
        const isUserMatch =
          selectedUserId === "all" || event.user.id === selectedUserId;
        return isInSelectedWeek && isUserMatch;
      }

      if (getCalendarView() === "day") {
        const dayStart = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          0,
          0,
          0,
        );
        const dayEnd = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          23,
          59,
          59,
        );
        const isInSelectedDay =
          eventStartDate <= dayEnd && eventEndDate >= dayStart;
        const isUserMatch =
          selectedUserId === "all" || event.user.id === selectedUserId;
        return isInSelectedDay && isUserMatch;
      }
    });
  }, [selectedDate, selectedUserId, events, getCalendarView]);

  const singleDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = filteredEvents.filter((event) => {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);
    return !isSameDay(startDate, endDate);
  });

  // For year view, we only care about the start date
  // by using the same date for both start and end,
  // we ensure only the start day will show a dot
  const eventStartDates = useMemo(() => {
    return filteredEvents.map((event) => ({
      ...event,
      endDate: event.startDate,
    }));
  }, [filteredEvents]);

  return (
    <div className="overflow-hidden rounded-xl border">
      <CalendarHeader view={getCalendarView()} events={filteredEvents} />

      <DndProviderWrapper>
        {getCalendarView() === "day" && (
          <CalendarDayView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {getCalendarView() === "month" && (
          <CalendarMonthView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {getCalendarView() === "week" && (
          <CalendarWeekView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {getCalendarView() === "year" && (
          <CalendarYearView allEvents={eventStartDates} />
        )}
        {getCalendarView() === "agenda" && (
          <CalendarAgendaView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
      </DndProviderWrapper>
    </div>
  );
}
