"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
} from "three";
import styles from "./HomeHero.module.css";

function muteThreeClockDeprecationWarning() {
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }

  const originalWarn = console.warn;

  console.warn = (...args) => {
    const [message] = args;

    if (
      typeof message === "string" &&
      message.includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }

    originalWarn(...args);
  };

  return () => {
    console.warn = originalWarn;
  };
}

function canUseWebGL() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function createEarthTexture(isMobile: boolean) {
  const size = isMobile ? 1024 : 1536;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size / 2;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const ocean = context.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#0c1b2f");
  ocean.addColorStop(0.5, "#10243b");
  ocean.addColorStop(1, "#07111f");
  context.fillStyle = ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.globalAlpha = 0.85;
  context.fillStyle = "#2f5f54";

  const landMasses = [
    [0.56, 0.34, 0.13, 0.08, -0.18],
    [0.66, 0.44, 0.09, 0.16, 0.28],
    [0.47, 0.48, 0.1, 0.11, 0.12],
    [0.31, 0.42, 0.12, 0.1, -0.1],
    [0.24, 0.58, 0.08, 0.13, 0.36],
    [0.79, 0.55, 0.1, 0.08, -0.24],
  ];

  for (const [x, y, width, height, rotation] of landMasses) {
    context.save();
    context.translate(x * canvas.width, y * canvas.height);
    context.rotate(rotation);
    context.beginPath();
    context.ellipse(0, 0, width * canvas.width, height * canvas.height, 0, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }

  context.globalAlpha = 0.28;
  context.strokeStyle = "#d9e4ea";
  context.lineWidth = isMobile ? 1.2 : 1.7;

  for (let i = 0; i < 26; i += 1) {
    const y = ((i + 0.5) / 26) * canvas.height;
    context.beginPath();
    context.moveTo(0, y);

    for (let x = 0; x <= canvas.width; x += 40) {
      const wave = Math.sin(x * 0.011 + i * 0.8) * 4;
      context.lineTo(x, y + wave);
    }

    context.stroke();
  }

  context.globalAlpha = 0.5;
  context.fillStyle = "#f6f8fb";

  for (let i = 0; i < 58; i += 1) {
    const x = ((i * 131) % canvas.width) + Math.sin(i) * 12;
    const y = ((i * 79) % canvas.height) + Math.cos(i) * 8;
    const radius = (isMobile ? 1.5 : 2.1) + (i % 4) * 0.55;

    context.beginPath();
    context.ellipse(x, y, radius * 7.5, radius, Math.sin(i) * 0.9, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = isMobile ? 2 : 6;
  texture.needsUpdate = true;

  return texture;
}

function EarthModel({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<Group>(null);
  const earthRef = useRef<Mesh>(null);
  const pointerTarget = useRef(new Vector2(0, 0));
  const pointerCurrent = useRef(new Vector2(0, 0));
  const elapsedRef = useRef(0);

  const texture = useMemo(() => createEarthTexture(isMobile), [isMobile]);
  const earthGeometry = useMemo(
    () => new SphereGeometry(3.25, isMobile ? 48 : 96, isMobile ? 24 : 48),
    [isMobile],
  );
  const atmosphereGeometry = useMemo(
    () => new SphereGeometry(3.34, isMobile ? 48 : 96, isMobile ? 24 : 48),
    [isMobile],
  );
  const earthMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        map: texture,
        color: new Color("#d8ecf6"),
        roughness: 0.86,
        metalness: 0.02,
      }),
    [texture],
  );
  const atmosphereMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: new Color("#8fd3ff"),
        transparent: true,
        opacity: isMobile ? 0.1 : 0.13,
        blending: AdditiveBlending,
        side: BackSide,
        depthWrite: false,
      }),
    [isMobile],
  );

  useFrame(({ pointer }, delta) => {
    elapsedRef.current += delta;
    pointerTarget.current.set(pointer.x * 0.16, pointer.y * 0.08);
    pointerCurrent.current.lerp(pointerTarget.current, 0.035);

    if (groupRef.current) {
      groupRef.current.rotation.x = -0.22 + pointerCurrent.current.y;
      groupRef.current.rotation.y = -0.44 + pointerCurrent.current.x;
    }

    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedRef.current * 0.035;
    }
  });

  useEffect(() => {
    return () => {
      texture?.dispose();
      earthGeometry.dispose();
      atmosphereGeometry.dispose();
      earthMaterial.dispose();
      atmosphereMaterial.dispose();
    };
  }, [atmosphereGeometry, atmosphereMaterial, earthGeometry, earthMaterial, texture]);

  return (
    <group ref={groupRef} position={[isMobile ? 0.25 : 1.15, isMobile ? -2.65 : -2.35, 0]}>
      <mesh ref={earthRef} geometry={earthGeometry} material={earthMaterial} />
      <mesh geometry={atmosphereGeometry} material={atmosphereMaterial} />
    </group>
  );
}

export function EarthScene() {
  const [isReady, setIsReady] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const restoreWarn = muteThreeClockDeprecationWarning();
    const mobileQuery = window.matchMedia("(max-width: 760px), (pointer: coarse)");
    let frame = 0;

    const updateDeviceProfile = () => {
      setIsMobile(mobileQuery.matches);
    };

    frame = window.requestAnimationFrame(() => {
      setIsSupported(canUseWebGL());
      setIsReady(true);
      updateDeviceProfile();
    });

    mobileQuery.addEventListener("change", updateDeviceProfile);

    return () => {
      restoreWarn?.();
      window.cancelAnimationFrame(frame);
      mobileQuery.removeEventListener("change", updateDeviceProfile);
    };
  }, []);

  if (!isReady || !isSupported) {
    return (
      <div className={styles.earthFallback} aria-hidden="true">
        <div className={styles.earthFallbackGlow} />
        <div className={styles.earthFallbackDisc} />
      </div>
    );
  }

  return (
    <div className={styles.earthCanvas} aria-hidden="true">
      <Canvas
        camera={{
          fov: isMobile ? 34 : 30,
          position: [0, 0, isMobile ? 8.1 : 7.45],
        }}
        dpr={isMobile ? [1, 1.15] : [1, 1.65]}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
      >
        <ambientLight intensity={0.12} />
        <directionalLight color="#f8fafc" intensity={2.15} position={[-4.5, 2.8, 4.5]} />
        <directionalLight color="#1d4ed8" intensity={0.22} position={[3.5, -1.5, 2]} />
        <EarthModel isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
