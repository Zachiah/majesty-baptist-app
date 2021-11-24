import { CalendarRecord } from "./Calendar";
import createDataSignal from "./hooks/createDataSignal";


export { default as livingHymns } from "../hymnary_scraper/hymns.json";
export const [calendar,setCalendar] = await createDataSignal<CalendarRecord>("calendar", [{
    id: "23409872ioujfaej",
    // november 24 2021
    dateString: "2021-11-24",
    type: "event",
    title: "Non-Existant Fake Event"
}]);
