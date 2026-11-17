"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 8 Origami Facet definitions matching the exact REDOR logo geometry
// Coordinates centered around (50, 50), mapped to [-1.8, 1.8] with realistic paper folding Z offsets
interface FacetDef {
  p1: [number, number, number];
  p2: [number, number, number];
  p3: [number, number, number];
  color: string;
}

function mapCoord(x: number, y: number, z: number): [number, number, number] {
  const scale = 0.075;
  return [(x - 50) * scale, -(y - 50) * scale, z * scale];
}

const facetData: FacetDef[] = [
  // 1. Top horizontal bar fold
  {
    p1: mapCoord(26, 25, 3.5),
    p2: mapCoord(58, 25, 0.5),
    p3: mapCoord(42, 41, 5.0),
    color: "#E54A46",
  },
  // 2. Left upper spine triangle
  {
    p1: mapCoord(26, 25, 3.5),
    p2: mapCoord(42, 41, 5.0),
    p3: mapCoord(26, 41, 0.0),
    color: "#AE3033",
  },
  // 3. Upper loop top-right angle fold
  {
    p1: mapCoord(58, 25, 0.5),
    p2: mapCoord(74, 41, -3.0),
    p3: mapCoord(58, 41, -1.0),
    color: "#D65152",
  },
  // 4. Upper loop bottom-right shadow facet
  {
    p1: mapCoord(58, 41, -1.0),
    p2: mapCoord(74, 41, -3.0),
    p3: mapCoord(58, 57, 3.0),
    color: "#A13F40",
  },
  // 5. Left middle spine block
  {
    p1: mapCoord(26, 41, 0.0),
    p2: mapCoord(42, 41, 5.0),
    p3: mapCoord(42, 57, 2.5),
    color: "#B53237",
  },
  // 6. Left lower spine diagonal fold (points down to left tip)
  {
    p1: mapCoord(26, 41, 0.0),
    p2: mapCoord(42, 57, 2.5),
    p3: mapCoord(26, 75, 5.5),
    color: "#E14843",
  },
  // 7. Right leg upper diagonal facet
  {
    p1: mapCoord(42, 57, 2.5),
    p2: mapCoord(58, 57, 3.0),
    p3: mapCoord(58, 75, 0.0),
    color: "#A72F38",
  },
  // 8. Right leg lower diagonal fold (points down to right tip)
  {
    p1: mapCoord(58, 57, 3.0),
    p2: mapCoord(74, 75, -4.0),
    p3: mapCoord(58, 75, 0.0),
    color: "#DB5353",
  },
];

export const OrigamiMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Build custom buffer geometries for each facet with double-sided lighting
  const geometries = useMemo(() => {
    return facetData.map((facet) => {
      const geom = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        ...facet.p1,
        ...facet.p2,
        ...facet.p3,
        // Reverse triangle for back face
        ...facet.p1,
        ...facet.p3,
        ...facet.p2,
      ]);
      geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
      geom.computeVertexNormals();
      return geom;
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Mouse influence (normalized [-1, 1])
    const { x, y } = state.pointer;
    targetRotation.current.y = x * 0.45;
    targetRotation.current.x = -y * 0.35;

    // Smooth lerp towards mouse angle
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y + Math.sin(state.clock.elapsedTime * 0.5) * 0.15,
      delta * 3.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      delta * 3.5
    );

    // Subtle gentle floating oscillation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;

    // Very subtle idle roll
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <group ref={groupRef} scale={[1.25, 1.25, 1.25]}>
      {facetData.map((facet, i) => (
        <mesh key={i} geometry={geometries[i]}>
          <meshStandardMaterial
            color={facet.color}
            roughness={0.24}
            metalness={0.32}
            side={THREE.DoubleSide}
            shadowSide={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Subtle inner core glow */}
      <pointLight position={[0, 0, 0.3]} intensity={0.8} color="#FF453A" distance={3.5} />
    </group>
  );
};
