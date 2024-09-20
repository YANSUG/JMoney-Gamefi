import { GameBundle } from 'gamba-react-ui-v2'
import React from 'react'

export const GAMES: GameBundle[] = [
  // {
  //   id: 'example',
  //   meta: {
  //     background: '#00ffe1',
  //     name: 'Example',
  //     image: '#',
  //     description: '',
  //   },
  //   app: React.lazy(() => import('./ExampleGame')),
  // },
  {
    id: 'dice',
    meta: {
      background: '#ff6490',
      name: 'Dice',
      image: '/games/dice.png',
      description: `
       終極密碼是一款猜測數字在不在區間的遊戲，可以自己選擇獲勝區域 (機率越高，獎勵越低；機率越低，獎勵越高)，要貪婪還是恐懼，就憑你的一念之間。
      `,
    },
    app: React.lazy(() => import('./Dice')),
  },
  {
    id: 'slots',
    meta: {
      background: '#5465ff',
      name: 'Slots',
      image: '/games/slots.png',
      description: `
       老虎機是典型的運氣和財富的遊戲，結合了台灣獨特的文化、食物特色 ，讓你在遊玩的過程中更有樂趣。
      `,
    },
    app: React.lazy(() => import('./Slots')),
  },
  {
    id: 'flip',
    meta: {
      name: 'Flip',
      description: `
        擲筊是一種簡單卻刺激的賭注遊戲：選擇聖筊或陰筊，賭注翻倍或全數輸光。這款簡單且高風險的遊戲，每次擲筊都在考驗你的運氣、決策力，甚至是你的信仰力。
      `,
      image: '/games/flip.png',
      background: '#ffe694',
    },
    app: React.lazy(() => import('./Flip')),
  },
  {
    id: 'hilo',
    meta: {
      name: 'HiLo',
      image: '/games/hilo.png',
      description: `
        使用大腦、策略，預測下一張的高低，根據預測的難易度提供不同的獎金。
      `,
      background: '#ff4f4f',
    },
    props: { logo: '/logo.svg' },
    app: React.lazy(() => import('./HiLo')),
  },
  {
    id: 'mines',
    meta: {
      name: 'Mines',
      description: `
        There's money hidden beneath the squares. The reward will increase the more squares you reveal, but watch out for the 5 hidden mines. Touch one and you'll go broke. You can cash out at any time.
      `,
      image: '/games/mines.png',
      background: '#8376ff',
    },
    app: React.lazy(() => import('./Mines')),
  },
  {
    id: 'roulette',
    meta: {
      name: 'Roulette',
      image: '/games/roulette.png',
      description: `
        在格子下藏有金錢。揭開的格子越多，獎勵就會越高，但要小心，格子裡隱藏了5個地雷，一旦碰到你就會破產。你隨時可以選擇兌現。在這個遊戲中，融合了台灣傳統的戳戳樂元素，每次揭開格子都充滿了驚喜與挑戰，讓你在冒險中體驗台灣童玩般的樂趣！
      `,
      background: '#1de87e',
    },
    app: React.lazy(() => import('./Roulette')),
  },
  {
    id: 'plinko',
    meta: {
      background: '#7272ff',
      image: '/games/plinko.png',
      name: 'Plinko',
      description: `
        彈珠台遊戲是透過將籌碼從釘板上方掉落，籌碼會隨機落入不同的獎勵槽中，每個槽的獎金各不相同。每一次掉落都充滿期待與策略，這使得彈珠台成為一個無窮樂趣的運氣遊戲。在這個遊戲中加入台灣傳統的彈珠台元素，每次操作都像是在挑戰夜市裡的彈珠機，讓人回味無窮！
        ⚠️ Under development. Results shown might be incorrect. ⚠️
      `,
    },
    app: React.lazy(() => import('./Plinko')),
  },
  {
    id: 'crash',
    meta: {
      background: '#de95e8',
      image: '/games/crash.png',
      name: 'Crash',
      description: `
      預測一個倍率目標，並看著火箭嘗試到達該目標。如果火箭在到達目標前墜毀，玩家將失敗；如果火箭達到或超過目標，玩家將獲勝。這款遊戲融合了嫦娥奔月的傳說，每當火箭飛向目標，就如同嫦娥乘著火箭奔向月亮，充滿了冒險與浪漫的色彩。
      `,
    },
    app: React.lazy(() => import('./CrashGame')),
  },
]
