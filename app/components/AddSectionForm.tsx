'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../types';

interface AddSectionFormProps {
  onAddSection: (section: Section) => void;
}

export default function AddSectionForm({ onAddSection }: AddSectionFormProps) {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: title.trim(),
      instructions: instructions.trim(),
      questions: [],
    };
    
    onAddSection(newSection);
    
    // Reset form
    setTitle('');
    setInstructions('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-semibold mb-4 text-black flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        Add New Section
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="section-title" className="flex items-center text-sm font-medium text-black mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Section Title (required)
          </label>
          <input
            id="section-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Section A"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
        
        <div>
          <label htmlFor="section-instructions" className="flex items-center text-sm font-medium text-black mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Instructions (optional)
          </label>
          <textarea
            id="section-instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Answer all questions or Attempt any 5 questions"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            rows={2}
          />
          <p className="mt-1 text-xs text-gray-500">These instructions will appear at the top of this section</p>
        </div>
        
        <motion.button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Section
        </motion.button>
      </div>
    </motion.form>
  );
}
