import { Component, For } from "solid-js";
import { livingHymns } from "../../data";

const Hymns: Component = () => {
  return (
    <For each={livingHymns}>
      {(hymn) => (
        <div
          class="p-2"
          classList={{
            "bg-gray-200 text-gray-800": hymn.number % 2 === 0,
            "bg-gray-300 text-gray-800": hymn.number % 2 === 1,
          }}
        >
          #{hymn.number} {hymn.title}
        </div>
      )}
    </For>
  );
};

export default Hymns;
