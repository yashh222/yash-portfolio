/**
 * Premium Cinematic Background Animation
 * - GPU particles with GLSL shaders (800-1200 desktop, 300-500 mobile)
 * - Crystal shards with glass material
 * - Subtle portrait glow
 * - Mouse-based parallax
 * - Scroll-driven timeline (0-100%)
 * - Pause/resume based on scroll range
 */

import * as THREE from 'three';

// ============================================
// STATE - Core Three.js
// ============================================
let scene, camera, renderer;
let scrollPercent = 0;
let isAnimating = false;
let animationFrameId = null;

// Bounding elements
let heroElement = null;
let workElement = null;
let heroTop = 0;
let workTop = 0;
let scrollProgressBar = null;

// ============================================
// STATE - Particles & Shards
// ============================================
let particlesGroup = null; // THREE.Points
let particlePositions = null;
let particleVelocities = null;
let particleAges = null; // For opacity animation
let particleCount = 0;

let shardsGroup = null; // THREE.InstancedMesh
let shardCount = 0;

let portraitGlow = null; // Subtle radial glow

// ============================================
// STATE - Mouse & Camera
// ============================================
let mouseX = 0;
let mouseY = 0;
let mouseNormX = 0;
let mouseNormY = 0;
let cameraOffsetX = 0;
let cameraOffsetY = 0;
let targetCameraOffsetX = 0;
let targetCameraOffsetY = 0;

// ============================================
// STATE - Time & Animation
// ============================================
let elapsedTime = 0;

// ============================================
// INITIALIZATION
// ============================================
function init() {
  const canvas = document.getElementById('three-d-canvas');
  if (!canvas) {
    console.warn('Canvas element not found');
    return;
  }

  // Setup scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060807);
  scene.fog = new THREE.Fog(0x060807, 50, 150);

  // Setup camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 4;

  // Setup renderer with optimizations
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Determine particle count based on device
  particleCount = isMobileDevice() ? 80 : 140;

  // Create cinematic elements
  createPortraitGlow();
  createParticles();
  createCrystalShards();
  createScrollProgressBar();

  // Cache DOM elements for scroll range
  heroElement = document.getElementById('hero');
  workElement = document.getElementById('work');

  // Setup event listeners
  window.addEventListener('scroll', onScroll, false);
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);

  // Start animation loop
  animate();

  console.log('Three.js scene initialized - Premium Cinematic Background');
}

// ============================================
// HELPER - Device Detection
// ============================================
function isMobileDevice() {
  return window.innerWidth < 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================
// PORTRAIT GLOW - Subtle radial backdrop
// ============================================
function createPortraitGlow() {
  // Create a sphere with custom shader for subtle glow
  const glowGeometry = new THREE.SphereGeometry(2.5, 32, 32);
  
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x14e8a0) },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        // Radial gradient from center outward
        float dist = length(vPosition);
        float alpha = 0.15 * (0.5 + 0.5 * sin(time * 0.5)); // Slow pulse
        alpha *= (1.0 - dist / 2.5); // Fade to edge
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.BackSide,
  });
  
  portraitGlow = new THREE.Mesh(glowGeometry, glowMaterial);
  portraitGlow.position.z = -1;
  scene.add(portraitGlow);
}

// ============================================
// PARTICLES - Crystal-like instanced meshes
// ============================================
function createParticles() {
  const geometry = new THREE.OctahedronGeometry(0.16, 0);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x14e8a0,
    emissive: 0x0a6b4a,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.9,
    transmission: 0.65,
    thickness: 0.25,
    clearcoat: 0.4,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  particlesGroup = new THREE.InstancedMesh(geometry, material, particleCount);
  particlesGroup.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  particlePositions = new Float32Array(particleCount * 3);
  particleVelocities = new Float32Array(particleCount * 3);
  particleAges = new Float32Array(particleCount);

  const dummy = new THREE.Object3D();

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    const radius = Math.random() * 8 + 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;

    const x = Math.sin(phi) * Math.cos(theta) * radius;
    const y = Math.cos(phi) * radius;
    const z = Math.sin(phi) * Math.sin(theta) * radius;

    particlePositions[i3] = x;
    particlePositions[i3 + 1] = y;
    particlePositions[i3 + 2] = z;

    particleVelocities[i3] = (Math.random() - 0.5) * 0.02;
    particleVelocities[i3 + 1] = (Math.random() - 0.5) * 0.01 + 0.008;
    particleVelocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

    particleAges[i] = Math.random() * Math.PI * 2;

    dummy.position.set(x, y, z);
    dummy.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    dummy.scale.setScalar(0.7 + Math.random() * 0.4);
    dummy.updateMatrix();
    particlesGroup.setMatrixAt(i, dummy.matrix);
  }

  particlesGroup.instanceMatrix.needsUpdate = true;
  scene.add(particlesGroup);
}

