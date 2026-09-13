import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'pointer' | 'view' | 'read' | 'book' | 'text' | 'custom';

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Target mouse position
  const mousePos = useRef({ x: -100, y: -100 });
  // Main cursor animated position (lerp)
  const cursorDot = useRef({ x: -100, y: -100 });
  // Follower smoothed ring position
  const followerRing = useRef({ x: -100, y: -100 });
  // Magnetic pulled element ref
  const magneticElementRef = useRef<HTMLElement | null>(null);

  const mainCursorRef = useRef<HTMLDivElement | null>(null);
  const trailRingRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch-only screen
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let lastHoveredEl: HTMLElement | null = null;
    let cachedRect: DOMRect | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };

      // Fast check: target element for cursor behavior
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest<HTMLElement>(
        'button, a, input, textarea, select, [role="button"], [data-cursor], .cursor-pointer'
      );

      if (interactiveEl) {
        if (interactiveEl !== lastHoveredEl) {
          lastHoveredEl = interactiveEl;
          cachedRect = interactiveEl.getBoundingClientRect();

          const customCursorType = interactiveEl.getAttribute('data-cursor') as CursorMode | null;
          if (customCursorType === 'view') {
            setMode('view');
            setIsHovered(true);
          } else if (customCursorType === 'read') {
            setMode('read');
            setIsHovered(true);
          } else if (customCursorType === 'book') {
            setMode('book');
            setIsHovered(true);
          } else if (
            customCursorType === 'text' ||
            interactiveEl.tagName === 'INPUT' ||
            interactiveEl.tagName === 'TEXTAREA'
          ) {
            setMode('text');
            setIsHovered(false);
          } else {
            setMode('pointer');
            setIsHovered(true);
          }
        }

        // Smooth Magnetic Pull without synchronous layout recalculation
        if (
          cachedRect &&
          cachedRect.width <= 320 &&
          cachedRect.height <= 120 &&
          !interactiveEl.classList.contains('no-magnetic')
        ) {
          magneticElementRef.current = interactiveEl;
          const centerX = cachedRect.left + cachedRect.width / 2;
          const centerY = cachedRect.top + cachedRect.height / 2;
          const pullX = (x - centerX) * 0.14;
          const pullY = (y - centerY) * 0.14;

          interactiveEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
          interactiveEl.style.transition = 'transform 0.12s ease-out';
        }
      } else {
        if (lastHoveredEl) {
          if (magneticElementRef.current) {
            magneticElementRef.current.style.transform = '';
            magneticElementRef.current.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)';
            magneticElementRef.current = null;
          }
          lastHoveredEl = null;
          cachedRect = null;
          setMode('default');
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      if (magneticElementRef.current) {
        magneticElementRef.current.style.transform = '';
        magneticElementRef.current = null;
      }
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Render loop with lerp smoothing
    const updateCursor = () => {
      // Main cursor lerp
      const lerpSpeed = isHovered ? 0.24 : 0.2;
      cursorDot.current.x += (mousePos.current.x - cursorDot.current.x) * lerpSpeed;
      cursorDot.current.y += (mousePos.current.y - cursorDot.current.y) * lerpSpeed;

      // Secondary follower lerp
      const trailSpeed = isHovered ? 0.14 : 0.12;
      followerRing.current.x += (cursorDot.current.x - followerRing.current.x) * trailSpeed;
      followerRing.current.y += (cursorDot.current.y - followerRing.current.y) * trailSpeed;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${cursorDot.current.x}px, ${cursorDot.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailRingRef.current) {
        trailRingRef.current.style.transform = `translate3d(${followerRing.current.x}px, ${followerRing.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };

    animationFrameRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (magneticElementRef.current) {
        magneticElementRef.current.style.transform = '';
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]);

  if (isTouchDevice || !isVisible) return null;

  const isView = mode === 'view';
  const isRead = mode === 'read';
  const isBook = mode === 'book';
  const isPointer = mode === 'pointer';
  const isText = mode === 'text';

  return (
    <div
      id="custom-cursor-container"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Secondary Soft Ambient Follower Ring (No Blur / No Fading) */}
      {!isText && (
        <div
          ref={trailRingRef}
          className={`absolute top-0 left-0 rounded-full transition-all duration-200 pointer-events-none will-change-transform bg-transparent ${
            isView || isRead || isBook
              ? 'w-16 h-16 border border-emerald-400/50'
              : isPointer
              ? 'w-12 h-12 border border-[#7DBFFF]/60'
              : 'w-9 h-9 border border-white/25'
          }`}
          style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
        />
      )}

      {/* Primary Crisp Cursor (Crystal Clear, No Fading or Backdrop Blur) */}
      <div
        ref={mainCursorRef}
        className={`absolute top-0 left-0 rounded-full transition-all duration-150 ease-out will-change-transform flex items-center justify-center pointer-events-none ${
          isText
            ? 'w-1 h-5 bg-emerald-400 rounded-sm'
            : isView
            ? 'w-16 h-16 bg-zinc-950/70 border-2 border-emerald-400 shadow-md scale-100'
            : isRead
            ? 'w-16 h-16 bg-zinc-950/70 border-2 border-sky-400 shadow-md scale-100'
            : isBook
            ? 'w-16 h-16 bg-zinc-950/70 border-2 border-[#923FFF] shadow-md scale-100'
            : isPointer
            ? isMouseDown
              ? 'w-7 h-7 bg-transparent border-2 border-emerald-400 scale-90'
              : 'w-8 h-8 bg-transparent border-2 border-emerald-400 scale-100'
            : isMouseDown
            ? 'w-4 h-4 bg-sky-400/80 rounded-full scale-90'
            : 'w-3.5 h-3.5 bg-emerald-400/90 rounded-full shadow-sm'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        {isPointer && !isView && !isRead && !isBook && (
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        )}
        {isView && (
          <span className="text-[9px] font-mono font-bold text-emerald-300 uppercase tracking-wider">
            VIEW ↗
          </span>
        )}
        {isRead && (
          <span className="text-[9px] font-mono font-bold text-sky-300 uppercase tracking-wider">
            READ ↗
          </span>
        )}
        {isBook && (
          <span className="text-[9px] font-mono font-bold text-[#7DBFFF] uppercase tracking-wider">
            BOOK ↗
          </span>
        )}
      </div>
    </div>
  );
}
