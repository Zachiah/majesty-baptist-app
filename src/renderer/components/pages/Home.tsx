import { Component } from "solid-js";
import majestyBaptistImage from "../../../assets/majesty-logo.png";

const Home: Component = () => {
  return (
    <div class="h-full flex flex-col items-center justify-center bg-gray-600 p-20">
      <img src={majestyBaptistImage} class="w-full h-full object-contain" alt="Majesty Baptist Church" />
    </div>
  );
};

export default Home;
