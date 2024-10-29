// src\constants.ts
import { PublicKey } from "@solana/web3.js";

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          PLATFORM FEES               │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.01; // 5% !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.01; // 0.1%

// Referral fee (in %)
export const PLATFORM_REFERRAL_FEE = 0.0025; // 0.25%

// Toggle live toast events - (true = on, false = off)
export const LIVE_EVENT_TOAST = true;

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          FOOTER LINKS                │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const FOOTER_LINKS = [
  {
    href: "https://explorer.gamba.so/user",
    title: "刪除帳號(刪除帳號取回Sol)",
  },
  {
    href: "https://explorer.gamba.so/pool/A5zUmE22MHvxWfCtwFTxPtvbCdhZ7gPBVq812atmKKDR",
    title: "金紙幣獎池",
  },
  {
    href: "https://gmgn.ai/sol/token/HZNnmhAY6xfq2iKRyBTEvTVeoTYJzpkK8mfnfG8Ppump",
    title: "GMGN",
  },
  {
    href: "https://discord.gg/qDYHXqZk",
    title: "Join Discord",
  },
];

export const FOOTER_TWITTER_LINK = {
  href: "https://x.com/Jmoney20240818",
  title: "金紙幣CTO社群所擁有",
};

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          METATAGS (SEO)              │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const BASE_SEO_CONFIG = {
  defaultTitle: "Gamba - NEXTjs Demo",
  description:
    "The gambleFi protocol with end-to-end tools for on-chain degeneracy on Solana.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://play-gamba.vercel.app/",
    title: "Gamba - NEXTjs Demo",
    description:
      "The gambleFi protocol with end-to-end tools for on-chain degeneracy on Solana.",
    images: [
      {
        url: "https://play-gamba.vercel.app/seo.png",
        alt: "Gamba - NEXTjs Demo",
      },
    ],
    site_name: "Gamba - NEXTjs Demo",
  },
  twitter: {
    cardType: "summary_large_image",
    site: "https://twitter.com/gambalabs",
    handle: "@gambalabs",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "casino, gaming, rewards, gambling, entertainment",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
};

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │      SUPPORTED PLATFORM TOKENS       │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const TOKENLIST = [
  // SOL
  {
    mint: new PublicKey("So11111111111111111111111111111111111111112"),
    name: "Solana",
    symbol: "SOL",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    decimals: 9,
    baseWager: 0.01e9,
  },
  // USDC
  {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    name: "USD Coin",
    symbol: "USDC",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    decimals: 9,
    baseWager: 0.01e9,
  },
  // JMoney
  {
    mint: new PublicKey("HZNnmhAY6xfq2iKRyBTEvTVeoTYJzpkK8mfnfG8Ppump"),
    name: "Joss money",
    symbol: "Jmoney",
    image:
      "https://github.com/YANSUG/JMoney-Gamefi/blob/main/public/icon-512.png",
    decimals: 9,
    baseWager: 2000000e5,
  },

  // Add New Public pool
  // {
  //   mint: new PublicKey(""),
  //   name: "",
  //   symbol: "",
  //   image: "",
  //   decimals: 0,
  //   baseWager: 0,
  // },

  // Add New Private pool
  // {
  //   mint: new PublicKey(""),
  //   poolAuthority: new PublicKey(""), // REQUIRED FOR PRIVATE POOLS ONLY
  //   name: "",
  //   symbol: "",
  //   image: "",
  //   decimals: 0,
  //   baseWager: 0,
  // },
];
