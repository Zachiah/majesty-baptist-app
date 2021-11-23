export type SermonRecord = {
  title: string;
};

export type CalendarEventRecord = {
  title: string;
};

export type CalendarDateRecord = {
  // looks like yyyy-mm-dd
  date: string;
  hymns?: number[];
  sermon?: SermonRecord;
  events?: CalendarEventRecord[];
};

export type CalendarRecord = CalendarDateRecord[];

export class Calendar {
  #data: CalendarRecord;

  constructor(data: CalendarRecord) {
    this.#data = data;
  }

  static dateToDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  static dateStringToDate(date: string): Date {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  getDate(date: string | Date): CalendarDateRecord | undefined {
    if (typeof date !== "string") {
      date = Calendar.dateToDateString(date);
    }
    return this.#data.find((d) => d.date === date);
  }
}
