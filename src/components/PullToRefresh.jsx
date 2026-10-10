import React, { useState, useRef, useEffect } from "react";
import { Loader2, ChevronDown } from "lucide-react";

const THRESHOLD = 70;
const MAX_PULL = 100;
const RESISTANCE = 0.4;

export default function PullToRefresh({ onRefresh, children }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);
  const pullDist = useRef(0);
  const refreshingRef = useRef(false);
  const onRefreshRef = useRef(onRefresh);

  useEffect(() => { onRefreshRef.current = onRefresh; }, [onRefresh]);
  useEffect(() => { refreshingRef.current = refreshing; }, [refreshing]);

  useEffect(() => {
    const handleStart = (e) => {
      if (window.scrollY > 0 || refreshingRef.current) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    };

    const handleMove = (e) => {
      if (!pulling.current || refreshingRef.current) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0 && window.scrollY === 0) {
        e.preventDefault();
        const dist = Math.min(delta * RESISTANCE, MAX_PULL);
        pullDist.current = dist;
        setPullDistance(dist);
      }
    };

    const handleEnd = async () => {
      if (!pulling.current || refreshingRef.current) return;
      pulling.current = false;
      if (pullDist.current >= THRESHOLD) {
        setRefreshing(true);
        setPullDistance(THRESHOLD);
        refreshingRef.current = true;
        try {
          await onRefreshRef.current?.();
        } finally {
          setRefreshing(false);
          setPullDistance(0);
          refreshingRef.current = false;
        }
      } else {
        setPullDistance(0);
      }
      pullDist.current = 0;
    };

    document.addEventListener("touchstart", handleStart, { passive: true });
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleStart);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  return (
    <>
      <div className="flex items-end justify-center overflow-hidden" style={{ height: pullDistance }}>
        <div className="flex items-center justify-center pb-2">
          {refreshing ? (
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
          ) : (
            <ChevronDown
              className="w-5 h-5 text-accent transition-transform duration-150"
              style={{
                transform: `scale(${Math.min(pullDistance / THRESHOLD, 1)})`,
                opacity: Math.min(pullDistance / THRESHOLD, 1),
              }}
            />
          )}
        </div>
      </div>
      {children}
    </>
  );
}