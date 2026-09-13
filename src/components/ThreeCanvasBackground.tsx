import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles, Orbit, Layers, Compass } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThreeCanvasBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [activeMode, setActiveMode] = useState<'all' | 'cyber' | 'grid'>('all');
  const { themeMode, activeTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Main 3D Container Groups
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // -------------------------------------------------------------
    // 1. Central Kinetic Core (Torus Knot + Geodesic Cage + Crystal)
    // -------------------------------------------------------------
    // A. Torus Knot
    const torusGeometry = new THREE.TorusKnotGeometry(5.8, 1.6, 128, 28, 2, 3);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x923fff,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x583fff,
      emissiveIntensity: 0.45,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    coreGroup.add(torusMesh);

    // B. Outer Geodesic Cage (Icosahedron)
    const cageGeometry = new THREE.IcosahedronGeometry(8.2, 2);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dbfff,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    coreGroup.add(cageMesh);

    // C. Glowing Inner Core
    const innerCoreGeo = new THREE.OctahedronGeometry(2.8, 1);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x7dbfff,
      emissiveIntensity: 0.8,
      wireframe: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCoreMesh);

    // D. 3 Kinetic Gyroscopic Orbit Rings
    const ringGroup = new THREE.Group();
    const ringRadii = [11.5, 14.0, 16.5];
    const ringColors = [0x923fff, 0x583fff, 0x7dbfff];
    const rings: THREE.Mesh[] = [];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.09, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        transparent: true,
        opacity: 0.5 - i * 0.1,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / (2.2 + i * 0.4);
      ring.rotation.y = (Math.PI / 3) * i;
      ringGroup.add(ring);
      rings.push(ring);
    });
    coreGroup.add(ringGroup);

    // E. Orbiting Satellite Polyhedrons
    const satellites: Array<{ mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; yOffset: number }> = [];
    const satGeos = [
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1.3, 0),
      new THREE.DodecahedronGeometry(1.0, 0),
      new THREE.IcosahedronGeometry(1.1, 0),
    ];
    const satColors = [0x7dbfff, 0x923fff, 0x583fff, 0x25d366];

    satGeos.forEach((geo, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: satColors[i % satColors.length],
        wireframe: true,
        emissive: satColors[i % satColors.length],
        emissiveIntensity: 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      coreGroup.add(mesh);
      satellites.push({
        mesh,
        orbitRadius: 18 + i * 3.5,
        speed: 0.25 + i * 0.1,
        angle: (i * Math.PI) / 2,
        yOffset: (i - 1.5) * 4,
      });
    });

    // -------------------------------------------------------------
    // 2. 3D Kinetic Cyber Horizon Wave Mesh (Undulating Ground Grid)
    // -------------------------------------------------------------
    const gridCols = 24;
    const gridRows = 24;
    const gridGeo = new THREE.PlaneGeometry(90, 90, gridCols, gridRows);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x583fff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2.3;
    gridMesh.position.set(0, -11, -8);
    worldGroup.add(gridMesh);

    // Cache initial grid vertex coordinates for fluid sine-wave calculation
    const gridPosAttr = gridGeo.attributes.position;
    const gridOriginalZ = new Float32Array(gridPosAttr.count);
    for (let i = 0; i < gridPosAttr.count; i++) {
      gridOriginalZ[i] = gridPosAttr.getZ(i);
    }

    // -------------------------------------------------------------
    // 3. Dense 3D Constellation Particle Galaxy (1,600 Star Particles)
    // -------------------------------------------------------------
    const particleCount = 1600;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x923fff),
      new THREE.Color(0x583fff),
      new THREE.Color(0x7dbfff),
      new THREE.Color(0xffffff),
      new THREE.Color(0x25d366),
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 120;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 100;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 80;

      const col = palette[Math.floor(Math.random() * palette.length)];
      particleColors[idx] = col.r;
      particleColors[idx + 1] = col.g;
      particleColors[idx + 2] = col.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // -------------------------------------------------------------
    // 4. Lighting & Colored Spotlights (Enhanced Brightness)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const lightViolet = new THREE.PointLight(activeTheme.threeHex || 0x00d2ff, 5.5, 95);
    lightViolet.position.set(18, 14, 15);
    scene.add(lightViolet);

    const lightCyan = new THREE.PointLight(0x38bdf8, 4.5, 90);
    lightCyan.position.set(-18, -14, 15);
    scene.add(lightCyan);

    const lightGreen = new THREE.PointLight(0x10b981, 2.5, 75);
    lightGreen.position.set(0, 20, -10);
    scene.add(lightGreen);

    // -------------------------------------------------------------
    // Mouse & Touch Tracking with Smooth Inertia
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    // Scroll tracking for sajibbaig.com style kinetic zoom in / zoom out
    let currentScrollY = window.scrollY || 0;
    let targetScrollY = window.scrollY || 0;
    let maxScroll = 1000;

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      maxScroll = Math.max(docHeight - window.innerHeight, 1);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        worldGroup.rotation.y += deltaX * 0.005;
        worldGroup.rotation.x += deltaY * 0.005;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Listen for route transition events to maximize GPU availability for transitions
    let isTransitionActive = false;
    const handleTransitionStart = () => {
      isTransitionActive = true;
    };
    const handleTransitionEnd = () => {
      isTransitionActive = false;
    };
    window.addEventListener('page-transition-start', handleTransitionStart);
    window.addEventListener('page-transition-end', handleTransitionEnd);

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // Render & Physics Loop
    // -------------------------------------------------------------
    let animationFrameId: number;
    let frameCounter = 0;
    const isDesktop = window.innerWidth > 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Save CPU/GPU battery when browser tab is inactive/hidden
      if (document.hidden) {
        return;
      }

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      // Core kinetic rotations
      coreGroup.rotation.y = elapsedTime * 0.16 + targetX * 0.45;
      coreGroup.rotation.x = elapsedTime * 0.11 + targetY * 0.35;
      cageMesh.rotation.y = -elapsedTime * 0.22;
      cageMesh.rotation.z = elapsedTime * 0.14;
      innerCoreMesh.rotation.x = elapsedTime * 0.3;
      innerCoreMesh.rotation.y = elapsedTime * 0.25;

      // Gyroscope ring rotations
      rings.forEach((ring, idx) => {
        ring.rotation.z = elapsedTime * (0.18 + idx * 0.08) * (idx % 2 === 0 ? 1 : -1);
      });

      // Satellites orbiting around core
      satellites.forEach((sat) => {
        const currentAngle = sat.angle + elapsedTime * sat.speed;
        sat.mesh.position.x = Math.cos(currentAngle) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(currentAngle) * sat.orbitRadius;
        sat.mesh.position.y = Math.sin(elapsedTime * 1.5 + sat.orbitRadius) * 2 + sat.yOffset;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.03;
      });

      // Kinetic Horizon Grid undulating wave simulation (Paused during active page transition to guarantee 60+ FPS)
      frameCounter++;
      if (!isTransitionActive && !prefersReducedMotion && (frameCounter % 2 === 0 || !isDesktop)) {
        const pos = gridGeo.attributes.position;
        const step = isDesktop ? 1 : 2;
        for (let i = 0; i < pos.count; i += step) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const wave =
            Math.sin(u * 0.14 + elapsedTime * 1.5) * 1.6 +
            Math.cos(v * 0.14 + elapsedTime * 1.3) * 1.4 +
            Math.sin((u + v) * 0.1 + elapsedTime) * 0.8;
          pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
      }

      // Particle galaxy drift
      particlePoints.rotation.y = elapsedTime * 0.035;
      particlePoints.rotation.x = elapsedTime * 0.018;

      // Dynamic light choreography
      lightViolet.position.x = Math.sin(elapsedTime * 0.6) * 22;
      lightViolet.position.y = Math.cos(elapsedTime * 0.5) * 18;
      lightCyan.position.x = -Math.sin(elapsedTime * 0.5) * 20;
      lightCyan.position.y = -Math.cos(elapsedTime * 0.7) * 16;
      lightGreen.position.x = Math.cos(elapsedTime * 0.8) * 15;

      // -----------------------------------------------------------
      // sajibbaig.com Scroll-Driven Dynamic Zoom In / Zoom Out
      // -----------------------------------------------------------
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const scrollProgress = Math.min(Math.max(currentScrollY / Math.max(maxScroll, 1), 0), 1);

      // Smooth zoom scale oscillation: expands on scroll down, contracts on scroll up
      // Dynamically scales between 1.0x and 1.45x with subtle scroll-velocity inertia
      const scrollVelocity = Math.abs(targetScrollY - currentScrollY);
      const velocityScale = Math.min(scrollVelocity * 0.0008, 0.12);
      const dynamicZoom = 1.0 + Math.sin(scrollProgress * Math.PI) * 0.38 + scrollProgress * 0.15 + velocityScale;
      worldGroup.scale.set(dynamicZoom, dynamicZoom, dynamicZoom);

      // Camera dolly zoom & subtle parallax shift
      camera.position.z = 28 - (scrollProgress * 8.5);
      camera.position.y = 2 - (scrollProgress * 3.5);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('page-transition-start', handleTransitionStart);
      window.removeEventListener('page-transition-end', handleTransitionEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Background Canvas */}
      <div
        id="threejs-3d-background"
        ref={containerRef}
        className={`fixed inset-0 w-full h-full overflow-hidden transition-all duration-700 ${
          isInteractive ? 'z-30 opacity-100 cursor-grab active:cursor-grabbing pointer-events-auto' : 'z-0 opacity-100 pointer-events-none'
        }`}
      />

      {/* Atmospheric Contrast Overlay with Bright Ambient Vignette */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-500 z-[1] ${
          isInteractive
            ? 'opacity-20 bg-black/30'
            : themeMode === 'light'
              ? 'opacity-25 bg-gradient-to-b from-white/40 via-transparent to-white/50'
              : 'opacity-40 bg-gradient-to-b from-[#090d16]/30 via-transparent to-[#090d16]/45'
        }`}
      />

      {/* Floating 3D Control Pill (offset from WhatsApp/Back-to-Top widget) */}
      <div className="fixed bottom-5 right-20 sm:bottom-6 sm:right-24 z-30 hidden xs:flex items-center gap-2">
        <button
          type="button"
          id="toggle-3d-interactive-btn"
          onClick={() => setIsInteractive((prev) => !prev)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border transition-all duration-300 shadow-xl cursor-pointer ${
            isInteractive
              ? 'bg-gradient-brand text-white border-[#7DBFFF]/60 shadow-[#923FFF]/40 scale-105 ring-2 ring-[#7DBFFF]/50'
              : 'bg-zinc-950/80 text-zinc-300 hover:text-white border-white/15 hover:border-[#923FFF]/50 hover:bg-zinc-900/90 shadow-black/80'
          }`}
          title={isInteractive ? 'Exit 3D Focus View' : 'Explore 3D Kinetic Canvas'}
          aria-label={isInteractive ? 'Exit 3D Focus View' : 'Explore 3D Kinetic Canvas'}
        >
          <div className="w-2 h-2 rounded-full bg-[#7DBFFF] animate-pulse" />
          <span className="font-medium tracking-wide">
            {isInteractive ? 'Exit 3D Canvas' : 'Explore 3D'}
          </span>
          {isInteractive ? (
            <EyeOff className="w-3.5 h-3.5 text-zinc-200" />
          ) : (
            <Orbit className="w-3.5 h-3.5 text-[#7DBFFF]" />
          )}
        </button>
      </div>
    </>
  );
}
