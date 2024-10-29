// src/pages/index.tsx
import { GambaButton } from "@/components/ui/GambaPlayButton";
import { GameGrid } from "@/components/game/GameGrid";
import { PLATFORM_REFERRAL_FEE } from "@/constants";
import RecentPlays from "@/components/game/RecentPlays/RecentPlays";
import { toast } from "sonner";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function HomePage() {
  const walletModal = useWalletModal();
  const wallet = useWallet();

  const copyInvite = () => {
    if (!wallet.publicKey) {
      return walletModal.setVisible(true);
    }
    const referralLink = `${location.host}?code=${wallet.publicKey.toString()}`;
    navigator.clipboard.writeText(referralLink);
    toast.success(
      `已複製！分享您的連結，當玩家使用此平台時，您可獲得 ${
        PLATFORM_REFERRAL_FEE * 100
      }% 的手續費`,
    );
  };
  return (
    <>
      <div className="relative mx-auto flex flex-col gap-5 mt-20 pb-10 px-2.5 transition-all duration-250 ease-in-out sm:px-5 sm:pt-5 md:max-w-6xl">
        <div className="relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-lg lg:grid lg:grid-cols-3 gap-4 lg:p-10 bg-transparent">
          <div
            style={{
              backgroundImage: "url(/seo.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: "perspective(800px) rotateX(40deg)",
              transformOrigin: "top center",
              zIndex: -1,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-10 transform rotate-12 scale-150 blur-xl pointer-events-none"></div>

          <div className="bg-[#15152e]/80 rounded-lg p-4 lg:col-span-2 text-center lg:text-left">
            <div className=" flex items-center justify-center md:justify-start">
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
                歡迎來到金紙幣 Web3 遊樂場
              </h1>
              <img src="/wave.gif" className="h-14" alt="Gamba 標誌" />
            </div>
            <p className="my-2 text-white drop-shadow">
              這是一個在 Solana 上提供端到端鏈上的遊樂場。
            </p>
            <p className="my-2 text-sm max-w-sm">
              分享您的連結，當玩家使用您的代碼在此平台上遊玩時，您可獲得 {PLATFORM_REFERRAL_FEE * 100}% 的手續費。
            </p>
            <button
              className="bg-[#8851ff] hover:bg-[#9564ff] rounded-lg p-2 text-xs"
              onClick={copyInvite}
            >
              複製連結
            </button>
          </div>
          <div className="whitespace-nowrap grid grid-cols-2 grid-rows-2 gap-2 mt-5 md:flex md:flex-col md:mt-0 md:justify-start">
            <button
              onClick={() =>
                window.open("https://solscan.io/token/HZNnmhAY6xfq2iKRyBTEvTVeoTYJzpkK8mfnfG8Ppump")
              }
              className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
            >
              Solscan 區塊鏈查詢
            </button>
            <button
              onClick={() => window.open("https://reurl.cc/Klzepn")}
              className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
            >
              ORCA 去中心化交易所
            </button>
            <button
              onClick={() => window.open("https://reurl.cc/oybR1M")}
              className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
            >
              Raydium 中心化交易所
            </button>
            <button
              onClick={() => window.open("https://line.me/ti/g2/i2eDX3flftsLbiz6Pdq3osziqGuu6cJg-_HmEA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default")}
              className="rounded-lg p-3 bg-white hover:bg-gray-200 hover:-translate-y-0.5 transform text-black transition-all duration-200 ease-in-out cursor-pointer shadow-lg hover:shadow-xl"
            >
              金紙幣JMoney 官方LINE社群
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">遊戲</h2>
        <GameGrid />
        <h2 className="text-2xl font-bold text-center">最近遊玩紀錄</h2>
        <RecentPlays />
      </div>
    </>
  );
}
