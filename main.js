import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry( 1, 1, 1);
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const light = new THREE.AmbientLight( 0x404040, 50 ); // soft white light
scene.add( light );

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
    scene.rotation.y += 0.005;
    // scene.rotation.x += 0.005;
    renderer.render( scene, camera );
}
animate();