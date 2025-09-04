import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useCalendar } from "../../contexts/calendar-context";
import { getEventsCount, navigateDate, rangeText } from "../../helpers";
import type { IEvent } from "../../interfaces";
import type { TCalendarView } from "../../types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function DateNavigator({ view, events }: IProps) {
  const { selectedDate, setSelectedDate } = useCalendar();

  let month = formatDate(selectedDate, "MMMM", { locale: ptBR });
  month = month.charAt(0).toUpperCase() + month.slice(1);
  const year = selectedDate.getFullYear();

  const eventCount = useMemo(
    () => getEventsCount(events, selectedDate, view),
    [events, selectedDate, view],
  );

  const handlePrevious = () =>
    setSelectedDate(navigateDate(selectedDate, view, "previous"));
  const handleNext = () =>
    setSelectedDate(navigateDate(selectedDate, view, "next"));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">
          {month} de {year}
        </span>
        <Badge variant="outline" className="px-1.5">
          {eventCount} Agendamentos
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="size-6.5 px-0 [&_svg]:size-4.5"
          onClick={handlePrevious}
        >
          <ChevronLeft />
        </Button>

        <p className="text-muted-foreground text-sm">
          {rangeText(view, selectedDate)}
        </p>

        <Button
          variant="outline"
          className="size-6.5 px-0 [&_svg]:size-4.5"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
