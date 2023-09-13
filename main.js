import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const starsCoords = [];

for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);

    starsCoords.push(x, y, z);
}

const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsCoords, 3));

const starsMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// const OBJECTS = {
//     SUN: 'sun',
//     MERCURY: 'mercury',
//     VENUS: 'venus',
//     EARTH: 'earth',
//     MARS: 'mars',
//     JUPITER: 'jupiter',
//     SATURN: 'saturn',
//     URANUS: 'uranus',
//     NEPTUNE: 'neptune',
//     PLUTO: 'pluto',
// };

// class ObjectGroup {
//     static createObject = (title, objectGeometry) => {
//         const objectTexture = new THREE.TextureLoader().load(`textures/${title}.jpg`);
//         const objectMaterial = new THREE.MeshPhongMaterial({ map: objectTexture });
//         const objectMesh = new THREE.Mesh(objectGeometry, objectMaterial);
//         return objectMesh;
//     };
// }

// const sun = ObjectGroup.createObject(OBJECTS.SUN, new THREE.SphereGeometry(11, 64, 32));

// scene.add(sun);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
camera.lookAt(0.5, 0.5, 0.5)
controls.target.set(.5, .5, .5)
controls.update()

controls.addEventListener('change', () => console.log("Controls Change"))
controls.addEventListener('start', () => console.log("Controls Start Event"))
controls.addEventListener('end', () => console.log("Controls End Event"))
controls.autoRotate = false
controls.autoRotateSpeed = 5
controls.enableDamping = true
controls.dampingFactor = .01
controls.enableKeys = true //older versions
controls.listenToKeyEvents(document.body)
controls.keys = {
    LEFT: "ArrowLeft", //left arrow
    UP: "ArrowUp", // up arrow
    RIGHT: "ArrowRight", // right arrow
    BOTTOM: "ArrowDown" // down arrow
}
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
}
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
}
controls.screenSpacePanning = true
controls.minAzimuthAngle = 0
controls.maxAzimuthAngle = Math.PI / 2
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI
controls.maxDistance = 800
controls.minDistance = .05


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const light = new THREE.AmbientLight( 0x404040, 50 ); // soft white light
scene.add( light );

// const fontLoader = new FontLoader();
// fontLoader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
//     const geometry = new TextGeometry( 'Jupiter', {
//         font: font,
//         size: 8,
//         height: 5,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     } );
// } );

// const textMesh = new THREE.Mesh(geometry, [
//     new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
//     new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
// ])
// textMesh.position.set(-50, 0, 0)
// scene.add(textMesh)


const loader = new GLTFLoader();

loader.load( './realistic_jupiter/scene.gltf', function ( gltf ) {
    scene.position.x = (0, -50, 0);
    scene.add( gltf.scene )
}, undefined, function ( error ) {
    console.error( error );
} );

camera.position.z = 300;


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    scene.rotation.y += 0.001;
    renderer.render( scene, camera );
}
animate();