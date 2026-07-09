import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { THEME_HEX } from '../constants/theme';

/**
 * Replaces the original CSS-only rotating cube with a real WebGL scene: a
 * low-poly (flat-shaded) icosahedron in wine, wrapped in a brass wireframe,
 * with two orbiting rings for a "drafted blueprint" feel. Rotates gently on
 * its own and tilts toward the cursor. Fully disposed on unmount, and slows
 * to a near-static spin when the user prefers reduced motion.
 */
export default function HeroIcosahedron({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / Math.max(mount.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 0, 7.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const geo = new THREE.IcosahedronGeometry(2.35, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: THEME_HEX.wine,
      flatShading: true,
      roughness: 0.4,
      metalness: 0.5,
      transparent: true,
      opacity: 0.94
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    const edgesGeo = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: THEME_HEX.brass, transparent: true, opacity: 0.6 });
    const wire = new THREE.LineSegments(edgesGeo, lineMat);
    wire.scale.setScalar(1.002);
    group.add(wire);

    scene.add(group);

    const ringGeo1 = new THREE.RingGeometry(3.15, 3.17, 96);
    const ringGeo2 = new THREE.RingGeometry(2.7, 2.715, 96);
    const ringMat = new THREE.MeshBasicMaterial({ color: THEME_HEX.brass, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat.clone());
    ring1.rotation.x = Math.PI / 2.4;
    ring2.rotation.x = Math.PI / 2.4;
    ring2.rotation.z = 0.6;
    scene.add(ring1, ring2);

    const key = new THREE.DirectionalLight(THEME_HEX.paper, 1.7);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(THEME_HEX.brass, 0.55);
    fill.position.set(-5, -2, 3);
    scene.add(fill);
    const ambient = new THREE.AmbientLight(THEME_HEX.paper, 0.5);
    scene.add(ambient);

    let targetTiltX = 0;
    let targetTiltY = 0;
    let curTiltX = 0;
    let curTiltY = 0;

    const onMove = e => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltX = ny * 0.26;
      targetTiltY = nx * 0.4;
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = Math.max(mount.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let raf;
    let t = 0;
    const spinSpeed = reduced ? 0.08 : 0.5;

    const tick = () => {
      t += 0.0032;
      group.rotation.y = t * spinSpeed + curTiltY;
      group.rotation.x = Math.sin(t * 0.4) * 0.12 + curTiltX;
      ring1.rotation.z = t * 0.12;
      ring2.rotation.z = -t * 0.09 + 0.6;
      curTiltX += (targetTiltX - curTiltX) * 0.045;
      curTiltY += (targetTiltY - curTiltY) * 0.045;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      edgesGeo.dispose();
      lineMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`hero-3d-mount ${className}`.trim()} aria-hidden="true" />;
}
