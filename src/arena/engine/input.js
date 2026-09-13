const MOVE_KEYS = new Set([
  "KeyW", "KeyA", "KeyS", "KeyD",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "Space"
]);

export const createInput = (canvas) => {
  const state = {
    keys: new Set(),
    mouse: { x: 0, y: 0, down: false, inside: false },
    hasMoved: false
  };

  const onKeyDown = (event) => {
    if (!MOVE_KEYS.has(event.code)) return;
    event.preventDefault();
    state.keys.add(event.code);
    if (event.code !== "Space") state.hasMoved = true;
  };
  const onKeyUp = (event) => state.keys.delete(event.code);
  const onBlur = () => {
    state.keys.clear();
    state.mouse.down = false;
  };
  const onMouseMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    state.mouse.x = event.clientX - rect.left;
    state.mouse.y = event.clientY - rect.top;
    state.mouse.inside = true;
  };
  const onMouseDown = (event) => {
    if (event.button === 0) state.mouse.down = true;
  };
  const onMouseUp = () => {
    state.mouse.down = false;
  };
  const onMouseLeave = () => {
    state.mouse.inside = false;
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("blur", onBlur);
  window.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseleave", onMouseLeave);

  return {
    state,
    axis() {
      const k = state.keys;
      const x = (k.has("KeyD") || k.has("ArrowRight") ? 1 : 0) - (k.has("KeyA") || k.has("ArrowLeft") ? 1 : 0);
      const y = (k.has("KeyS") || k.has("ArrowDown") ? 1 : 0) - (k.has("KeyW") || k.has("ArrowUp") ? 1 : 0);
      return { x, y };
    },
    firing() {
      return state.mouse.down || state.keys.has("Space");
    },
    detach() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    }
  };
};
