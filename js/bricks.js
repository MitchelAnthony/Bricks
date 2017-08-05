//import { PlayerController } from "playercontroller.js"

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
//var camera = new THREE.OrthographicCamera( window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500 );

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xEEEEEE, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

var axes = new THREE.AxisHelper(100);
scene.add(axes);

// Add plane
var planeGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x269320
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.receiveShadow = true;
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);

// Add cube
var cubeGeometry = new THREE.BoxGeometry(4, 8, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000FF,
    wireframe: false
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.castShadow = true;
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;
scene.add(cube);

var cMaterial2 = new THREE.MeshPhongMaterial({
    color: 0xFF0000,
    wireframe: false,
    ambient: 0xFFFFFF,
    emissive: 0x2A2A2A,
    specular: 0xFFFFFF,
    shininess: 143
});
var cube2 = new THREE.Mesh(cubeGeometry, cMaterial2);

cube2.castShadow = true;
cube2.position.x = 4;
cube2.position.y = 3;
cube2.position.z = 0;
scene.add(cube2);

// Add a lightsource
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(0, 100, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// Position camera
camera.position.x = -30;
camera.position.y = 4;
camera.position.z = 0;

// Create gridlines
var lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(-100, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(100, 0, 0));

for(let i = -100; i <= 100; i += 4) {
    
    // Define a line along the x-axis and space it out i units along the z-axis
    let line = new THREE.Line(lineGeometry, lineMaterial);
    line.position.z = i;
    scene.add(line);

    // Do the same for a line along the z-axis
    line = new THREE.Line(lineGeometry, lineMaterial);
    line.position.x = i;
    line.rotation.y = Math.PI / 2; // 90 degrees or pi/2
    scene.add(line);

}

// Bind renderer to #output
document.getElementById("output")
    .appendChild(renderer.domElement);

// Render scene
(function renderScene() {

    // And last, but not least: update!
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);

})();

// Resize on resize
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);

// Handle keyboard input
document.addEventListener("keypress", (e) => {
    // Don't do the default stuff
    e.preventDefault();

    switch (e.key) {
        case "w":
            PlayerController.moveForward();
            break;
        case "s":
            PlayerController.moveBackward();
            break;
        case "a":
            PlayerController.moveLeft();
            break;
        case "d":
            PlayerController.moveRight();
            break;
        case "q":
            PlayerController.lookLeft();
            break;
        case "e":
            PlayerController.lookRight();
            break;
        case "r":
            PlayerController.lookUp();
            break;
        case "f":
            PlayerController.lookDown();
            break;
    }
});
