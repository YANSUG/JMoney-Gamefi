"use client";
// src/games/Wheel/index.tsx

import * as PIXI from "pixi.js";

import {
  DEGEN_BET,
  DEGEN_SEGMENT_COLORS,
  DEGEN_WHEEL_SEGMENTS,
  REGULAR_BET,
  REGULAR_SEGMENT_COLORS,
  REGULAR_WHEEL_SEGMENTS,
  SBF_BET,
  SBF_SEGMENT_COLORS,
  SBF_WHEEL_SEGMENTS,
  SOUND_LOSE,
  SOUND_SPIN,
  SOUND_WIN,
} from "./game";
import { GambaUi, useSound, useWagerInput } from "gamba-react-ui-v2";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { drawTicker, drawWheel, radius } from "./wheel";

const WheelGame = () => {
  const [wager, setWager] = useWagerInput();
  const [spinning, setSpinning] = useState(false);
  const [gameMode, setGameMode] = useState("regular");
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const game = GambaUi.useGame();
  const sounds = useSound({
    spin: SOUND_SPIN,
    win: SOUND_WIN,
    lose: SOUND_LOSE,
  });

  useEffect(() => {
    const app = new PIXI.Application({
      width: 500,
      height: 500,
      backgroundColor: 0x0c0c11,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    appRef.current = app;

    const wheel = new PIXI.Container();
    wheel.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(wheel as PIXI.DisplayObject);
    drawWheel(wheel, REGULAR_WHEEL_SEGMENTS, REGULAR_SEGMENT_COLORS);
    drawTicker(app, radius);

    if (wheelContainerRef.current) {
      wheelContainerRef.current.appendChild(app.view as unknown as Node);
      if (app.view && app.view.style) {
        app.view.style.width = "100%";
        app.view.style.height = "100%";
      }
    }

    return () =>
      app.destroy(true, { children: true, texture: true, baseTexture: true });
  }, []);

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    const wheel = app.stage.children[0] as PIXI.Container;

    switch (gameMode) {
      case "degen":
        drawWheel(wheel, DEGEN_WHEEL_SEGMENTS, DEGEN_SEGMENT_COLORS);
        break;
      case "sbf":
        drawWheel(wheel, SBF_WHEEL_SEGMENTS, SBF_SEGMENT_COLORS);
        break;
      default:
        drawWheel(wheel, REGULAR_WHEEL_SEGMENTS, REGULAR_SEGMENT_COLORS);
        break;
    }
  }, [gameMode]);

  const spinWheel = useCallback(async () => {
    if (!appRef.current) return;

    if (!appRef.current) {
      console.error("PIXI Application is not initialized.");
      return;
    }
    const wheel = appRef.current.stage.children[0] as PIXI.Container;
    if (!wheel) {
      console.error("Wheel is not found in the PIXI application.");
      return;
    }

    wheel.rotation %= 2 * Math.PI;

    let bet: number[];
    let segments: string[];
    switch (gameMode) {
      case "degen":
        bet = DEGEN_BET;
        segments = DEGEN_WHEEL_SEGMENTS;
        break;
      case "sbf":
        bet = SBF_BET;
        segments = SBF_WHEEL_SEGMENTS;
        break;
      default:
        bet = REGULAR_BET;
        segments = REGULAR_WHEEL_SEGMENTS;
    }

    await game.play({ wager, bet });
    setSpinning(true);
    const result = await game.result();
    sounds.play("spin", { playbackRate: 0.5 });

    const segmentAngle = 360 / segments.length;
    const halfSegmentOffset = segmentAngle / 2;
    const finalAngleAdjustment = 360 * 5;
    const finalRotationAngle = -(
      finalAngleAdjustment +
      result.resultIndex * segmentAngle +
      halfSegmentOffset -
      90
    );

    gsap.to(wheel, {
      rotation: finalRotationAngle * (Math.PI / 180),
      duration: 8,
      ease: "power2.out",
      yoyo: true,
      onComplete: () => {
        setSpinning(false);
        const winningSegmentValue = segments[result.resultIndex];

        const isWin = winningSegmentValue !== "0X";

        if (isWin) {
          sounds.play("win");
        } else {
          sounds.play("lose");
        }
      },
    });
  }, [game, sounds, wager, gameMode]);

  // TODO: SBF mode needs some working doesnt seem to hit correctly each time
  // const gameModeOptions: string[] = ["regular", "degen", "sbf"];
  const gameModeOptions: string[] = ["regular", "degen"];

  return (
    <>
      <GambaUi.Portal target="screen">
        <div className="flex flex-col justify-center items-center">
          <div ref={wheelContainerRef} />
        </div>
      </GambaUi.Portal>
      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <span>Mode:</span>
        <GambaUi.Select
          options={gameModeOptions}
          value={gameMode}
          onChange={setGameMode}
          label={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
        />
        <GambaUi.PlayButton onClick={spinWheel} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </GambaUi.PlayButton>
      </GambaUi.Portal>
    </>
  );
};

export default WheelGame;