import { Component, For, Match, Show, Switch } from "solid-js";
import {
  Calendar,
  CalendarEventRecord,
  CalendarHymnRecord,
  CalendarObjectRecord,
  CalendarSermonRecord,
} from "../../Calendar";
import { calendar, livingHymns } from "../../data";

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

const CalendarPage: Component = () => {
  const calendarObj = new Calendar(calendar());
  const daysInMonth = calendarObj.getMonth(new Date());

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
    <section
      class="grid grid-cols-7 h-full p-2"
      style={`grid-template-rows: auto repeat(${daysInMonth.length}, 1fr)`}
    >
      <For each={daysInWeek}>
        {(day) => <div class="text-center p-4 h-min border-1 m-2">{day}</div>}
      </For>

      <For each={daysInMonth}>
        {(week) => (
          <For each={week}>
            {(day) => (
              <Show when={day} fallback={<td class="border-1 m-2"></td>}>
                <div class="border-1 m-2 flex flex-col relative">
                  <div class="absolute top-0 right-0 bg-gray-200">
                    {day!.objects.length}
                  </div>

                  <p class="p-2">{day!.day}</p>
                  <For each={day!.objects}>
                    {(object) => <CalendarObjectComponent record={object} />}
                  </For>
                </div>
              </Show>
            )}
          </For>
        )}
      </For>
    </section>
  );
};

export default CalendarPage;
