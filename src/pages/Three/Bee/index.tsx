import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { AnimationMixer } from 'three/src/animation/AnimationMixer.js';
import { memo, useEffect } from 'react';
import styles from './index.module.less';

const Bee = () => {
  /** 创建一个视角 */
  useEffect(() => {
    initBee();
  }, []);

  /** 初始化 */
  const initBee = () => {
    let mixer: THREE.AnimationMixer | null = null;
    const renderer = new THREE.WebGL1Renderer({
      alpha: true,
    });
    // 设置背景颜色
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(window.innerWidth / 2, window.innerHeight);

    document.getElementById('bee')?.appendChild(renderer.domElement);
    //   const geometry = new THREE.BoxGeometry(1, 1, 1);
    //   const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    //   const cube = new THREE.Mesh(geometry, material);
    const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0, 100);

    camera.position.set(0, 0, 0);
    const controls = new TrackballControls(camera, renderer.domElement);

    const scene = new THREE.Scene();
    const loader = new GLTFLoader();
    const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
    scene.add(light);

    loader.load(
      'src/static/Bee.glb',
      function (gltf) {
        mixer = new AnimationMixer(gltf.scene);
        const action = mixer.clipAction(gltf.animations[2]);
        action.play();

        gltf.scene.position.set(0, 0, 100);
        scene.add(gltf.scene);
      },
      //** 模型加载进度 */
      function (xhr) {},
      function (error) {
        console.log(error);
      }
    );
    const clock = new THREE.Clock();
    function animateAnimate() {
      const time = clock.getDelta();
      if (mixer) {
        mixer.update(time);
      }
      requestAnimationFrame(animateAnimate);
    }
    animateAnimate();
    /** 拖拽动画 */
    function animate() {
      renderer.render(scene, camera);

      controls.update();
      requestAnimationFrame(animate);
    }

    animate();
  };

  /** 设置材质 */

  return <div id="bee" className={styles.wrap}></div>;
};
export default memo(Bee);
