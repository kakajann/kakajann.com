"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const lerp = (start: number, end: number, t: number) =>
  (1 - t) * start + t * end;

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const distanceBetweenPoints = (
  x1: number,
  x2: number,
  y1: number,
  y2: number
) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.hypot(dx, dy);
};

const Avatar = () => {
  const svgRef = useRef(null);
  const displacementMapRef = useRef(null);
  const cursor = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const cachedCursor = useRef({ ...cursor.current });
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      windowSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      cursor.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0,
    };

    const render = () => {
      let targetX = lerp(
        imgValues.imgTransforms.x,
        mapRange(cursor.current.x, 0, windowSize.current.width, -120, 120),
        0.1
      );
      let targetY = lerp(
        imgValues.imgTransforms.y,
        mapRange(cursor.current.y, 0, windowSize.current.height, -120, 120),
        0.1
      );
      const targetRz = lerp(
        imgValues.imgTransforms.rz,
        mapRange(cursor.current.x, 0, windowSize.current.width, -10, 10),
        0.1
      );

      const bound = 50;

      if (targetX > bound) targetX = bound + (targetX - bound) * 0.2;
      if (targetX < -bound) targetX = -bound + (targetX + bound) * 0.2;
      if (targetY > bound) targetY = bound + (targetY - bound) * 0.2;
      if (targetY < -bound) targetY = -bound + (targetY + bound) * 0.2;

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      gsap.set(svgRef.current, {
        x: imgValues.imgTransforms.x,
        y: imgValues.imgTransforms.y,
        rotateZ: imgValues.imgTransforms.rz,
      });

      const cursorTravelledDistance = distanceBetweenPoints(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        mapRange(cursorTravelledDistance, 0, 200, 0, 400),
        0.06
      );

      gsap.set(displacementMapRef.current, {
        attr: { scale: imgValues.displacementScale },
      });

      cachedCursor.current = { ...cursor.current };

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-[600px] h-[600px]" ref={svgRef}>
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="relative w-full h-full block will-change-transform"
      >
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href="/images/avatar.webp"
            x="0"
            y="0"
            width="600"
            height="600"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
    </div>
  );
};

export default Avatar;
