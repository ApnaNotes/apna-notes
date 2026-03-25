'use client';

import { useState } from 'react';
import { motion, easeOut } from 'framer-motion';
import { MoveRight, X } from 'lucide-react';

interface LoginPageProps {
  compact?: boolean;
  onClose?: () => void;
}

export default function LoginPage({ compact = false, onClose }: LoginPageProps) {
  const [email, setEmail] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div className={compact ? "w-full" : "w-full min-h-screen"}>
      <div
        className={
          compact
            ? "relative z-10 flex items-center justify-center"
            : "relative min-h-screen z-10 flex items-center justify-center p-4"
        }
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative"
        >
          {onClose && (
            <motion.button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-[100] rounded-full border border-white/20 bg-black/70 p-2 text-white transition-colors hover:bg-red-500/20 hover:text-red-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close login modal"
            >
              <X className="w-6 h-6" />
            </motion.button>
          )}

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-[#3F3F3F] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl "
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Sign in to your account</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter your Email"
                  className="w-full bg-gray-100 dark:bg-[#1B1B1B] border border-gray-300 dark:border-white/20 rounded-full px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-gray-500 dark:focus:border-white/40 transition-colors"
                />
                <motion.button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-neutral-200 to-neutral-300 rounded-full p-3 transition-colors">
                  <MoveRight className="w-4 h-4 text-black" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" />
              <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent" />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 mb-6">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-full bg-gray-100 dark:bg-[#1B1B1B] border border-gray-300 dark:border-white/20 rounded-full px-6 py-4 text-gray-900 dark:text-white flex items-center justify-between hover:bg-gray-200 dark:hover:bg-black/60 transition-colors group"
              >
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Don&apos;t have an account? 
                <motion.a
                  href="#"
                  className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                   Sign up
                </motion.a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
