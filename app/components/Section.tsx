'use client';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Section, Question } from '../../types';
import QuestionComponent from './Question';
import AddQuestionForm from './AddQuestionForm';

interface SectionProps {
  section: Section;
  onUpdateSection: (section: Section) => void;
  onDeleteSection: (sectionId: string) => void;
  onAddQuestion: (sectionId: string, question: Question) => void;
}

export default function SectionComponent({
  section,
  onUpdateSection,
  onDeleteSection,
  onAddQuestion,
}: SectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [instructions, setInstructions] = useState(section.instructions);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    onUpdateSection({
      ...section,
      title,
      instructions,
    });
    setIsEditing(false);
  };

  const handleAddQuestion = (question: Question) => {
    onAddQuestion(section.id, question);
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (questionId: string) => {
    onUpdateSection({
      ...section,
      questions: section.questions.filter(q => q.id !== questionId),
    });
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
      whileHover={{ scale: 1.01 }}
    >
      <div className="p-4 bg-black text-white border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-gray-800 rounded transition-colors duration-150 flex items-center justify-center"
            title="Drag to reorder"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="19" r="1" />
            </svg>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-500 p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Section Title"
            />
          ) : (
            <h3 className="font-semibold text-lg tracking-tight">{section.title}</h3>
          )}
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <motion.button
              onClick={handleSave}
              className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded flex items-center"
              whileHover={{ backgroundColor: "#b91c1c", scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Save
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 bg-white text-black border border-gray-300 text-sm font-medium rounded flex items-center"
              whileHover={{ backgroundColor: "#f3f4f6", scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </motion.button>
          )}
          <motion.button
            onClick={() => onDeleteSection(section.id)}
            className="px-3 py-1.5 bg-black text-white border border-gray-300 text-sm font-medium rounded flex items-center"
            whileHover={{ backgroundColor: "#1f2937", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete
          </motion.button>
        </div>
      </div>
      
      <div className="p-5">
        {isEditing ? (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md mb-1 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Type instructions for this section (e.g., 'Answer any 5 questions')"
              rows={2}
            />
            <p className="text-xs text-gray-500">These instructions will appear at the top of this section</p>
          </motion.div>
        ) : (
          instructions && (
            <motion.div 
              className="mb-5 p-4 bg-gray-50 border-l-4 border-red-500 text-sm text-gray-800 rounded shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="font-medium text-xs uppercase text-gray-500">Instructions:</p>
              </div>
              {section.instructions}
            </motion.div>
          )
        )}
        
        <motion.div 
          className="space-y-4 mb-6"
          layout
        >
          {section.questions.length > 0 ? (
            section.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <QuestionComponent
                  question={question}
                  index={index + 1}
                  onDeleteQuestion={handleDeleteQuestion}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-6 border border-dashed border-gray-300 rounded-md bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-500">No questions added yet</p>
              <p className="text-xs text-gray-400 mt-1">Click the button below to add your first question</p>
            </motion.div>
          )}
        </motion.div>
        
        {showAddQuestion ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddQuestionForm onAddQuestion={handleAddQuestion} onCancel={() => setShowAddQuestion(false)} />
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowAddQuestion(true)}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-black hover:border-red-400 hover:bg-red-50 flex items-center justify-center group"
            whileHover={{ scale: 1.01, backgroundColor: "rgba(254, 226, 226, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 group-hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Question
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
