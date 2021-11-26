import { CalendarRecord } from "./Calendar";
import createDataSignal from "./hooks/createDataSignal";


export { default as livingHymns } from "../hymnary_scraper/hymns.json";
export const [calendar,setCalendar] = await createDataSignal<CalendarRecord>("calendar", []);
