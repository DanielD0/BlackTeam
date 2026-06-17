import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeViewer({ colorHex = '#121212', isWireframe = false, size = 'M' }) {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const activeModelRef = useRef(null);

    // Track rotation across renders so it doesn't reset when props change
    const rotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 400;

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 1.0, 2.0);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0); // Transparent background
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.8);
        hemiLight.position.set(0, 3, 0);
        scene.add(hemiLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
        dirLight1.position.set(3, 4, 3);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.35); // Soft white rim highlight
        dirLight2.position.set(-3, 2, -3);
        scene.add(dirLight2);

        // Interaction (Drag rotation)
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const handleDown = (e) => {
            isDragging = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            previousMousePosition = { x: clientX, y: clientY };
        };

        const handleMove = (e) => {
            if (!isDragging || !activeModelRef.current) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const deltaX = clientX - previousMousePosition.x;
            const deltaY = clientY - previousMousePosition.y;

            rotationRef.current.y += deltaX * 0.008;
            rotationRef.current.x += deltaY * 0.008;
            rotationRef.current.x = Math.max(-0.6, Math.min(0.6, rotationRef.current.x));

            activeModelRef.current.rotation.y = rotationRef.current.y;
            activeModelRef.current.rotation.x = rotationRef.current.x;

            previousMousePosition = { x: clientX, y: clientY };
        };

        const handleUp = () => {
            isDragging = false;
        };

        const domElement = renderer.domElement;
        domElement.addEventListener('mousedown', handleDown);
        domElement.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);

        domElement.addEventListener('touchstart', handleDown, { passive: true });
        domElement.addEventListener('touchmove', handleMove, { passive: true });
        window.addEventListener('touchend', handleUp);

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchend', handleUp);
            domElement.removeEventListener('mousedown', handleDown);
            domElement.removeEventListener('mousemove', handleMove);
            domElement.removeEventListener('touchstart', handleDown);
            domElement.removeEventListener('touchmove', handleMove);
            if (container.contains(domElement)) {
                container.removeChild(domElement);
            }
            renderer.dispose();
        };
    }, []);

    // Update Model based on props (colorHex, isWireframe, size)
    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        // Clear existing model
        if (activeModelRef.current) {
            scene.remove(activeModelRef.current);
        }

        const colorInt = parseInt(colorHex.replace('#', '0x'), 16);

        // Glass physical material
        const standardMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(colorInt),
            emissive: new THREE.Color(colorInt).clone().multiplyScalar(0.25),
            roughness: 0.15,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            transmission: 0.6,
            thickness: 1.2,
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide
        });

        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.65
        });

        const material = isWireframe ? wireframeMaterial : standardMaterial;

        // Build Mannequin Group
        const group = new THREE.Group();

        // Neck
        const neckGeom = new THREE.CylinderGeometry(0.09, 0.14, 0.16, 32);
        const neck = new THREE.Mesh(neckGeom, material);
        neck.position.set(0, 1.38, 0.02);
        neck.rotation.x = 0.12;
        group.add(neck);

        // Collar Hem
        const collarGeom = new THREE.TorusGeometry(0.13, 0.012, 16, 64);
        const collar = new THREE.Mesh(collarGeom, material);
        collar.position.set(0, 1.31, 0.03);
        collar.rotation.x = Math.PI / 2 + 0.12;
        group.add(collar);

        // Trapezius
        const trapsGeom = new THREE.CylinderGeometry(0.13, 0.36, 0.18, 32);
        const traps = new THREE.Mesh(trapsGeom, material);
        traps.position.set(0, 1.27, 0.01);
        traps.scale.set(1, 1, 0.72);
        group.add(traps);

        // Torso
        const torsoGeom = new THREE.CylinderGeometry(0.36, 0.28, 0.83, 32);
        const torso = new THREE.Mesh(torsoGeom, material);
        torso.position.set(0, 0.765, 0.01);
        torso.scale.set(1, 1, 0.72);
        group.add(torso);

        // Shoulders
        const shoulderGeom = new THREE.SphereGeometry(0.14, 32, 32);
        shoulderGeom.scale(1.15, 0.85, 1.0);

        const shoulderL = new THREE.Mesh(shoulderGeom, material);
        shoulderL.position.set(-0.31, 1.15, 0.01);
        shoulderL.rotation.z = 0.38;
        group.add(shoulderL);

        const shoulderR = new THREE.Mesh(shoulderGeom, material);
        shoulderR.position.set(0.31, 1.15, 0.01);
        shoulderR.rotation.z = -0.38;
        group.add(shoulderR);

        // Arms (Hierarchical Groups)
        const upperArmGeom = new THREE.CylinderGeometry(0.10, 0.08, 0.44, 32);
        upperArmGeom.scale(1.05, 1.0, 0.85);

        const forearmGeom = new THREE.CylinderGeometry(0.08, 0.06, 0.44, 32);
        forearmGeom.scale(1.02, 1.0, 0.85);

        // Left Arm Group
        const leftArmGroup = new THREE.Group();
        leftArmGroup.position.set(-0.31, 1.15, 0.01);
        leftArmGroup.rotation.set(0.04, 0, 0.10);

        const upperArmL = new THREE.Mesh(upperArmGeom, material);
        upperArmL.position.set(0, -0.22, 0);
        leftArmGroup.add(upperArmL);

        const forearmL = new THREE.Mesh(forearmGeom, material);
        forearmL.position.set(0, -0.66, 0);
        leftArmGroup.add(forearmL);

        group.add(leftArmGroup);

        // Right Arm Group
        const rightArmGroup = new THREE.Group();
        rightArmGroup.position.set(0.31, 1.15, 0.01);
        rightArmGroup.rotation.set(0.04, 0, -0.10);

        const upperArmR = new THREE.Mesh(upperArmGeom, material);
        upperArmR.position.set(0, -0.22, 0);
        rightArmGroup.add(upperArmR);

        const forearmR = new THREE.Mesh(forearmGeom, material);
        forearmR.position.set(0, -0.66, 0);
        rightArmGroup.add(forearmR);

        group.add(rightArmGroup);

        // Scaling based on size prop
        const scaleMap = { 'S': 0.92, 'M': 1.0, 'L': 1.08, 'XL': 1.15 };
        const s = scaleMap[size] || 1.0;
        group.scale.set(s, s, s);

        // Restore rotation
        group.rotation.x = rotationRef.current.x;
        group.rotation.y = rotationRef.current.y;

        scene.add(group);
        activeModelRef.current = group;
    }, [colorHex, isWireframe, size]);

    return (
        <div 
            ref={containerRef} 
            className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing relative z-10"
        />
    );
}