// ============================================
// PARTICLE TEXTURE - Soft circular particles
// ============================================
function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;

  const ctx = canvas.getContext('2d');
  ctx.translate(64, 64);

  ctx.beginPath();
  ctx.moveTo(0, -54);
  ctx.lineTo(54, 0);
  ctx.lineTo(0, 54);
  ctx.lineTo(-54, 0);
  ctx.closePath();

  const gradient = ctx.createLinearGradient(-54, -54, 54, 54);
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}
// ============================================
// CRYSTAL SHARDS - Glass fragments with InstancedMesh
// ============================================
function createCrystalShards() {
  shardCount = 0;
  shardsGroup = null;
}


// ============================================
// SCROLL PROGRESS BAR
// ============================================
function createScrollProgressBar() {
  scrollProgressBar = document.createElement('div');
  scrollProgressBar.id = 'scroll-progress-bar';
  scrollProgressBar.style.position = 'fixed';
  scrollProgressBar.style.bottom = '0';
  scrollProgressBar.style.left = '0';
  scrollProgressBar.style.height = '4px';
  scrollProgressBar.style.width = '0%';
  scrollProgressBar.style.background = 'linear-gradient(90deg, #14e8a0, #7cf7c7)';
  scrollProgressBar.style.zIndex = '9999';
  scrollProgressBar.style.boxShadow = '0 0 12px rgba(20, 232, 160, 0.7)';
  scrollProgressBar.style.transition = 'width 0.12s ease-out';
  scrollProgressBar.style.borderRadius = '999px';
  scrollProgressBar.style.overflow = 'hidden';
  document.body.appendChild(scrollProgressBar);
  updateScrollProgressBar();
}

function updateScrollProgressBar() {
  if (!scrollProgressBar) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
  scrollProgressBar.style.width = `${progress * 100}%`;

  const bounce = 1 + Math.sin(progress * Math.PI * 2 + Date.now() * 0.001) * 0.04;
  scrollProgressBar.style.transform = `scaleX(${bounce})`;
  scrollProgressBar.style.transformOrigin = 'left center';
}

