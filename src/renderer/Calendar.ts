import calendarize from 'calendarize';
import {v4 as uuid} from 'uuid';

export interface CalendarObjectBase {
  id: string;
  timestamp: number;
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

export type PartialCalendarObjectRecord = {
  title?: string;
  type: "sermon" | "event" | "hymn";
  number?: number;
  id?: string;
  timestamp?: number;
}

export type CalendarRecord = CalendarObjectRecord[];

export class Calendar {
  #data: CalendarRecord;

  constructor(data: CalendarRecord) {
    this.#data = data;
  }


  static generateId() {
    return uuid();
  }



  getDateObjects(date: number | Date): CalendarObjectRecord[] {
    if (typeof date !== "number") {
      date = date.getTime();
    }
    return this.#data.filter((d) => d.timestamp === date);
  }

  getDate(date: Date) {
    return {
      objects: this.getDateObjects(date),
      date: date,
    }
  }

  getMonth(date: Date) {
    const calendarizeCalendar = calendarize(date);

    return calendarizeCalendar.map((week) => {
      return week.map((day) => {
        if (day === 0) return null;
        return {
          objects: this.getDateObjects(new Date(date.getFullYear(), date.getMonth(), day)),
          date: new Date(date.getFullYear(), date.getMonth(), day),
        };
      });
    });
  }

  getWeek(date: Date) {
    // set date to the first day of the week
    date.setDate(date.getDate() - date.getDay());

    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + i));
    }
    return week.map(d => ({
      objects: this.getDateObjects(d),
      date: d
    }))
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
