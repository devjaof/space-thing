import './style.css'
import * as THREE from 'three';

import { OrbitControls }from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(20, 7, 20, 400);
const material = new THREE.MeshStandardMaterial({
  color: 0x8318b4,
  radius: 5,
  tube: 10,
  radialSegments: 10,
  p: 2,
  q: 10,
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(20, 5, 5);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill(). map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(500).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/95629f34144463.56c58b1959576.jpg');
const colorBlack = new THREE.Color( 0x0000000 );
scene.background = colorBlack;

camera.position.z = 100;

function animate() {
  requestAnimationFrame(animate);

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  torusKnot.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