// ============================================
// SCROLL HANDLER
// ============================================
function onScroll() {
  if (!heroElement || !workElement) return;

  updateScrollProgressBar();

  heroTop = heroElement.getBoundingClientRect().top + window.scrollY;
  workTop = workElement.getBoundingClientRect().top + window.scrollY;

  const rangeStart = heroTop;
  const rangeEnd = workTop;
  const rangeHeight = rangeEnd - rangeStart;

  const currentScroll = window.scrollY;

  // Check if we're within the hero-to-work range
  if (currentScroll >= rangeStart && currentScroll <= rangeEnd) {
    scrollPercent = (currentScroll - rangeStart) / rangeHeight;
    scrollPercent = Math.max(0, Math.min(1, scrollPercent)); // Clamp 0-1

    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  } else {
    if (isAnimating) {
      isAnimating = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
function onWindowResize() {
  if (!camera || !renderer) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  updateScrollProgressBar();
}

// ============================================
// MOUSE MOVE HANDLER - Subtle parallax
// ============================================
function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  
  // Normalize to -1 to 1
  mouseNormX = (mouseX / window.innerWidth) * 2 - 1;
  mouseNormY = -(mouseY / window.innerHeight) * 2 + 1;
  
  // Very subtle camera movement (0.1 to 0.3 pixels)
  targetCameraOffsetX = mouseNormX * 0.15;
  targetCameraOffsetY = mouseNormY * 0.15;
}

// ============================================
// ANIMATION LOOP - Main render loop
// ============================================
function animate() {
  if (!isAnimating) {
    animationFrameId = null;
    return;
  }

  animationFrameId = requestAnimationFrame(animate);
  
  elapsedTime += 0.016; // ~60 FPS
  
  // Update all cinematic elements
  updateParticles();
  updateCrystalShards();
  updatePortraitGlow();
  updateParallax();
  
  // Render scene
  renderer.render(scene, camera);
}

// ============================================
// UPDATE PARTICLES - Soft crystal drift and subtle orbit
// ============================================
function updateParticles() {
  if (!particlesGroup) return;

  const dummy = new THREE.Object3D();
  const rotationBoost = 0.2 + scrollPercent * 0.75;

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = particlePositions[i3];
    const y = particlePositions[i3 + 1];
    const z = particlePositions[i3 + 2];

    dummy.position.set(x, y, z);
    dummy.rotation.set(
      elapsedTime * (0.08 + rotationBoost * 0.1) + i * 0.015,
      elapsedTime * (0.06 + rotationBoost * 0.08) + i * 0.012,
      elapsedTime * (0.05 + rotationBoost * 0.06) + i * 0.01
    );
    dummy.scale.setScalar(0.22 + (i % 4) * 0.02 + scrollPercent * 0.02);
    dummy.updateMatrix();
    particlesGroup.setMatrixAt(i, dummy.matrix);
  }

  particlesGroup.instanceMatrix.needsUpdate = true;
}

// ============================================
// UPDATE CRYSTAL SHARDS - Fade in, separate, fly out
// ============================================
function updateCrystalShards() {
  if (!shardsGroup) return;
  
  const dummy = new THREE.Object3D();
  const origPositions = shardsGroup.userData.originalPositions;
  const origRotations = shardsGroup.userData.originalRotations;
  const origScales = shardsGroup.userData.originalScales;
  
  for (let i = 0; i < shardCount; i++) {
    const origPos = origPositions[i];
    const origRot = origRotations[i];
    const origScale = origScales[i];
    
    // Phase 0-40%: Hidden, opacity 0
    if (scrollPercent < 0.4) {
      shardsGroup.material.opacity = 0;
      dummy.position.copy(origPos);
      dummy.rotation.copy(origRot);
      dummy.scale.copy(origScale);
    }
    // Phase 40-60%: Fade in and subtle rotation
    else if (scrollPercent < 0.6) {
      const fadePhase = (scrollPercent - 0.4) / 0.2; // 0 to 1
      shardsGroup.material.opacity = 0.3 * fadePhase;
      
      // Subtle rotation
      dummy.rotation.x = origRot.x + Math.sin(elapsedTime * 0.5 + i) * 0.1;
      dummy.rotation.y = origRot.y + Math.cos(elapsedTime * 0.4 + i) * 0.1;
      dummy.rotation.z = origRot.z + Math.sin(elapsedTime * 0.6 + i) * 0.08;
      
      dummy.position.copy(origPos);
      dummy.scale.copy(origScale);
    }
    // Phase 60-80%: Rotate and separate outward
    else if (scrollPercent < 0.8) {
      const separatePhase = (scrollPercent - 0.6) / 0.2; // 0 to 1
      shardsGroup.material.opacity = 0.3;
      
      // Continuous rotation
      dummy.rotation.x = origRot.x + elapsedTime * 0.3 * (i + 1);
      dummy.rotation.y = origRot.y + elapsedTime * 0.45 * (i + 1);
      dummy.rotation.z = origRot.z + elapsedTime * 0.24 * (i + 1);
      
      // Separate outward smoothly
      const separationDir = new THREE.Vector3(
        Math.sin(i * 0.5),
        Math.cos(i * 0.5),
        Math.sin(i * 0.25)
      ).normalize();
      
      dummy.position.copy(origPos);
      dummy.position.addScaledVector(separationDir, separatePhase * 2);
      dummy.scale.copy(origScale);
    }
    // Phase 80-100%: Fly out and fade
    else {
      const burstPhase = (scrollPercent - 0.8) / 0.2; // 0 to 1
      shardsGroup.material.opacity = 0.3 * (1 - burstPhase);
      
      // Continue rotating
      dummy.rotation.x = origRot.x + elapsedTime * 0.3 * (i + 1);
      dummy.rotation.y = origRot.y + elapsedTime * 0.45 * (i + 1);
      dummy.rotation.z = origRot.z + elapsedTime * 0.24 * (i + 1);
      
      // Fly outward
      const burstDir = new THREE.Vector3(
        Math.sin(i * 0.5),
        Math.cos(i * 0.5),
        Math.sin(i * 0.25)
      ).normalize();
      
      // Start from separation position and accelerate outward
      dummy.position.copy(origPos);
      dummy.position.addScaledVector(burstDir, 2 + burstPhase * 3);
      dummy.scale.copy(origScale);
    }
    
    dummy.updateMatrix();
    shardsGroup.setMatrixAt(i, dummy.matrix);
  }
  
  shardsGroup.instanceMatrix.needsUpdate = true;
}

// ============================================
// UPDATE PORTRAIT GLOW - Subtle pulsing
// ============================================
function updatePortraitGlow() {
  if (!portraitGlow) return;
  
  // Update time uniform for pulse animation
  portraitGlow.material.uniforms.time.value = elapsedTime;
  
  // Fade glow as user scrolls toward work section
  const glowFade = Math.max(0, 1 - scrollPercent);
  portraitGlow.material.uniforms.color.value.set(0x14e8a0);
}

// ============================================
// UPDATE PARALLAX - Subtle camera movement
// ============================================
function updateParallax() {
  // Smoothly interpolate camera offset toward target
  const lerpFactor = 0.05;
  cameraOffsetX += (targetCameraOffsetX - cameraOffsetX) * lerpFactor;
  cameraOffsetY += (targetCameraOffsetY - cameraOffsetY) * lerpFactor;
  
  // Apply to camera position
  camera.position.x = cameraOffsetX;
  camera.position.y = cameraOffsetY;
}

// ============================================
// STARTUP
// ============================================
init();