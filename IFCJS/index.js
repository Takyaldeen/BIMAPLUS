import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

console.log(THREE);

// Basic elements

const canvas = document.getElementById("ifc3d");
const camera = new THREE.PerspectiveCamera();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas });
camera.position.z = 100;
camera.position.y = 100;
camera.position.x = 100;
renderer.setAnimationLoop(animate);

// Geometry

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: "yellow",
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// Lights

const firstLight = new THREE.DirectionalLight();
firstLight.position.y = 400;
firstLight.position.x = 300;
firstLight.position.z = 200;
scene.add(firstLight);

const secondLight = new THREE.DirectionalLight();
secondLight.position.y = -100;
secondLight.position.x = -200;
secondLight.position.z = -200;
scene.add(secondLight);

// Controls

const controls = new OrbitControls(camera, canvas);

// Animation

function animate() {
 /* cubeMesh.rotation.y += Math.PI/180*/
  controls.update();
  renderer.render(scene, camera);
}

// Aspect ratio

function size() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

size();

window.onresize = size;

// Load model

const loader = new GLTFLoader();

loader.load("resources/3d.glb", function (gltf) {
  scene.add(gltf.scene);
});