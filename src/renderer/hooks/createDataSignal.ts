import { createSignal } from "solid-js";

async function createDataSignal<T>(key: string, initialValue: T) {
  if (typeof initialValue === "function") {
    throw new Error("Initial value cannot be a function");
  }

  const [data, setData] = createSignal(
    (await window.electron.readData(key)) ?? initialValue
  );

  return [
    data,
    async (value: (T extends Function ? never : T) | ((prevValue: T) => T)) => {
      await window.electron.writeData(key, value);

      setData(value);
    },
  ] as const;
}

export default createDataSignal;
