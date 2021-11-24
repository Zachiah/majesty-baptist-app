import calendarize from 'calendarize';

export interface CalendarObjectBase {
  id: string;
  dateString: string;
}

export interface CalendarSermonRecord extends CalendarObjectBase {
  title: string;
  type: "sermon";
}

export interface CalendarEventRecord extends CalendarObjectBase {
  title: string;
  type: "event";
}

export interface CalendarHymnRecord extends CalendarObjectBase {
  number: number;
  type: "hymn";
}

export type CalendarObjectRecord =
  | CalendarSermonRecord
  | CalendarEventRecord
  | CalendarHymnRecord;

export type CalendarRecord = CalendarObjectRecord[];

export class Calendar {
  #data: CalendarRecord;

  constructor(data: CalendarRecord) {
    this.#data = data;
  }

  static dateToDateString(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  static dateStringToDate(date: string): Date {
    const [year, month, day] = date.split("-").map((s) => parseInt(s));
    return new Date(year, month - 1, day);
  }

  getDate(date: string | Date): CalendarObjectRecord[] {
    if (typeof date !== "string") {
      date = Calendar.dateToDateString(date);
    }
    return this.#data.filter((d) => d.dateString === date);
  }

  getMonth(date: Date) {
    const calendarizeCalendar = calendarize(date);

    return calendarizeCalendar.map((week) => {
      return week.map((day) => {
        if (day === 0) return null;
        return {
          objects: this.getDate(new Date(date.getFullYear(), date.getMonth(), day)),
          year: date.getFullYear(),
          month: date.getMonth(),
          day: day,
        };
      });
    });
  }

  // searchHistoryForObjects(object: CalendarObjectRecord): CalendarDateRecord[] {
  //   return this.#data.filter((d) => {
  //       if (object.type === "sermon" || object.type === "event") {
  //           return d.objects.some((o) => o.type === object.type &&  object.title.toLowerCase().split(" ").every((word) => o.title.toLowerCase().includes(word)))
  //       } else if (object.type === "hymn") {
  //           return d.objects.some((o) => o.type === object.type && o.number === object.number)
  //       };
  //   });
  // }

  getData(): CalendarRecord {
    return this.#data;
  }
}
