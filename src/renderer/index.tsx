import { render } from "solid-js/web";

import App from "./App";
import "virtual:windi.css";
import { Router } from "solid-app-router";
import { session } from "electron";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
