"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const BackgroundBlur = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);

  const initParticles = useCallback(async () => {
    await initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });

    setIsReady(true);
  }, []);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: { value: "#0a0a0a" },
      },
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          trail: {
            delay: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            maxSpeed: 50,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 60,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            maxSpeed: 50,
            easing: "ease-out-quad",
          },
          slow: {
            factor: 3,
            radius: 200,
          },
        },
      },
      particles: {
        move: {
          enable: true,
        },
        number: {
          density: {
            enable: true,
          },
          value: 100,
        },
        shape: {
          type: "polygon",
        },
        color: {
          value: [
            "rgb(54, 101, 133)",
            "rgb(42, 63, 77)",
            "rgb(17, 47, 56)",
            "rgb(0, 0, 0)",
            "rgb(77, 54, 133)",
            "rgb(54, 101, 133)",
          ],
        },
        size: {
          value: {
            min: 1,
            max: 5,
          },
        },
      },
      motion: {
        reduce: {
          factor: 4,
          value: true,
        },
      },
    }),
    []
  );

  if (!isReady) {
    return children;
  }

  return (
    <>
      <div className="fixed inset-0 z-0">
        <div className="absolute w-lvw h-lvh backdrop-blur-3xl z-10">
          <div className="w-full h-full bg-[length:128px] bg-[url(/images/noise.png)] bg-repeat opacity-[0.075]" />
        </div>
        <Particles options={options} />
      </div>
      {children}
    </>
  );
};

export default BackgroundBlur;
