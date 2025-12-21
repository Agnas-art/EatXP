import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AnimeCharacter } from "@/data/animeCharacters";

interface Character3DProps {
  character: AnimeCharacter;
  size?: "small" | "medium" | "large";
  autoRotate?: boolean;
}

export const Character3D = ({
  character,
  size = "medium",
  autoRotate = true,
}: Character3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);

  const sizeMap = {
    small: { width: 150, height: 150, distance: 3 },
    medium: { width: 250, height: 250, distance: 4 },
    large: { width: 400, height: 400, distance: 5 },
  };

  const { width, height, distance } = sizeMap[size];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = distance;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    if (mountRef.current.children.length > 0) {
      mountRef.current.removeChild(mountRef.current.children[0]);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Create character group
    const group = new THREE.Group();
    meshRef.current = group;
    scene.add(group);

    // Create a stylized character representation using 3D shapes
    // Head
    const headGeometry = new THREE.IcosahedronGeometry(0.8, 4);
    const headMaterial = new THREE.MeshPhongMaterial({ color: character.color });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1;
    group.add(head);

    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.5, 1.2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: character.color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.1;
    group.add(body);

    // Left arm
    const armGeometry = new THREE.CylinderGeometry(0.25, 0.2, 1, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: character.color });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 0.2, 0);
    leftArm.rotation.z = 0.3;
    group.add(leftArm);

    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 0.2, 0);
    rightArm.rotation.z = -0.3;
    group.add(rightArm);

    // Left leg
    const legGeometry = new THREE.CylinderGeometry(0.25, 0.2, 1, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: character.color });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.35, -1.1, 0);
    group.add(leftLeg);

    // Right leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.35, -1.1, 0);
    group.add(rightLeg);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(character.color, 0.5, 100);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        // Bobbing animation
        meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = mountRef.current?.clientWidth || width;
      const newHeight = mountRef.current?.clientHeight || height;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [character, width, height, distance, autoRotate]);

  return (
    <div
      ref={mountRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default Character3D;
