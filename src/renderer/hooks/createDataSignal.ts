import { Accessor, createSignal } from "solid-js";

async function createDataSignal<T>(key: string, initialValue: T): Promise<[Accessor<T>, (newV: T) => void]> {
  if (typeof initialValue === "function") {
    throw new Error("Initial value cannot be a function");
  }

  const [data, setData] = createSignal(
    (await window.electron.readData(key)) ?? initialValue
  );

  return [
    data,
    async (value: T) => {
      await window.electron.writeData(key, value);

      // T can't be a function so no issue
      setData(value as (T extends Function ? never : T) | ((prev?: any) => T) | undefined);
    },
  ];
}

export default createDataSignal;
