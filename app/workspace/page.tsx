'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import QuestionPaperEditor from '../components/QuestionPaperEditor';

export default function WorkspacePage() {
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <motion.h1 
              className="text-2xl font-bold text-black"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Question Paper Editor
            </motion.h1>
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/" className="px-3 py-1.5 text-sm text-gray-700 hover:text-black transition-colors">
                Home
              </Link>
            </motion.div>
          </div>
          <motion.p 
            className="text-gray-600 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create and edit your question paper sections and questions below
          </motion.p>
        </header>
        
        <QuestionPaperEditor />
      </div>
    </motion.div>
  );
}
