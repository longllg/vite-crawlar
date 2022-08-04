import { Button } from 'antd';
import { memo, useEffect } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer } from 'three/src/animation/AnimationMixer.js';
import styles from './index.module.less';
import Stats from 'stats.js';

const Floor = () => {
  const stats = new Stats();
  stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  let action: THREE.AnimationAction | null = null;
  const scene = new THREE.Scene();

  const init = () => {
    let mixer: THREE.AnimationMixer | null = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 20, 40);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    document.body.appendChild(renderer.domElement);
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.noZoom = true;
    var axes = new THREE.AxesHelper(30);
    scene.add(axes);
    const gridHelper = new THREE.GridHelper(100, 30, 0x2c2c2c, 0x888888);
    scene.add(gridHelper);
    const loader = new FBXLoader();
    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add(light);
    var geometry3 = new THREE.CylinderGeometry(5, 5, 5, 5);
    var material3 = new THREE.MeshLambertMaterial({
      color: 0xffff00,
    });
    var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
    // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
    mesh3.position.set(100, 0, 20); //设置mesh3模型对象的xyz坐标为120,0,0
    scene.add(mesh3); //
    loader.load('src/static/xbot@Walking.fbx', function (gltf) {
      gltf.position.set(1, 0, 10);
      gltf.scale.set(0.1, 0.1, 0.1);
      mixer = new AnimationMixer(gltf);
      console.log(gltf, 'gltf.animations');
      gltf.name = 'girl';
      action = mixer.clipAction(gltf.animations[0]);
      // action.clampWhenFinished = true;
      action.paused = true;
      // action.loop = THREE.LoopOnce;
      // action.play();
      scene.add(gltf);
    });

    /** 随时间动画 */
    const clock = new THREE.Clock();
    function animateAnimate() {
      const time = clock.getDelta();
      let current = scene.getObjectByName('girl');

      if (mixer && !action?.paused && current) {
        mixer.update(time);
        current.position.z += 0.2;
      }
      requestAnimationFrame(animateAnimate);
    }
    animateAnimate();
    /** 帧动画 */
    function animate() {
      stats.begin();
      renderer.render(scene, camera);
      renderer.setSize(window.innerWidth, window.innerHeight);

      controls.update();
      stats.end();

      requestAnimationFrame(animate);
    }

    animate();
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.wrap}>
      <Button
        type="primary"
        onClick={() => {
          let current = scene.getObjectByName('girl');
          if (action && !!current) {
            // current.rotation.x += 0.1;
            // current.rotation.y += 0.1;
            // current.rotation.z += 0.1;
            current.position.x += 0.1;
            action.paused = true;
          }
        }}
      >
        暂停
      </Button>
      <Button
        type="primary"
        onClick={() => {
          let current = scene.getObjectByName('girl');
          if (action && !!current) {
            // current.rotation.x += 0.1;
            // current.rotation.y += 0.1;
            // current.rotation.z += 0.1;
            action.paused = false;
            action.play();
          }
        }}
      >
        开始
      </Button>
    </div>
  );
};

export default memo(Floor);
