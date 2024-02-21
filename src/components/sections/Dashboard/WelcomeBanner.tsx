// src/components/sections/Dashboard/WelcomeBanner.tsx

import { PLATFORM_EXPLORER_URL } from "../../../../config";
import React from "react";

export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center p-5 rounded-lg lg:grid lg:grid-cols-3 gap-4 lg:p-10 bg-gradient-to-br from-orange-300 via-pink-500 to-blue-500">
      <div className="lg:col-span-2 text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
          Welcome to Gamba v2 👋
        </h1>
        <p className="mt-4 text-white drop-shadow">
          A fair, simple, and decentralized casino on Solana.
        </p>
      </div>
      <div className="whitespace-nowrap grid grid-cols-2 grid-rows-2 gap-2 mt-5 md:flex md:flex-col md:mt-0 md:justify-start">
        <button
          onClick={() => window.open(PLATFORM_EXPLORER_URL)}
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          🚀 Platform Explorer
        </button>
        <button
          onClick={() =>
            window.open("https://github.com/BankkRoll/Gamba-V2-Next.js")
          }
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          👨‍💻 Build your own
        </button>
        <button
          onClick={() => window.open("https://gamba.so/docs")}
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          📖 Gamba Docs
        </button>
        <button
          onClick={() => window.open("https://discord.com/invite/HSTtFFwR")}
          className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
        >
          💬 Join Discord
        </button>
      </div>
    </div>
  );
}
