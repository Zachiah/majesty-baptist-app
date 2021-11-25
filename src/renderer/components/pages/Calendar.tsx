import { NavLink,Link, useNavigate, useParams } from "solid-app-router";
import dayjs from "dayjs";
import {
  Component,
  For,
  Match,
  Show,
  Switch,
  JSX,
  createMemo,
  createEffect,
} from "solid-js";
import {
  Calendar,
  CalendarEventRecord,
  CalendarHymnRecord,
  CalendarObjectRecord,
  CalendarSermonRecord,
} from "../../Calendar";
import { calendar, livingHymns } from "../../data";
import { FaSolidArrowLeft, FaSolidArrowRight } from "solid-icons/fa";

const CalendarObjectComponent = (props: { record: CalendarObjectRecord }) => {
  return (
    <div class="p-2">
      <Switch>
        <Match when={props.record.type === "sermon"}>
          {(props.record as CalendarSermonRecord).title}
        </Match>
        <Match when={props.record.type === "event"}>
          {(props.record as CalendarEventRecord).title}
        </Match>
        <Match when={props.record.type === "hymn"}>
          #{(props.record as CalendarHymnRecord).number}
        </Match>
      </Switch>
    </div>
  );
};

const CalendarPage = (props: {}): JSX.Element => {
  const params = useParams();
  const navigate = useNavigate();

  createEffect(() => {
    if (!["month", "week", "day"].includes(params.view)) {
      navigate("/calendar/month/" + Date.now());
    } else if (!parseInt(params.timestamp)) {
      navigate("/calendar/" + params.view + "/" + Date.now());
    }
  });

  const calendarObj = createMemo(() => {
    return new Calendar(calendar());
  });

  const calendarMonth = createMemo(() => {
    return calendarObj().getMonth(new Date(+params.timestamp));
  });

  const calendarWeek = createMemo(() => {
    return calendarObj().getWeek(new Date(+params.timestamp));
  });

  const calendarDay = createMemo(() => {
    return calendarObj().getDate(new Date(+params.timestamp));
  });

  const prevLink = createMemo(() => {
    if (params.view === "month") {
      const prevMonth = new Date(+params.timestamp);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      return "/calendar/month/" + prevMonth.getTime();
    }
    if (params.view === "week") {
      const prevWeek = new Date(+params.timestamp);
      prevWeek.setDate(prevWeek.getDate() - 7);

      return "/calendar/week/" + prevWeek.getTime();
    }
    const prevDay = new Date(+params.timestamp);
    prevDay.setDate(prevDay.getDate() - 1);

    return "/calendar/day/" + prevDay.getTime();
  });

  const nextLink = createMemo(() => {
    if (params.view === "month") {
      const nextMonth = new Date(+params.timestamp);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      return "/calendar/month/" + nextMonth.getTime();
    }
    if (params.view === "week") {
      const nextWeek = new Date(+params.timestamp);
      nextWeek.setDate(nextWeek.getDate() + 7);

      return "/calendar/week/" + nextWeek.getTime();
    }
    const nextDay = new Date(+params.timestamp);
    nextDay.setDate(nextDay.getDate() + 1);

    return "/calendar/day/" + nextDay.getTime();
  });

  const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div class="h-full flex flex-col">
      <header class="bg-gray-700 text-gray-200 flex items-center">
        <NavLink
          href={`/calendar/month/${params.timestamp}`}
          class="p-2 no-underline text-gray-300"
          activeClass="bg-gray-600 text-white"
        >
          Month View
        </NavLink>
        <NavLink
          href={`/calendar/week/${params.timestamp}`}
          class="p-2 no-underline text-gray-300"
          activeClass="bg-gray-600 text-white"
        >
          Week View
        </NavLink>
        <NavLink
          href={`/calendar/day/${params.timestamp}`}
          class="p-2 no-underline text-gray-300"
          activeClass="bg-gray-600 text-white"
        >
          Day View
        </NavLink>

        <p class="ml-auto mr-auto">
          <Switch>
            <Match when={params.view === "month"}>
              {dayjs(+params.timestamp).format("MMMM YYYY")}
            </Match>

            <Match when={params.view === "week"}>
              {dayjs(calendarWeek()[0].date).format("MMMM D")} -{" "}
              {dayjs(calendarWeek()[6].date).format("MMMM D YYYY")}
            </Match>

            <Match when={params.view === "day"}>
              {dayjs(+params.timestamp).format("dddd MMMM D YYYY")}
            </Match>
          </Switch>
        </p>

        <NavLink
          href={prevLink()}
          class="p-2 no-underline text-gray-300"
          activeClass="bg-gray-600 text-white"
        >
          <FaSolidArrowLeft />
        </NavLink>

        <NavLink
          href={nextLink()}
          class="p-2 no-underline text-gray-300"
          activeClass="bg-gray-600 text-white"
        >
          <FaSolidArrowRight />
        </NavLink>
      </header>

      <Switch>
        <Match when={params.view === "month"}>
          <section
            class="grid grid-cols-7 h-full p-2"
            style={`grid-template-rows: auto repeat(${
              calendarMonth().length
            }, 1fr)`}
          >
            <For each={daysInWeek}>
              {(day) => (
                <div class="text-center p-4 h-min border-1 m-2">{day}</div>
              )}
            </For>

            <For each={calendarMonth()}>
              {(week) => (
                <For each={week}>
                  {(day) => (
                    <Show when={day} fallback={<td class="border-1 m-2"></td>}>
                      <div class="border-1 m-2 flex flex-col relative">
                        <div class="absolute top-0 right-0 bg-gray-200">
                          {day!.objects.length}
                        </div>

                        <Link href={`/calendar/day/${day?.date.getTime()}`} class="p-2">{dayjs(day!.date).format("D")}</Link>
                        <For each={day!.objects}>
                          {(object) => (
                            <CalendarObjectComponent record={object} />
                          )}
                        </For>
                      </div>
                    </Show>
                  )}
                </For>
              )}
            </For>
          </section>
        </Match>

        <Match when={params.view === "week"}>
          <section class="flex h-full p-4 gap-4">
            <For each={calendarWeek()}>
              {(day, index) => (
                <div class="border-1 flex-grow p-2">
                  <h2 class="p-2 text-center border-1">
                    {daysInWeek[index()]}
                  </h2>
                  <p>{dayjs(day.date).format("DD/MM")}</p>
                  <For each={day.objects}>
                    {(object) => <CalendarObjectComponent record={object} />}
                  </For>
                </div>
              )}
            </For>
          </section>
        </Match>

        <Match when={params.view === "day"}>
          <section class="flex flex-col h-full">
            <For each={calendarDay().objects}>
              {(object) => <CalendarObjectComponent record={object} />}
            </For>
          </section>
        </Match>
      </Switch>
    </div>
  );
};

export default CalendarPage;
