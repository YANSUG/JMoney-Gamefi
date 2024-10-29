// src/components/sections/Game/ProvablyFairModal.tsx

import { GambaPlatformContext, GambaUi } from "gamba-react-ui-v2";
import React, { useContext } from "react";
import { useGamba, useGambaProgram, useSendTransaction } from "gamba-react-v2";

import GambaPlayButton from "@/components/ui/GambaPlayButton";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

export function ProvablyFairModal(props: { onClose: () => void }) {
  const gamba = useGamba();
  const platform = useContext(GambaPlatformContext);
  const program = useGambaProgram();
  const sendTransaction = useSendTransaction();

  const initialize = async () => {
    sendTransaction(
      program.methods.playerInitialize().accounts({}).instruction(),
    );
  };

  return (
    <Modal onClose={() => props.onClose()}>
      <h1 className="text-2xl font-bold">可證公平性</h1>
      {!gamba.userCreated && (
        <>
          <p>
            可證公平性讓您可以驗證每場遊戲的結果都是隨機生成的。由於您是第一次使用這個錢包遊玩，您可以提前請求初始的哈希種子。之後每次遊玩時將自動完成此步驟。
          </p>
          <GambaPlayButton onClick={initialize} text="取得哈希種子" />
        </>
      )}
      {gamba.userCreated && (
        <>
          <p>
            您的客戶端種子將會影響您下一場遊戲的結果。
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              width: "100%",
              padding: "20px",
            }}
          >
            <div>下一次隨機數種子 (sha256)</div>
            <GambaUi.TextInput value={gamba.nextRngSeedHashed || ""} disabled />
            <div>客戶端種子</div>
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <GambaUi.TextInput
                style={{ flexGrow: "1" }}
                value={platform.clientSeed}
                disabled={gamba.isPlaying}
                maxLength={32}
                onChange={platform.setClientSeed}
              />
              <GambaUi.Button
                disabled={gamba.isPlaying}
                onClick={() =>
                  platform.setClientSeed(String((Math.random() * 1e9) | 0))
                }
              >
                <Icon.Shuffle />
              </GambaUi.Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
