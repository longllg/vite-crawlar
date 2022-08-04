import React, { memo, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { AnimationMixer } from 'three/src/animation/AnimationMixer.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import styles from './index.module.less';

const Girl = () => {
  /** 创建一个视角 */
  let action: THREE.AnimationAction | null = null;

  useEffect(() => {
    initGirl();
  }, []);
  const initGirl = () => {
    let mixer: THREE.AnimationMixer | null = null;
    const renderer = new THREE.WebGL1Renderer({
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置背景颜色
    renderer.setClearColor(0xffffff, 0);
    document.getElementById('girl')?.appendChild(renderer.domElement);
    //   const geometry = new THREE.BoxGeometry(1, 1, 1);
    //   const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    //   const cube = new THREE.Mesh(geometry, material);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(-100, -20, 20);
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.noZoom = true;

    const scene = new THREE.Scene();
    // const loader = new GLTFLoader();
    const loader = new FBXLoader();
    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    loader.load('src/static/xbot@Walking.fbx', function (gltf) {
      gltf.position.set(0, 0, 10);
      gltf.scale.set(0.5, 0.5, 0.5);
      mixer = new AnimationMixer(gltf);
      console.log(gltf.animations, 'gltf.animations');

      action = mixer.clipAction(gltf.animations[0]);
      action.play();
      console.log(gltf, 'gltf');

      scene.add(gltf);
      scene.add(light);
    });

    /** 随时间动画 */
    const clock = new THREE.Clock();
    function animateAnimate() {
      const time = clock.getDelta();
      if (mixer) {
        mixer.update(time);
      }
      requestAnimationFrame(animateAnimate);
    }
    animateAnimate();

    /** 帧动画 */
    function animate() {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);
    }

    animate();
  };

  /** 设置材质 */
  //   const meterial = new THREE.LineBasicMaterial({
  //     color: 0x0000ff,
  //   });
  //   const points = [];
  //   points.push(new THREE.Vector3(-10, 0, 10));
  //   points.push(new THREE.Vector3(0, 10, 10));
  //   points.push(new THREE.Vector3(10, 20, 10));
  //   const geometry = new THREE.BufferGeometry().setFromPoints(points);

  //   const line = new THREE.Line(geometry, meterial);
  //   scene.add(line);

  return <div id="girl" className={styles.wrap}></div>;
};

export default memo(Girl);
