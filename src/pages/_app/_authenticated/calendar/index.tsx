import { createFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "@/components/admin-panel/content-layout";

import { ClientContainer } from "./-components/calendar/components/client-container";
import { CalendarProvider } from "./-components/calendar/contexts/calendar-context";
import type { IEvent, IUser } from "./-components/calendar/interfaces";

export const Route = createFileRoute("/_app/_authenticated/calendar/")({
  component: RouteComponent,
});

const users: IUser[] = [
  { id: "abc", name: "Diego", picturePath: null },
  { id: "abcd", name: "Paulo", picturePath: null },
  { id: "abce", name: "Pedro", picturePath: null },
];

const events: IEvent[] = [
  {
    id: 123,
    startDate: new Date("2025-09-01T19:00:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T20:00:00-03:00").toISOString(),
    title: "Agendamento",
    color: "green",
    description: "Descrição",
    user: users[0],
  },
  {
    id: 1234,
    startDate: new Date("2025-09-01T09:30:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T10:00:00-03:00").toISOString(),
    title: "Agendamento",
    color: "blue",
    description: "Descrição",
    user: users[1],
  },
  {
    id: 1235,
    startDate: new Date("2025-09-01T11:00:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T12:00:00-03:00").toISOString(),
    title: "Agendamento",
    color: "orange",
    description: "Descrição",
    user: users[2],
  },
  {
    id: 1236,
    startDate: new Date("2025-09-01T12:30:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T13:15:00-03:00").toISOString(),
    title: "Agendamento",
    color: "purple",
    description: "Descrição",
    user: users[0],
  },
  {
    id: 1237,
    startDate: new Date("2025-09-01T13:45:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T14:10:00-03:00").toISOString(),
    title: "Agendamento",
    color: "red",
    description: "Descrição",
    user: users[1],
  },
  {
    id: 1238,
    startDate: new Date("2025-09-01T14:35:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T15:00:00-03:00").toISOString(),
    title: "Agendamento",
    color: "yellow",
    description: "Descrição",
    user: users[2],
  },
  {
    id: 1239,
    startDate: new Date("2025-09-01T15:10:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T15:35:00-03:00").toISOString(),
    title: "Agendamento",
    color: "gray",
    description: "Descrição",
    user: users[1],
  },
  {
    id: 12310,
    startDate: new Date("2025-09-01T16:00:00-03:00").toISOString(),
    endDate: new Date("2025-09-01T17:00:00-03:00").toISOString(),
    title: "Agendamento",
    color: "green",
    description: "Descrição",
    user: users[2],
  },
];

function RouteComponent() {
  return (
    <ContentLayout title="Agenda">
      <CalendarProvider users={users} events={events}>
        <ClientContainer />
      </CalendarProvider>
    </ContentLayout>
  );
}
