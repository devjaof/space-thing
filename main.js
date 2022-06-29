import './style.css'
import * as THREE from 'three';

import { OrbitControls }from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// set up

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

camera.position.z = 80;

let pickle;

new GLTFLoader().load(
  'assets/picklerick.gltf',
  function ( object ) {
    pickle = object.scene;
      scene.add( pickle );
  },
  function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  function ( error ) {
      console.log('An error happened: ', error );
  }
);

//star
function addStar() {
  const geometry = new THREE.SphereGeometry(1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
};
Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/95629f34144463.56c58b1959576.jpg');
scene.background = spaceTexture;


// light

const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight({color: 0xffffff});
pointLight.position.set(0, -40, 0);
scene.add(pointLight, ambientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add( lightHelper);


// controls
const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);

  if(pickle) pickle.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
