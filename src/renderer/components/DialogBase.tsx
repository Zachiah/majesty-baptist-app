import { Show,JSX } from "solid-js";

const DialogBase = (props: { open: boolean; onClose(): void,children: JSX.Element }) => {
  return (
    <Show when={props.open}>
      <div
        class="z-40 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            props.onClose();
          }
        }}
      >
          {props.children}
      </div>
    </Show>
  );
};

export default DialogBase;
