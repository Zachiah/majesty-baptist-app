import { NavLink, Link, useNavigate, useParams } from "solid-app-router";
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
  createSignal,
} from "solid-js";
import {
  Calendar,
  CalendarEventRecord,
  CalendarHymnRecord,
  CalendarObjectRecord,
  CalendarSermonRecord,
  PartialCalendarObjectRecord,
} from "../../Calendar";
import { calendar, livingHymns, setCalendar } from "../../data";
import {
  FaSolidArrowLeft,
  FaSolidArrowRight,
  FaSolidMusic,
  FaSolidPlus,
} from "solid-icons/fa";
import Dialog from "../DialogBase";

const DAYS_IN_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CalendarObjectComponent = (props: { record: CalendarObjectRecord }) => {
  let [dialogOpen, setDialogOpen] = createSignal(false);
  return (
    <button
      class="p-2 text-left"
      onClick={() => {
        setDialogOpen(true);
      }}
    >
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

      <Dialog
        open={dialogOpen()}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <CalendarObjectForm
          initialObject={props.record}
          onClose={() => {
            setDialogOpen(false);
          }}
          onSave={(obj) => {
            const index = calendar().findIndex((o) => {
              return o.id === props.record.id;
            });
            console.log(props.record);
            console.log(calendar());

            console.log({ index });
            setCalendar([...calendar().slice(0, index), obj]);
          }}
        />
      </Dialog>
    </button>
  );
};

const CalendarObjectForm = (props: {
  onClose: () => void;
  onSave: (obj: CalendarObjectRecord) => void;
  initialObject: PartialCalendarObjectRecord;
}) => {
  const [object, setObject] = createSignal<PartialCalendarObjectRecord>(
    props.initialObject
  );

  createEffect(() => {
    setObject(props.initialObject as PartialCalendarObjectRecord);
  });

  const valid = createMemo(() => {
    if (object().type === "event") {
      return !!object().title;
    }
    if (object().type === "sermon") {
      return !!object().title;
    }
    if (object().type === "hymn") {
      return !(object().number === undefined || object().number === null);
    }
    return false;
  });
  return (
    <section class="bg-white w-80 max-w-full rounded-md shadow-lg p-2">
      <div class="flex mb-2 gap-2">
        <button
          class="flex-1 bg-gray-200 p-2 rounded-md"
          classList={{
            "!bg-gray-400": object().type === "event",
          }}
          onClick={() => {
            setObject({ ...object(), type: "event" });
          }}
        >
          Event
        </button>
        <button
          class="flex-1 bg-gray-200 p-2 rounded-md"
          classList={{
            "!bg-gray-400": object().type === "hymn",
          }}
          onClick={() => {
            setObject({ ...object(), type: "hymn" });
          }}
        >
          Hymn
        </button>
        <button
          class="flex-1 bg-gray-200 p-2 rounded-md"
          classList={{
            "!bg-gray-400": object().type === "sermon",
          }}
          onClick={() => {
            setObject({ ...object(), type: "sermon" });
          }}
        >
          Sermon
        </button>
      </div>

      <Switch>
        <Match when={object().type === "event" || object().type === "sermon"}>
        <label>
            <p>Title</p>
          <input
            class="rounded-md p-2 w-full border-2 border-gray-700 outline-none focus:(transform scale-102)"
            type="text"
            value={(object() as CalendarSermonRecord).title ?? ""}
            onInput={(e) => {
              setObject({
                ...object(),
                title: e.currentTarget.value,
              });
            }}
          />
          </label>
        </Match>

        <Match when={object().type === "hymn"}>
          <label>
            <p>Number</p>
          <input
            class="rounded-md p-2 w-full border-2 border-gray-700 outline-none focus:(transform scale-102)"
            type="number"
            value={(object() as CalendarHymnRecord).number ?? 1}
            onInput={(e) => {
              setObject({
                ...object(),
                number: +e.currentTarget.value ?? 1,
              });
            }}
          />


          </label>
        </Match>
      </Switch>

      <div class="flex mt-8">
        <button
          class="py-2 px-4 border-orange-400 border-2 rounded-lg"
          onClick={() => {
            const newValue: PartialCalendarObjectRecord = props.initialObject;
            setObject(newValue);
            props.onClose();
          }}
        >
          Close
        </button>
        <button
          class="py-2 px-4 bg-green-400 rounded-lg ml-auto"
          classList={{
            "!cursor-not-allowed !bg-gray-200": !valid()
          }}
          onClick={() => {
            if (!valid()) return;
            props.onSave(object() as CalendarObjectRecord);
          }}
        >
          Save
        </button>
      </div>
    </section>
  );
};

const CalendarDayComponent = (props: {
  date: Date;
  objects: CalendarObjectRecord[];
}) => {
  const [dialogOpen, setDialogOpen] = createSignal(false);

  return (
    <div class="border-1 m-2 flex flex-col relative overflow-auto">
      <button
        class="absolute bottom-4 right-4 p-2 bg-gray-700 flex rounded-full text-gray-300"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <FaSolidPlus class="w-6 h-6 b" />
      </button>

      <Link href={`/calendar/day/${props.date.getTime()}`} class="p-2">
        {dayjs(props.date).format("D")}
      </Link>
      <For each={props.objects}>
        {(object) => <CalendarObjectComponent record={object} />}
      </For>

      <Dialog
        open={dialogOpen()}
        onClose={() => {
          setDialogOpen(false);
        }}
      >
        <CalendarObjectForm
          onClose={() => {
            setDialogOpen(false);
          }}
          onSave={(obj) => {
            setCalendar([...calendar(), obj]);
          }}
          initialObject={{
            id: Calendar.generateId(),
            timestamp: props.date.getTime(),
            type: "event",
          }}
        />
      </Dialog>
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
        <Match when={params.view === "month" || params.view === "week"}>
          <section
            class="grid grid-cols-7 h-full p-2"
            style={`grid-template-rows: auto repeat(${
              params.view === "month" ? calendarMonth().length : 1
            }, 1fr)`}
          >
            <For each={DAYS_IN_WEEK}>
              {(day) => (
                <div class="text-center p-4 h-min border-1 m-2">{day}</div>
              )}
            </For>

            <For
              each={
                params.view === "month" ? calendarMonth() : [calendarWeek()]
              }
            >
              {(week) => (
                <For each={week}>
                  {(day) => (
                    <Show when={day} fallback={<td class="border-1 m-2"></td>}>
                      <CalendarDayComponent
                        objects={day!.objects}
                        date={day!.date}
                      />
                    </Show>
                  )}
                </For>
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
