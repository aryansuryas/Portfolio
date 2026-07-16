import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !finePointer) return undefined;

    document.body.classList.add('cursor-on');

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;
    let raf;

    const onMove = e => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onDown = () => dot.classList.add('clicking');
    const onUp = () => dot.classList.remove('clicking');
    const onOver = e => {
      if (e.target.closest('a,button,input,textarea')) ring.classList.add('hovered');
    };
    const onOut = e => {
      if (e.target.closest('a,button,input,textarea')) ring.classList.remove('hovered');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    const loop = () => {
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.body.classList.remove('cursor-on');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cur-dot" ref={dotRef} aria-hidden="true" />
      <div id="cur-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
