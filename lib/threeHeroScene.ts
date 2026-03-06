type HeroSceneController = {
  dispose: () => void;
};

declare global {
  interface Window {
    THREE?: any;
  }
}

const pointer = { x: 0, y: 0 };
const NEON_COLORS = ['#4f46e5', '#22d3ee', '#a855f7', '#60a5fa'];

export function createHeroScene(canvas: HTMLCanvasElement): HeroSceneController {
  const THREE = window.THREE;

  if (!THREE) {
    return { dispose: () => undefined };
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color('#0b0b0f'), 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.4, 9.5);

  const ambientLight = new THREE.AmbientLight('#94a3ff', 0.4);
  const keyLight = new THREE.PointLight('#60a5fa', 1.1, 30);
  const rimLight = new THREE.PointLight('#c084fc', 0.8, 20);
  keyLight.position.set(4, 2, 8);
  rimLight.position.set(-5, -2, 4);
  scene.add(ambientLight, keyLight, rimLight);

  const group = new THREE.Group();
  scene.add(group);

  const sphereGeometry = new THREE.IcosahedronGeometry(0.6, 1);
  const boxGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
  const torusGeometry = new THREE.TorusGeometry(0.55, 0.14, 16, 60);

  for (let i = 0; i < 26; i += 1) {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(NEON_COLORS[i % NEON_COLORS.length]),
      emissive: new THREE.Color(NEON_COLORS[(i + 1) % NEON_COLORS.length]),
      emissiveIntensity: 0.5,
      wireframe: i % 3 === 0,
      metalness: 0.35,
      roughness: 0.25
    });

    const geometry = i % 3 === 0 ? torusGeometry : i % 2 === 0 ? sphereGeometry : boxGeometry;
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 12);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.scale.setScalar(0.4 + Math.random() * 0.6);

    group.add(mesh);
  }

  const particleCount = 340;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 34;
    positions[i + 1] = (Math.random() - 0.5) * 18;
    positions[i + 2] = (Math.random() - 0.5) * 26;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    color: '#8be9fd',
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  const navWithMemory = navigator as Navigator & { deviceMemory?: number };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPowerDevice =
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (typeof navWithMemory.deviceMemory === 'number' && (navWithMemory.deviceMemory ?? 0) <= 4);
  const animationScale = reduceMotion || lowPowerDevice ? 0.35 : 1;

  let rafId = 0;
  const clock = new THREE.Clock();

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const onPointerMove = (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const animate = () => {
    const elapsed = clock.getElapsedTime();

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, pointer.x * 0.2, 0.04);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.12, 0.04);

    group.children.forEach((mesh: any, index: number) => {
      mesh.rotation.x += 0.0018 * animationScale;
      mesh.rotation.y += 0.0025 * animationScale;
      mesh.position.y += Math.sin(elapsed * 0.55 + index * 0.3) * 0.0016 * animationScale;
      mesh.position.x += Math.cos(elapsed * 0.45 + index * 0.1) * 0.0008 * animationScale;
    });

    particles.rotation.y += 0.00045 * animationScale;
    particles.rotation.x = THREE.MathUtils.lerp(particles.rotation.x, pointer.y * 0.08, 0.05);

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };

  animate();

  return {
    dispose: () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);

      sphereGeometry.dispose();
      boxGeometry.dispose();
      torusGeometry.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      group.children.forEach((child: any) => child.material?.dispose?.());
      renderer.dispose();
    }
  };
}
