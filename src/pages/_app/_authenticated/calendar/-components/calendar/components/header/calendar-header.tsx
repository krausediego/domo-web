import { Columns, Grid2x2, List, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/hooks/use-calendar";

import type { IEvent } from "../../interfaces";
import type { TCalendarView } from "../../types";
import { AddEventDialog } from "../dialogs/add-event-dialog";
import { DateNavigator } from "./date-navigator";
import { TodayButton } from "./today-button";
import { UserSelect } from "./user-select";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  const { setCalendarView } = useCalendarStore();

  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <div className="inline-flex first:rounded-r-none last:rounded-l-none [&:not(:first-child):not(:last-child)]:rounded-none">
            <Button
              onClick={() => setCalendarView("day")}
              tooltipLabel="Dia"
              aria-label="View by day"
              size="icon"
              variant={view === "day" ? "default" : "outline"}
              className="rounded-r-none [&_svg]:size-5"
            >
              <List strokeWidth={3} />
            </Button>

            <Button
              onClick={() => setCalendarView("week")}
              tooltipLabel="Semana"
              aria-label="View by week"
              size="icon"
              variant={view === "week" ? "default" : "outline"}
              className="-ml-px rounded-none [&_svg]:size-5"
            >
              <Columns strokeWidth={3} />
            </Button>

            <Button
              onClick={() => setCalendarView("month")}
              tooltipLabel="Mês"
              aria-label="View by month"
              size="icon"
              variant={view === "month" ? "default" : "outline"}
              className="-ml-px rounded-l-none [&_svg]:size-5"
            >
              <Grid2x2 strokeWidth={3} />
            </Button>
          </div>

          <UserSelect />
        </div>

        <AddEventDialog>
          <Button className="w-full sm:w-auto">
            <Plus />
            Criar agendamento
          </Button>
        </AddEventDialog>
      </div>
    </div>
  );
}
