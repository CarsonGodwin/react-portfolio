import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSandbox } from "./engine/sandbox";
import HUD from "./hud/HUD";
import EntityModal from "./hud/EntityModal";

const EMPTY_PROGRESS = { opened: 0, total: 0 };

const Arena = ({ onExit }) => {
  const canvasRef = useRef(null);
  const sandboxRef = useRef(null);
  const [entity, setEntity] = useState(null);
  const [progress, setProgress] = useState(EMPTY_PROGRESS);
  const [gravityOn, setGravityOn] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const sandbox = createSandbox(canvasRef.current, {
      onOpen: setEntity,
      onProgress: setProgress
    });
    sandboxRef.current = sandbox;
    sandbox.start();

    const onResize = () => sandbox.resize();
    window.addEventListener("resize", onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const hintTimer = window.setTimeout(() => setShowHint(false), 9000);

    return () => {
      window.clearTimeout(hintTimer);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      sandbox.stop();
      sandboxRef.current = null;
    };
  }, []);

  useEffect(() => {
    sandboxRef.current?.setPaused(Boolean(entity));
  }, [entity]);

  useEffect(() => {
    if (progress.total > 0 && progress.opened === progress.total) {
      setToast("That's everything. Thanks for poking around.");
      const id = window.setTimeout(() => setToast(null), 5000);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [progress]);

  const shake = useCallback(() => sandboxRef.current?.shake(), []);
  const reset = useCallback(() => sandboxRef.current?.reset(), []);
  const toggleGravity = useCallback(() => {
    const on = sandboxRef.current?.toggleGravity();
    if (on !== undefined) setGravityOn(on);
  }, []);
  const closeModal = useCallback(() => setEntity(null), []);

  // Keyboard shortcuts mirror the HUD buttons. Ignored while a modal is open
  // so Space/Esc there behave normally.
  useEffect(() => {
    if (entity) return undefined;
    const onKey = (event) => {
      if (event.target instanceof HTMLElement && event.target.tagName === "BUTTON" && event.key === " ") return;
      if (event.key === " ") {
        event.preventDefault();
        shake();
      } else if (event.key === "g" || event.key === "G") {
        toggleGravity();
      } else if (event.key === "r" || event.key === "R") {
        reset();
      } else if (event.key === "Escape") {
        onExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entity, shake, reset, toggleGravity, onExit]);

  return (
    <div className="fixed inset-0 z-40 bg-background">
      <canvas ref={canvasRef} className="block h-full w-full touch-none" aria-hidden="true" />
      <HUD
        progress={progress}
        gravityOn={gravityOn}
        showHint={showHint}
        toast={toast}
        onExit={onExit}
        onShake={shake}
        onReset={reset}
        onToggleGravity={toggleGravity}
      />
      <EntityModal entity={entity} onClose={closeModal} />
    </div>
  );
};

export default Arena;
