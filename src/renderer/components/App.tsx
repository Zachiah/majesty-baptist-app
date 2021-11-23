import type { Component } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";
import Home from "./pages/Home";
import Hymns from "./pages/Hymns";
import Sidebar from "./Sidebar";

const App: Component = () => {
  return (
    <div class="flex h-full">
      <Sidebar />

      <main class="flex-grow overflow-auto" style="scrollbar-gutter: stable">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hymns" element={<Hymns />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
