import React, { useCallback, useEffect, useRef, useState } from "react";
import { createGame } from "./engine/game";
import HUD from "./hud/HUD";
import EntityModal from "./hud/EntityModal";

const EMPTY_PROGRESS = { projects: [0, 0], roles: [0, 0], skills: [0, 0], contact: false };

const Arena = ({ onExit }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [entity, setEntity] = useState(null);
  const [collected, setCollected] = useState([]);
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [showHint, setShowHint] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const game = createGame(canvas, {
      onOpen: (target) => {
        setEntity(target);
        setProgress(game.progress());
      },
      onPickup: (picked) => {
        setCollected((prev) => [...prev, ...picked.map((p) => p.label)]);
        setProgress(game.progress());
      },
      onFirstMove: () => {
        window.setTimeout(() => setShowHint(false), 4000);
      }
    });
    gameRef.current = game;
    setProgress(game.progress());
    game.start();

    const onResize = () => game.resize();
    window.addEventListener("resize", onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      game.stop();
      gameRef.current = null;
    };
  }, []);

  useEffect(() => {
    gameRef.current?.setPaused(Boolean(entity));
  }, [entity]);

  useEffect(() => {
    if (progress.skills[1] > 0 && progress.skills[0] === progress.skills[1]) {
      setToast("Full stack — every skill collected");
      const id = window.setTimeout(() => setToast(null), 4000);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [progress]);

  const closeModal = useCallback(() => setEntity(null), []);

  return (
    <div className="fixed inset-0 z-40 bg-background">
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-none"
        aria-hidden="true"
      />
      <HUD
        progress={progress}
        collected={collected}
        showHint={showHint}
        toast={toast}
        onExit={onExit}
      />
      <EntityModal entity={entity} onClose={closeModal} />
    </div>
  );
};

export default Arena;
