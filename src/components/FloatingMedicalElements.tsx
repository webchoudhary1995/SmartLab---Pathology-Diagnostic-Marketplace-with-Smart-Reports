'use client';

import { motion } from 'framer-motion';
import { Plus, Droplet, Activity } from 'lucide-react';

export default function FloatingMedicalElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Syringes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`syringe-${i}`}
          className="absolute text-cyan-200/30"
          style={{
            left: `${10 + i * 30}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [-5, 5, -5],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 3l2 2-9 9-4 1 1-4 9-9z" />
            <path d="M14.5 5.5l4 4" />
            <path d="M3 21l3-3" />
            <circle cx="17" cy="6" r="3" />
          </svg>
        </motion.div>
      ))}

      {/* Pulsing Plus Signs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`plus-${i}`}
          className={`absolute ${i % 2 === 0 ? 'text-red-400/20' : 'text-emerald-400/20'}`}
          style={{
            right: `${5 + i * 15}%`,
            top: `${10 + (i % 4) * 20}%`,
          }}
          animate={{
            scale: [0.95, 1.1, 0.95],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Plus className="w-12 h-12" strokeWidth={2} />
        </motion.div>
      ))}

      {/* Blood Drops */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          className="absolute text-red-400/25"
          style={{
            left: `${15 + i * 18}%`,
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.8, 0.8, 0],
            x: [0, 20, -10, 0],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2,
          }}
        >
          <Droplet className="w-6 h-6" />
        </motion.div>
      ))}

      {/* DNA/Cell Orbs - Background Margins */}
      <motion.div
        className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-200/20 to-indigo-200/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 w-60 h-60 rounded-full bg-gradient-to-br from-purple-200/15 to-pink-200/15 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute left-1/3 -bottom-20 w-72 h-72 rounded-full bg-gradient-to-br from-green-200/15 to-emerald-200/15 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Activity/Microscope Icons */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`activity-${i}`}
          className="absolute text-indigo-300/20"
          style={{
            left: `${25 + i * 25}%`,
            bottom: `${15 + i * 10}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Activity className="w-10 h-10" />
        </motion.div>
      ))}

      {/* Additional subtle floating elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute border border-cyan-200/15 rounded-full"
          style={{
            left: `${5 + i * 22}%`,
            top: `${30 + (i % 2) * 40}%`,
            width: 20 + i * 10,
            height: 20 + i * 10,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}