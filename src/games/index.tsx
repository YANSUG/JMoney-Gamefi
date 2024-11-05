// src/games/index.tsx

import { GameBundle } from "gamba-react-ui-v2";
import dynamic from "next/dynamic";

interface GameMeta {
  background?: string;
  name: string;
  image?: string;
  description?: string;
  volatility?: number;
}

export const GAMES: GameBundle<GameMeta>[] = [
  {
    id: "dice",
    meta: {
      background: "#E91E63",
      name: "終極密碼",
      image: "/games/logo.png",
      description: `終極密碼遊戲提供了一場令人興奮的挑戰，玩家必須預測擲骰結果，並以一種獨特的方式進行。選擇一個數字，玩家的目標是擲出比這個數字小的點數以獲得勝利。遊戲的動態性使玩家可以調整選擇，直接影響潛在的支付，巧妙地平衡風險與回報，確保身歷其境且刺激的遊戲體驗。`,
      volatility: 2,
    },
    app: dynamic(() => import("./Dice")),
  },
  {
    id: "slots",
    meta: {
      background: "#2196F3",
      name: "台灣美食拉霸機",
      image: "/games/logo.png",
      description: `台灣美食拉霸機是機會和期待的化身，為玩家提供了一段充滿魅力的轉軸旅程。體驗旋轉符號對齊並解鎖潛在獎勵的經典刺激，獎勵會直接顯示在界面上。擁有精心設計的界面，為數位愛好者提供公平而引人入勝的賭場體驗，保證帶來純粹興奮和緊張的時刻。`,
      volatility: 3,
    },
    app: dynamic(() => import("./Slots")),
  },
  {
    id: "flip",
    meta: {
      background: "#FFEB3B",
      name: "擲筊",
      image: "/games/logo.png",
      description: `擲筊結合了簡單性與高風險的興奮，玩家在聖杯或陰杯之間進行選擇，每一次擲筊都是關鍵時刻，有可能讓你翻倍財富或者失去一切。這個直截了當但充滿腎上腺素的遊戲考驗著玩家的運氣和戰略決策，保證每次遊戲都充滿電流般的刺激。`,
      volatility: 1,
    },
    app: dynamic(() => import("./Flip")),
  },
  {
    id: "hilo",
    meta: {
      background: "#F44336",
      name: "高低牌",
      image: "/games/logo.png",
      description: `高低牌邀請玩家進入一個充滿預見和機會的世界，每一個決定都有可能解鎖無限的財富。踏上預測之旅，預測下一張牌是升還是降，掌握連續正確猜測的技巧來增加贏利，策略性地決定何時收手以獲得最大回報，使每一場遊戲都成為技巧和直覺的刺激考驗。`,
      volatility: 2,
    },
    props: { logo: "/logo.svg" },
    app: dynamic(() => import("./HiLo")),
  },
  {
    id: "mines",
    meta: {
      background: "#9C27B0",
      name: "掃雷",
      image: "/games/logo.png",
      description: `掃雷是戰略的傑作，玩家在尋找隱藏寶藏的同時要謹慎揭開方格，因為隱藏的地雷可能隨時結束你的探險。每次揭開都會增加風險，為勇敢的玩家帶來充滿懸念和精心計算風險的心跳體驗，保證一場難忘的遊戲冒險。`,
      volatility: 2,
    },
    app: dynamic(() => import("./Mines")),
  },
  {
    id: "roulette",
    meta: {
      background: "#4CAF50",
      name: "輪盤",
      image: "/games/logo.png",
      description: `輪盤將經典的輪盤遊戲融入數位創新中。下注並見證轉輪的迷人景象，決定你的命運。簡單但迷人的玩法和豐厚獎勵的吸引力，輪盤成為了機會與財富的象徵，保證無盡的興奮與期待。`,
      volatility: 3,
    },
    app: dynamic(() => import("./Roulette")),
  },
  {
    id: "plinko",
    meta: {
      background: "#00BCD4",
      name: "普林科",
      image: "/games/logo.png",
      description: `普林科將投幣的動作轉化為藝術，每一次投幣都充滿著期待與策略的融合。見證籌碼在釘板上滑落，隨機落在不同的獎勵槽中。每一次投幣都是運氣和技巧之間的微妙平衡，使普林科成為一次充滿機會與策略的迷人旅程。⚠️ 正在開發中。顯示的結果可能不正確。⚠️`,
      volatility: 3,
    },
    app: dynamic(() => import("./Plinko")),
  },
  {
    id: "crash",
    meta: {
      background: "#FF9800",
      name: "火箭撞擊",
      image: "/games/logo.png",
      description: `預測一個倍數目標，然後看火箭是否能達到該目標。如果火箭在達到目標前墜毀，玩家就會失敗；如果達到或超過目標，玩家就會獲勝。`,
      volatility: 5,
    },
    app: dynamic(() => import("./Crash")),
  },
  {
    id: "limbo",
    meta: {
      background: "#FFC107",
      name: "凌波",
      image: "/games/logo.png",
      description: `凌波讓玩家在雄心和謹慎之間走鋼絲，每一個決策都形塑著他們的命運。設定目標倍數並下注，勇於挑戰機會。隨著風險增加，腎上腺素也上升，推動玩家在策略和直覺之間不斷考驗，追求壯觀勝利，保證帶來沉浸式和充滿腎上腺素的遊戲體驗。`,
      volatility: 5,
    },
    app: dynamic(() => import("./Limbo")),
  },
  {
    id: "keno",
    meta: {
      background: "#673AB7",
      name: "基諾",
      image: "/games/logo.png",
      description: `基諾邀請玩家進入一個充滿戰略決策和期待的世界，每一個選擇都蘊藏著無限的財富潛力。選擇多達 10 個方塊並下注，期待決定你命運的抽籤。無論是選擇較少的數字以獲得豐厚獎勵，還是選擇較多的數字以增加成功機率，基諾都保證帶來充滿興奮和可能性的體驗。`,
      volatility: 4,
    },
    app: dynamic(() => import("./Keno")),
  },
];
