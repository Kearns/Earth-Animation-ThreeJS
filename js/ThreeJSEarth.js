/*
*   Three JS Earth Example
*		Description:
*   In honor of Earth Day! Should be ran from a server (like pythons simple http server)
*   in order to avoid CORS errors when loading the image textures
*   Author: Pat K - https://github.com/Kearns
*/

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    ASPECT = WIDTH / HEIGHT,
    VIEW_ANGLE = 45,
    NEAR = 0.1,
    FAR = 10000;

var container,
    renderer,
    camera,
    scene,
    planet,
    atmosphere,
    directionalLight;

var textureLoader = new THREE.TextureLoader();

function init() {

  container = document.getElementById('planetHead');

  //renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);

  //camera
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.z = 300;

  //objects
  planet = createSphere(80, 50, 50, '/img/flat_earth.jpg', false);
  atmosphere = createSphere(80.4, 50, 50, '/img/clouds.png', true);

  //lights
  directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1);

  //create the scene
  scene = new THREE.Scene();
  scene.add(camera);
  scene.add(directionalLight);
  scene.add(planet);
  scene.add(atmosphere);

  //window resize event
  window.addEventListener('resize', onResize);
}

function render() {

  rotateSphere(planet, 0.00002);
  rotateSphere(atmosphere, 0.00004);

  requestAnimationFrame(render);
}

// Function to create spheres for the earth and clouds
function createSphere(rad, wSeg, hSeg,imgSrc, trans) {
  var sphere = new THREE.SphereGeometry(rad, wSeg, hSeg);
  var img = new THREE.MeshLambertMaterial({
      map:textureLoader.load(imgSrc),
      transparent: trans
  });

  return new THREE.Mesh(sphere, img);
}

// Function to rotate the generated spheres
function rotateSphere(obj,yMulti,zMulti) {
    //tilt slightly
    obj.rotation.x = (23.5/360)*Math.PI;
    //rotate
    obj.rotation.y = Date.now() * yMulti;

    renderer.render(scene, camera);
}

// responsive sizing
function onResize( event ) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

init();
render();
