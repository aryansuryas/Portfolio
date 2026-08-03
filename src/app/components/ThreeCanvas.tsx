'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    let scrollY = 0;
    let progress = 0;

    const container = containerRef.current;
    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const positionArtwork = () => {
      const mobile = window.innerWidth < 768;
      group.position.set(mobile ? 0.35 : 0.25, mobile ? 0.2 : 0, 0);
      group.scale.setScalar(mobile ? 0.72 : 0.9);
    };
    positionArtwork();
    scene.add(group);

    const knotGeo = new THREE.TorusKnotGeometry(1.85, 0.55, 180, 20);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x7a1220,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    const basePos = knotGeo.attributes.position.array as Float32Array;
    const count = basePos.length / 3;
    const positions = new Float32Array(basePos);
    const scatterTargets = new Float32Array(count * 3);
    const delays = new Float32Array(count);
    const seeds = new Float32Array(count);

    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      v.set(basePos[i * 3], basePos[i * 3 + 1], basePos[i * 3 + 2]);
      const dir = v
        .clone()
        .normalize()
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 1.8,
            (Math.random() - 0.5) * 1.8,
            (Math.random() - 0.5) * 1.8
          )
        )
        .normalize();
      const dist = 2.5 + Math.random() * 4.5;
      scatterTargets[i * 3] = v.x + dir.x * dist;
      scatterTargets[i * 3 + 1] = v.y + dir.y * dist;
      scatterTargets[i * 3 + 2] = v.z + dir.z * dist;
      delays[i] = Math.random() * 0.7;
      seeds[i] = Math.random() * Math.PI * 2;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x7a1220,
      size: 0.05,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const pts = new THREE.Points(particleGeo, particleMat);
    group.add(pts);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      positionArtwork();
    };
    window.addEventListener('resize', onResize);

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (time: number) => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = time * 0.001;
      const dissolveDistance = window.innerHeight * 2.5;
      const target = Math.min(scrollY / dissolveDistance, 1);
      progress += (target - progress) * 0.04;
      const p = Math.abs(progress) < 0.0005 ? 0 : progress;

      knotMat.opacity = 0.22 * Math.max(0, 1 - p * 4);
      knot.visible = knotMat.opacity > 0.003;

      particleMat.opacity = 0.65 * Math.min(p * 4, 1) * Math.pow(1 - p, 1.2);
      pts.visible = particleMat.opacity > 0.003;

      if (pts.visible) {
        const pos = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          const localProgress = (p - delays[i]) / (1 - delays[i]);
          const local = smoothstep(Math.min(Math.max(localProgress, 0), 1));
          const i3 = i * 3;
          const driftX = Math.sin(t * 0.6 + seeds[i]) * 0.1 * local;
          const driftY = Math.cos(t * 0.5 + seeds[i] * 2) * 0.1 * local;
          pos[i3] = basePos[i3] + (scatterTargets[i3] - basePos[i3]) * local + driftX;
          pos[i3 + 1] =
            basePos[i3 + 1] + (scatterTargets[i3 + 1] - basePos[i3 + 1]) * local + driftY;
          pos[i3 + 2] = basePos[i3 + 2] + (scatterTargets[i3 + 2] - basePos[i3 + 2]) * local;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      const spin = 1 - p * 0.5;
      if (!reduceMotion) {
        group.rotation.x += 0.0015 * spin;
        group.rotation.y += 0.0025 * spin;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="webgl-canvas-container" aria-hidden="true" />;
}
