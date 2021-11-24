import { NavLink } from "solid-app-router";
import { Component, JSX } from "solid-js";
import { FaSolidHome ,FaSolidMusic,FaSolidCalendar} from "solid-icons/fa";

const SidebarLink = (props: {
  href: string;
  icon: (props: { class: string }) => JSX.Element;
}): JSX.Element => {
  return (
    <NavLink end href={props.href} class="p-4 text-gray-200 duration-200 cursor-pointer hover:text-gray-300 outline-none border border-transparent active:(text-gray-500 bg-gray-200) focus-visible:border-black" activeClass="!text-gray-500 !bg-gray-200" >
      <props.icon class="w-8 h-8" />
    </NavLink>
  );
};

const Sidebar: Component = () => {
  return (
    <nav class="h-full bg-gray-700 flex flex-col">
      <SidebarLink href="/" icon={FaSolidHome} />
      <SidebarLink href="/hymns" icon={FaSolidMusic} />
      <SidebarLink href="/calendar" icon={FaSolidCalendar} />
    </nav>
  );
};

export default Sidebar;
