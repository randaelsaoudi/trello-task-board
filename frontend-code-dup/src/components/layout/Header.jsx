import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsSun, BsMoonStars, BsStar, BsMicrosoftTeams } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";
const Header = () => {
  const { theme, setTheme} = useTheme();
  const toggleTheme = () => {
    if(theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
  return (
    <header
      className="px-7 flex flex-col gap-6 bg-[#1783BB] min-w-full dark:bg-[#0D0D0D] dark__mode"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <div className="flex items-center gap-6 ">
        <section className="flex  gap-3 mt-6 items-center justify-center  ">
          <span className="p-2 border rounded-sm cursor-not-allowed">
            <AiOutlineArrowLeft className="text-white" />
          </span>
          <section className="flex items-center justify-center gap-4 border border-t-0 border-b-0 border-l-0 pr-4 border-r-gray-300"> 
            <h1 className="text-lg text-white font-bold dark:text-slate-50">
              {"Taco's Tacos"}
            </h1>
            <BsStar className="text-lg font-semibold  text-white" />
          </section>
        </section>
          <div className="flex items-center justify-center gap-4 mt-6">
            <BsMicrosoftTeams className="text-white w-6 h-6" />
            <p className="text-lg text-white font-semibold">Team Visible</p>
          </div>

          <div className="ml-4 mt-6">
            {
              theme === "light" ? (
                <BsSun className="text-2xl hover:cursor-pointer text-slate-100 "
                onClick={toggleTheme}
                />
              ) : (
                <BsMoonStars className="text-[20px] hover:cursor-pointer text-slate-100 "
                onClick={toggleTheme} />
              )
            }
          </div>
  
      </div>
      <section>
        <ul className="flex gap-9 text-[16px] text-gray-300 font-normal dark:text-gray-300 mb-1">
          <li className="cursor-pointer">Overview</li>
          <li className="text-slate-100 dark:text-white font-semibold underline-offset-8 underline">
            Tasks
          </li>
          <li className="cursor-pointer">Milestones</li>
          <li className="cursor-pointer">Timesheets</li>
          <li className="cursor-pointer">Files</li>
          <li className="cursor-pointer">Discussions</li>
          <li className="cursor-pointer">Activity Feed</li>
        </ul>
      </section>
    </header>
  );
};

export default Header;