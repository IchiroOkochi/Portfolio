import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// Mirror the main portfolio cursor on the project detail page.
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0;
  let my = 0;
  let fx = 0;
  let fy = 0;

  document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    cursor.style.left = `${mx}px`;
    cursor.style.top = `${my}px`;
  });

  (function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = `${fx}px`;
    follower.style.top = `${fy}px`;
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
})();

const scene = new THREE.Scene();

const canvas = document.getElementById('bg');
const container = document.getElementById('stageContainer');

function getSize() {
  return {
    w: container.clientWidth,
    h: container.clientHeight
  };
}

const { w, h } = getSize();

const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
camera.position.set(2.6, 1.7, 3.9);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setSize(w, h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.14;

scene.background = null;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.1;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = Math.PI - 0.12;
controls.minDistance = 1.8;
controls.maxDistance = 7;
controls.target.set(0, 0, 0);
controls.update();

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd7d0c6, 4.6);
scene.add(hemiLight);

const topLight = new THREE.DirectionalLight(0xffffff, 4.4);
topLight.position.set(0, 10, 1.4);
scene.add(topLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
keyLight.position.set(5, 8, 6);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xe7dfd5, 2.4);
fillLight.position.set(-6, 4, 4);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 2.6);
rimLight.position.set(-4, 3, -6);
scene.add(rimLight);

const frontLift = new THREE.DirectionalLight(0xf8f1e8, 1.8);
frontLift.position.set(0, 2.5, 7);
scene.add(frontLift);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
loader.setDRACOLoader(dracoLoader);

let model = null;

loader.load(
  './models/radioReceiverCase.glb',
  (gltf) => {
    model = gltf.scene;

    const matteBlackMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x101010,
      metalness: 0.03,
      roughness: 0.78,
      clearcoat: 0.16,
      clearcoatRoughness: 0.8,
      envMapIntensity: 0.0
    });

    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);
    model.position.sub(center);
    model.position.y += size.y * 0.03;
    model.rotation.x = -Math.PI / 7;
    model.rotation.y = Math.PI / 5;

    model.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      child.material = matteBlackMaterial;
    });

    scene.add(model);

    const maxDim = Math.max(size.x, size.y, size.z);
    controls.target.set(0, size.y * 0.05, 0);
    controls.minDistance = maxDim * 1.05;
    controls.maxDistance = maxDim * 3.1;
    camera.position.set(maxDim * 1.25, maxDim * 0.85, maxDim * 1.9);
    camera.lookAt(controls.target);
    controls.update();
  },
  undefined,
  (error) => console.error('Error loading model:', error)
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const { w: nextW, h: nextH } = getSize();
  camera.aspect = nextW / nextH;
  camera.updateProjectionMatrix();
  renderer.setSize(nextW, nextH);
});
