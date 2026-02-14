'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface MotionProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const FadeIn = ({ children, className, delay = 0, ...props }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cn(className)}
        {...props}
    >
        {children}
    </motion.div>
);

export const SlideUp = ({ children, className, delay = 0, ...props }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={cn(className)}
        {...props}
    >
        {children}
    </motion.div>
);

export const ScaleIn = ({ children, className, delay = 0, ...props }: MotionProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        className={cn(className)}
        {...props}
    >
        {children}
    </motion.div>
);

export const HoverCard = ({ children, className, ...props }: MotionProps) => (
    <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={cn(className)}
        {...props}
    >
        {children}
    </motion.div>
);
