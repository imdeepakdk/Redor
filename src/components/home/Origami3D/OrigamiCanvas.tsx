"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrigamiMesh } from "./OrigamiMesh";

export const OrigamiCanvas: React.FC = () => {
  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 42 }}
        dpr={[1, 1.5]} // Cap DPR at 1.5 for crisp performance without mobile GPU overheat
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        {/* Soft Studio Lighting */}
        <ambientLight intensity={0.8} />
        {/* Primary Key Light */}
        <directionalLight position={[4, 5, 3]} intensity={1.3} color="#FFFFFF" />
        {/* Warm Fill Light */}
        <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#FF8A80" />
        {/* Cool Rim Light */}
        <directionalLight position={[0, -4, -3]} intensity={0.4} color="#ECEFF1" />
        
        {/* 3D Folded Origami Mesh */}
        <OrigamiMesh />
      </Canvas>
    </div>
  );
};

export default OrigamiCanvas;
