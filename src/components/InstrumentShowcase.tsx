"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const modelPath = "/models/yamaha-m1a-piano/scene.gltf";

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) {
            value.dispose();
          }
        });
        material.dispose();
      });
    }
  });
}

export function InstrumentShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.45, 6.4);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(3, 4.5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22c55e, 2.6);
    rimLight.position.set(-4, 2, -2);
    scene.add(rimLight);

    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(3.7, 96),
      new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.075 }),
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -1.2;
    scene.add(glow);

    const pianoRoot = new THREE.Group();
    scene.add(pianoRoot);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let model: THREE.Object3D | null = null;
    let frameId: number | null = null;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        if (disposed) return;

        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        const maxAxis = Math.max(size.x, size.y, size.z);
        const scale = maxAxis > 0 ? 5.65 / maxAxis : 1;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y -= 0.75;
        model.rotation.set(-0.22, -0.58, 0.05);

        pianoRoot.add(model);
        setStatus("ready");
      },
      undefined,
      () => {
        if (!disposed) {
          setStatus("error");
        }
      },
    );

    const animate = () => {
      renderer.render(scene, camera);

      const frame = (Number(mount.dataset.frame ?? "0") + 1) % 45;
      mount.dataset.frame = String(frame);
      if (frame === 1) {
        const gl = renderer.getContext();
        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;
        const pixel = new Uint8Array(4);
        let nonBlack = 0;
        let samples = 0;

        for (let xIndex = 2; xIndex <= 8; xIndex += 1) {
          for (let yIndex = 2; yIndex <= 8; yIndex += 1) {
            const x = Math.floor((width * xIndex) / 10);
            const y = Math.floor((height * yIndex) / 10);
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
            if (pixel[3] > 0 && (pixel[0] > 14 || pixel[1] > 14 || pixel[2] > 14)) {
              nonBlack += 1;
            }
            samples += 1;
          }
        }

        mount.dataset.pixelCheck = `${nonBlack}/${samples}`;
      }

      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
      if (model) disposeObject(model);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div className="soft-reveal-delay relative z-0 mt-5 w-full">
      <div className="relative mx-auto h-[330px] w-full max-w-6xl overflow-visible sm:h-[470px] lg:h-[520px]">
        <div ref={mountRef} className="absolute inset-0" aria-label="3D Yamaha M1A Piano preview" />
        {status === "loading" ? (
          <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">Loading piano...</div>
        ) : null}
        {status === "error" ? (
          <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">Piano unavailable.</div>
        ) : null}
      </div>
      <p className="mx-auto -mt-7 max-w-2xl pb-6 text-center text-xs leading-5 text-zinc-600 sm:-mt-12">
        3D model based on{" "}
        <a
          href="https://sketchfab.com/3d-models/yamaha-m1a-piano-1d8b0c38e226412a8cdefe0f016895e5"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 transition-colors hover:text-green-300"
        >
          Yamaha M1A Piano
        </a>{" "}
        by{" "}
        <a
          href="https://sketchfab.com/tuapiasat"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 transition-colors hover:text-green-300"
        >
          tuapiasat
        </a>
        , licensed under{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 transition-colors hover:text-green-300"
        >
          CC BY 4.0
        </a>
        .
      </p>
    </div>
  );
}
