// src/components/sections/Header.tsx

import {
  GambaUi,
  TokenValue,
  useCurrentPool,
  useCurrentToken,
  useTokenBalance,
} from "gamba-react-ui-v2";
import { useState } from "react";

import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import TokenSelect from "../ui/TokenSelect";
import { UserButton } from "../ui/UserButton";

export default function Header() {
  const pool = useCurrentPool();
  const token = useCurrentToken();
  const balance = useTokenBalance();
  const [bonusHelp, setBonusHelp] = useState(false);
  const [jackpotHelp, setJackpotHelp] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between w-full p-2.5 bg-gradient-to-br from-blue-800 to-purple-800 fixed top-0 left-0 z-50 rounded-b-2xl shadow-lg">
        <div className="absolute top-0 left-0 right-0 backdrop-blur w-full h-full rounded-b-2xl -z-20" />
        <div className="flex gap-5 items-center">
          <Link href="/" passHref>
            <div className="h-9 m-0 cursor-pointer">
              <img alt="Gamba logo" src="/logo.svg" className="h-full" />
            </div>
          </Link>
        </div>
        <div className="max-sm:text-xs max-sm:gap-1 flex gap-2.5 items-center relative">
          {bonusHelp && (
            <Modal onClose={() => setBonusHelp(false)}>
              <h1>您有一個獎勵！</h1>
              <p>
                您有
                <b>
                  <TokenValue amount={balance.bonusBalance} />
                </b>
                的免費遊玩次數。這些獎勵會在您遊玩時自動使用。
              </p>
            </Modal>
          )}
          {jackpotHelp && (
            <Modal onClose={() => setJackpotHelp(false)}>
              <div className="text-lg font-semibold text-center">
                {token.name} 頭獎詳情
              </div>
              {pool.jackpotBalance > 0 && (
                <div className="flex text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 uppercase font-bold">
                  <TokenValue amount={pool.jackpotBalance} />
                </div>
              )}
              <div className="mt-4">
                <p>
                  頭獎隨著每場遊戲的進行而增長，由未能贏得頭獎的玩家支付的費用來累積。贏得頭獎不僅能獲得豐厚的獎勵，還會將一小部分獎金回流至主要流動性池，以維持遊戲經濟的運作。
                </p>
                <div className="mt-4">
                  <div>
                    <strong>池費：</strong> {pool.poolFee}%
                  </div>
                  <div>
                    <strong>流動性：</strong>
                    <TokenValue amount={Number(pool.liquidity)} />
                  </div>
                  <div>
                    <strong>最低投注：</strong>
                    <TokenValue amount={pool.minWager} />
                  </div>
                  <div>
                    <strong>最高賠付：</strong>
                    <TokenValue amount={pool.maxPayout} />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <GambaUi.Button main>
                    <a
                      href={`https://explorer.gamba.so/pool/${pool.publicKey.toString()}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      在區塊鏈瀏覽器上查看池
                    </a>
                  </GambaUi.Button>
                </div>
              </div>
            </Modal>
          )}
          {pool.jackpotBalance > 0 && (
            <button
              onClick={() => setJackpotHelp(true)}
              className="hidden md:flex all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold transition-colors duration-200 hover:bg-white"
            >
              <TokenValue amount={pool.jackpotBalance} />
            </button>
          )}
          {balance.bonusBalance > 0 && (
            <button
              onClick={() => setBonusHelp(true)}
              className="hidden md:flex all-unset cursor-pointer text-[#003c00] rounded-lg bg-[#03ffa4] px-2.5 py-0.5 text-xs uppercase font-bold transition-colors duration-200 hover:bg-white"
            >
              +<TokenValue amount={balance.bonusBalance} />
            </button>
          )}
          <TokenSelect />
          <UserButton />
        </div>
      </div>
    </>
  );
}
