import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { ErrorBoundary } from './ErrorBoundary';
import { useInView } from 'framer-motion';

function Model({ url }: { url: string }) {
    if (!url) return null;
    const { scene } = useGLTF(url);
    // @ts-ignore - primitive is a valid R3F element
    return <primitive object={scene} />;
}

export function ModelViewer({ modelPath, className }: { modelPath: string; className?: string }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.1 });

    return (
        <ErrorBoundary fallback={<div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-xl"><span className="text-gray-400 text-xs text-center p-2">Error loading 3D</span></div>}>
            <div ref={containerRef} className={`w-full h-full min-h-[300px] bg-gray-50 rounded-xl overflow-hidden relative ${className ?? ''}`}>
                {isInView ? (
                    <Canvas
                        shadows
                        camera={{ position: [0, 0, 4], fov: 50 }}
                        dpr={[1, 1.5]} // Reduced dpr for better performance
                        gl={{
                            antialias: true,
                            preserveDrawingBuffer: true,
                            powerPreference: 'low-power', // Prefer low power to avoid resource exhaustion
                            failIfMajorPerformanceCaveat: false
                        }}
                        onCreated={({ gl }) => {
                            const handleContextLost = (event: Event) => {
                                event.preventDefault();
                                console.warn('WebGL Context Lost for:', modelPath, '. Attempting to recover...');
                            };
                            const handleContextRestored = () => {
                                console.info('WebGL Context Restored for:', modelPath);
                            };
                            gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
                            gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);
                        }}
                    >
                        <Suspense fallback={null}>
                            <Stage environment="city" intensity={0.6} adjustCamera={1.5}>
                                <Model url={modelPath} />
                            </Stage>
                        </Suspense>
                        <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enableZoom={false} />
                    </Canvas>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mb-2"></div>
                            <span className="text-gray-300 text-[10px]">Loading 3D...</span>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
}
