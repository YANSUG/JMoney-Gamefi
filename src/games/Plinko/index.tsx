// src/games/Plinko/index.tsx
import React, {
  DependencyList,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { GambaUi, useSound, useWagerInput } from "gamba-react-ui-v2";
import { useGamba } from "gamba-react-v2";

import GambaPlayButton from "@/components/ui/GambaPlayButton";
import {
  PEG_RADIUS,
  PLINKO_RAIUS,
  Plinko as PlinkoGame,
  PlinkoProps,
  barrierHeight,
  barrierWidth,
  bucketHeight,
} from "./game";

function usePlinko(props: PlinkoProps, deps: DependencyList) {
  const [plinko, set] = useState<PlinkoGame>(null!);

  useEffect(() => {
    const p = new PlinkoGame(props);
    set(p);
    return () => p.cleanup();
  }, deps);

  return plinko;
}

const SOUND_PATHS = {
  bump: "/games/plinko/bump.mp3",
  win: "/games/plinko/win.mp3",
  fall: "/games/plinko/fall.mp3",
};

const DEGEN_BET = Array(43).fill(0).concat([2, 2, 10, 10, 10, 15]);
const BET = Array(48).fill(0.5).concat(Array(10).fill(1.5), Array(7).fill(3), [6]);

export default function Plinko() {
  const game = GambaUi.useGame();
  const gamba = useGamba();
  const [wager, setWager] = useWagerInput();
  const [debug, setDebug] = useState(false);
  const [degen, setDegen] = useState(false);
  const sounds = useSound(SOUND_PATHS);

  const pegAnimations = useRef<Record<number, number>>({});
  const bucketAnimations = useRef<Record<number, number>>({});

  const bet = degen ? DEGEN_BET : BET;
  const rows = degen ? 12 : 14;
  const multipliers = useMemo(() => Array.from(new Set(bet)), [bet]);

  const plinko = usePlinko({
    rows,
    multipliers,
    onContact(contact) {
      if (contact.peg) {
        pegAnimations.current[contact.peg.plugin.pegIndex] = 1;
        sounds.play("bump", { playbackRate: 1 + Math.random() * 0.05 });
      }
      if (contact.barrier) {
        sounds.play("bump", { playbackRate: 0.5 + Math.random() * 0.05 });
      }
      if (contact.bucket) {
        bucketAnimations.current[contact.bucket.plugin.bucketIndex] = 1;
        sounds.play(
          contact.bucket.plugin.bucketMultiplier >= 1 ? "win" : "fall"
        );
      }
    },
  }, [rows, multipliers]);

  const play = async () => {
    try {
      plinko.reset();
      await game.play({ wager, bet });
      const result = await gamba.result();
      plinko.run(result.multiplier);
    } catch (err: any) {
      toast.error(`An error occurred: ${err.message}`);
      plinko.reset();
    }
  };

  return (
    <>
      <GambaUi.Portal target="screen">
        <GambaUi.Canvas
          render={({ ctx, size }, clock) => {
            if (!plinko) return;
            const bodies = plinko.getBodies();
            const s = Math.min(size.width / plinko.width, size.height / plinko.height);

            ctx.clearRect(0, 0, size.width, size.height);
            ctx.fillStyle = "#1A1B28";
            ctx.fillRect(0, 0, size.width, size.height);

            ctx.save();
            ctx.translate(
              size.width / 2 - (plinko.width / 2) * s,
              size.height / 2 - (plinko.height / 2) * s
            );
            ctx.scale(s, s);

            bodies.forEach((body, i) => {
              const { label, position } = body;
              ctx.save();
              ctx.translate(position.x, position.y);

              switch (label) {
                case "Peg": {
                  const animation = pegAnimations.current[body.plugin.pegIndex] ?? 0;
                  pegAnimations.current[body.plugin.pegIndex] *= 0.9;

                  const hue = (position.x + position.y + Date.now() * 0.05) % 360;
                  ctx.scale(1 + animation * 0.4, 1 + animation * 0.4);
                  ctx.fillStyle = `hsla(${hue}, 75%, 60%, ${(1 + animation * 2) * 0.2})`;
                  ctx.beginPath();
                  ctx.arc(0, 0, PEG_RADIUS + 4, 0, Math.PI * 2);
                  ctx.fill();

                  ctx.fillStyle = `hsla(${hue}, 85%, ${75 + animation * 25}%, 1)`;
                  ctx.beginPath();
                  ctx.arc(0, 0, PEG_RADIUS, 0, Math.PI * 2);
                  ctx.fill();
                  break;
                }
                case "Plinko": {
                  const hue = (i * 420) % 360;
                  ctx.fillStyle = `hsla(${hue}, 75%, 90%, 0.2)`;
                  ctx.beginPath();
                  ctx.arc(0, 0, PLINKO_RAIUS * 1.5, 0, Math.PI * 2);
                  ctx.fill();

                  ctx.fillStyle = `hsla(${hue}, 75%, 75%, 1)`;
                  ctx.beginPath();
                  ctx.arc(0, 0, PLINKO_RAIUS, 0, Math.PI * 2);
                  ctx.fill();
                  break;
                }
                case "Bucket": {
                  const animation = bucketAnimations.current[body.plugin.bucketIndex] ?? 0;
                  bucketAnimations.current[body.plugin.bucketIndex] *= 0.9;

                  const hue = 25 + (multipliers.indexOf(body.plugin.bucketMultiplier) / multipliers.length) * 125;
                  ctx.save();
                  ctx.translate(0, bucketHeight / 2);
                  ctx.scale(1, 1 + animation * 2);
                  ctx.fillStyle = `hsla(${hue}, 75%, 75%, ${0.05 + animation})`;
                  ctx.fillRect(-25, -bucketHeight, 50, bucketHeight);
                  ctx.restore();

                  ctx.font = "20px Arial";
                  ctx.textAlign = "center";
                  ctx.fillStyle = `hsla(${hue}, 75%, ${75 + animation * 25}%, 1)`;
                  ctx.strokeText(`x${body.plugin.bucketMultiplier}`, 0, 0);
                  ctx.fillText(`x${body.plugin.bucketMultiplier}`, 0, 0);
                  break;
                }
                case "Barrier": {
                  ctx.fillStyle = "#cccccc22";
                  ctx.fillRect(-barrierWidth / 2, -barrierHeight / 2, barrierWidth, barrierHeight);
                  break;
                }
              }
              ctx.restore();
            });
            ctx.restore();
          }}
        />
      </GambaUi.Portal>

      <GambaUi.Portal target="controls">
        <GambaUi.WagerInput value={wager} onChange={setWager} />
        <div>Degen:</div>
        <GambaUi.Switch disabled={gamba.isPlaying} checked={degen} onChange={setDegen} />
        <GambaPlayButton onClick={play} text="Play" />
      </GambaUi.Portal>
    </>
  );
}

