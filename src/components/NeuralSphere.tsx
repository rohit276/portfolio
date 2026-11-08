"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 520;
const RADIUS = 2.15;
const SIGNALS = 22;

/** Nodes on a jittered Fibonacci sphere, edges to nearest neighbours. */
function buildNetwork() {
  const nodes: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = 1 + (Math.random() - 0.5) * 0.08;
    nodes.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS * jitter));
  }

  const edges: [number, number][] = [];
  const adjacency: number[][] = nodes.map(() => []);
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: a.distanceToSquared(b) }))
      .filter((n) => n.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);
    nearest.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push([i, j]);
      adjacency[i].push(j);
      adjacency[j].push(i);
    });
  });
  return { nodes, edges, adjacency };
}

function Network({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const signalRef = useRef<THREE.Points>(null);
  const { nodes, edges, adjacency } = useMemo(buildNetwork, []);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((v, i) => v.toArray(arr, i * 3));
    return arr;
  }, [nodes]);

  const edgePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      nodes[a].toArray(arr, i * 6);
      nodes[b].toArray(arr, i * 6 + 3);
    });
    return arr;
  }, [edges, nodes]);

  // Signals travel node -> neighbour -> neighbour, like activations.
  const signals = useMemo(
    () =>
      Array.from({ length: SIGNALS }, () => {
        const from = Math.floor(Math.random() * nodes.length);
        const to = adjacency[from][0] ?? from;
        return { from, to, t: Math.random(), speed: 0.5 + Math.random() * 0.9 };
      }),
    [nodes, adjacency]
  );
  const signalPositions = useMemo(() => new Float32Array(SIGNALS * 3), []);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  // Soft round sprite so points render as dots, not squares.
  const dot = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  // Follow the mouse anywhere on the page, not only over the canvas.
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (!reduced) {
      g.rotation.y += delta * 0.08;
      const targetX = pointer.current.y * 0.35;
      const targetZ = -pointer.current.x * 0.2;
      g.rotation.x += (targetX - g.rotation.x) * 0.04;
      g.rotation.z += (targetZ - g.rotation.z) * 0.04;
    }

    signals.forEach((s, i) => {
      if (!reduced) s.t += delta * s.speed;
      if (s.t >= 1) {
        s.t = 0;
        s.from = s.to;
        const options = adjacency[s.from];
        s.to = options[Math.floor(Math.random() * options.length)] ?? s.from;
      }
      tmp.lerpVectors(nodes[s.from], nodes[s.to], s.t);
      tmp.toArray(signalPositions, i * 3);
    });
    const attr = signalRef.current?.geometry.getAttribute("position");
    if (attr) attr.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0.1]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6ccff6" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          color="#9fe0fb"
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      <points ref={signalRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[signalPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          color="#f5b544"
          size={0.16}
          sizeAttenuation
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[RADIUS * 1.28, 0.006, 8, 220]} />
        <meshBasicMaterial color="#f5b544" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function NeuralSphere() {
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Network reduced={reduced} />
    </Canvas>
  );
}
