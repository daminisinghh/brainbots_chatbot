import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MouseGlow: React.FC = () => {


    // Smooth spring physics for the glow to "trail" slightly
    const springX = useSpring(0, { stiffness: 50, damping: 20 });
    const springY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            springX.set(e.clientX - 250); // Offset by half the width
            springY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [springX, springY]);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 1,
                x: springX,
                y: springY,
            }}
        />
    );
};
