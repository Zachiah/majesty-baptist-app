import { render } from "solid-js/web";

import App from "./components/App";
import "virtual:windi.css";
import { Router } from "solid-app-router";

// (async() => {
//   const times = await window.electron.readData("test1");

//   await window.electron.writeData("test1", {test: times.test + 1});

//   console.log(times);
// })()

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
