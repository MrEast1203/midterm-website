import React from "react";
import myphoto from "../images/myphoto.jpeg";
export default function About() {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-9/12 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold leading-9 text-gray-800 pb-4">
            About Me
          </h1>
          <p className="font-normal text-xl leading-6 text-gray-600 ">
            HI, Originally from Hong Kong🇭🇰, I moved to Taiwan🇹🇼 since my
            university years and am currently pursuing a degree in Electrical
            Engineering at National Taiwan University. My enthusiasm for coding
            has driven me to engage in a variety of projects, covering areas
            such as Unity, website development, Raspberry Pi, and blockchain
            technologies. In addition to my academic and coding endeavors, I
            have explored other interests by joining the AK Poker Club🃏 and
            Japanese Mahjong Club🀄️, reflecting my curiosity and eagerness to
            immerse myself in different cultures and activities.
          </p>
        </div>
        <div className="w-full lg:w-3/12 ">
          <img className="w-full h-full" src={myphoto} alt="My photo" />
        </div>
      </div>
    </div>
  );
}
