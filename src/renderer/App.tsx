import type { Component } from "solid-js";
import {Routes, Route, Link} from "solid-app-router";



const App: Component = () => {
  return (
    <div class="p-4 bg-blue-400">
      <p>Header</p>
      {/* <Link href="/">Go to Home</Link>
      <Link href="/about">Go to About</Link>
      <Routes>
        <Route path="/" element={<p>Hello</p>} />
        <Route path="/about" element={<p>About</p>} />
      </Routes> */}


    </div>
  );
};

export default App;
