import { isToday, startOfDay } from "date-fns";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

import { getMonthCellEvents } from "../../helpers";
import type { ICalendarCell, IEvent } from "../../interfaces";
import { DroppableDayCell } from "../dnd/droppable-day-cell";
import { EventBullet } from "./event-bullet";
import { MonthEventBadge } from "./month-event-badge";

interface IProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

export const MAX_VISIBLE_EVENTS = 12;

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions],
  );
  const isSunday = date.getDay() === 0;

  const biggestPosition = useMemo(() => {
    return Math.max(...cellEvents.map((event) => event.position), 0) + 1;
  }, [cellEvents]);

  return (
    <DroppableDayCell cell={cell}>
      <div
        className={cn(
          "flex h-full flex-col gap-1 border-t border-l py-1.5 lg:py-2",
          isSunday && "border-l-0",
        )}
      >
        <span
          className={cn(
            "h-6 px-1 text-xs font-semibold lg:px-2",
            !currentMonth && "opacity-20",
            isToday(date) &&
              "bg-primary text-primary-foreground flex w-6 translate-x-1 items-center justify-center rounded-full px-0 font-bold",
          )}
        >
          {day}
        </span>

        <div
          className={cn(
            "flex h-6 gap-1 px-2 lg:h-auto lg:min-h-[94px] lg:flex-col lg:gap-2 lg:px-0",
            !currentMonth && "opacity-50",
          )}
        >
          {Array(Math.min(biggestPosition, MAX_VISIBLE_EVENTS))
            .fill(0)
            .map((_, index) => index)
            .map((position) => {
              const event = cellEvents.find((e) => e.position === position);
              const eventKey = event
                ? `event-${event.id}-${position}`
                : `empty-${position}`;

              return (
                <div key={eventKey} className="lg:flex-1">
                  {event && (
                    <>
                      <EventBullet className="lg:hidden" color={event.color} />
                      <MonthEventBadge
                        className="hidden lg:flex"
                        event={event}
                        cellDate={startOfDay(date)}
                      />
                    </>
                  )}
                </div>
              );
            })}
        </div>

        {cellEvents.length > MAX_VISIBLE_EVENTS && (
          <p
            className={cn(
              "text-muted-foreground h-4.5 px-1.5 text-xs font-semibold",
              !currentMonth && "opacity-50",
            )}
          >
            <span className="sm:hidden">
              +{cellEvents.length - MAX_VISIBLE_EVENTS}
            </span>
            <span className="hidden sm:inline">
              {" "}
              {cellEvents.length - MAX_VISIBLE_EVENTS} more...
            </span>
          </p>
        )}
      </div>
    </DroppableDayCell>
  );
}
