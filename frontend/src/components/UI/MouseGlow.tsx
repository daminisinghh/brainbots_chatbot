import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MouseGlow: React.FC = () => {
    // Smoother, slightly slower springs for a more "liquid" feel
    const springX = useSpring(0, { stiffness: 40, damping: 25 });
    const springY = useSpring(0, { stiffness: 40, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset to center the glow on the cursor (assuming 400px width)
            springX.set(e.clientX - 200);
            springY.set(e.clientY - 200);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [springX, springY]);

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
            {/* The Outer Nebula Glow (Violet) */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 75%)',
                    filter: 'blur(50px)',
                    x: springX,
                    y: springY,
                }}
            />
            
            {/* The Inner Core Spark (Cyan) */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                    x: springX,
                    y: springY,
                    // Offset this one slightly to be in the center of the outer glow
                    translateX: 125,
                    translateY: 125,
                }}
            />
        </div>
    );
};
