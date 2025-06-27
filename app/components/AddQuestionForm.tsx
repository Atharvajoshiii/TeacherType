'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, QuestionType } from '../../types';

interface AddQuestionFormProps {
  onAddQuestion: (question: Question) => void;
  onCancel: () => void;
}

export default function AddQuestionForm({ onAddQuestion, onCancel }: AddQuestionFormProps) {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('mcq');
  const [options, setOptions] = useState(['', '', '', '']);
  const [marks, setMarks] = useState<number | undefined>(undefined);
  const [columnA, setColumnA] = useState(['', '', '', '']);
  const [columnB, setColumnB] = useState(['', '', '', '']);
  const [trueOrFalse, setTrueOrFalse] = useState<boolean | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!questionText.trim()) return;
    
    let newQuestion: Question;
    
    switch (questionType) {
      case 'mcq':
        // Filter out empty options
        const validOptions = options.filter(opt => opt.trim() !== '');
        if (validOptions.length < 2) {
          alert('Please add at least 2 options for MCQ');
          return;
        }
        
        newQuestion = {
          id: `question-${Date.now()}`,
          type: 'mcq',
          question: questionText.trim(),
          options: validOptions,
          marks,
        };
        break;
        
      case 'fill':
        if (!questionText.includes('_')) {
          alert('For fill in the blanks questions, use underscore (_) to indicate blank spaces');
          return;
        }
        
        newQuestion = {
          id: `question-${Date.now()}`,
          type: 'fill',
          question: questionText.trim(),
          marks,
        };
        break;
        
      case 'match':
        // Filter out empty items from columnA and columnB
        const validColumnA = columnA.filter(item => item.trim() !== '');
        const validColumnB = columnB.filter(item => item.trim() !== '');
        
        if (validColumnA.length < 2 || validColumnB.length < 2) {
          alert('Please add at least 2 items for both columns');
          return;
        }
        
        newQuestion = {
          id: `question-${Date.now()}`,
          type: 'match',
          question: questionText.trim(),
          columnA: validColumnA,
          columnB: validColumnB,
          marks,
        };
        break;
        
      case 'short':
        newQuestion = {
          id: `question-${Date.now()}`,
          type: 'short',
          question: questionText.trim(),
          marks,
        };
        break;
        
      case 'long':
        newQuestion = {
          id: `question-${Date.now()}`,
          type: 'long',
          question: questionText.trim(),
          marks,
        };
        break;
        
      case 'true_false':
        if (trueOrFalse === undefined) {
          alert('Please select True or False');
          return;
        }
        
        newQuestion = {
          id: `question-${Date.now()}`,
          type: 'true_false',
          question: questionText.trim(),
          answer: trueOrFalse,
          marks,
        };
        break;
        
      default:
        return;
    }
    
    onAddQuestion(newQuestion);
    
    // Reset form
    setQuestionText('');
    setQuestionType('mcq');
    setOptions(['', '', '', '']);
    setMarks(undefined);
    setColumnA(['', '', '', '']);
    setColumnB(['', '', '', '']);
    setTrueOrFalse(undefined);
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    
    // Add a new blank option if needed
    if (index === options.length - 1 && value.trim() !== '') {
      setOptions([...newOptions, '']);
    }
  };
  
  const handleColumnAChange = (index: number, value: string) => {
    const newColumnA = [...columnA];
    newColumnA[index] = value;
    setColumnA(newColumnA);
    
    // Add a new blank item if needed
    if (index === columnA.length - 1 && value.trim() !== '') {
      setColumnA([...newColumnA, '']);
    }
  };
  
  const handleColumnBChange = (index: number, value: string) => {
    const newColumnB = [...columnB];
    newColumnB[index] = value;
    setColumnB(newColumnB);
    
    // Add a new blank item if needed
    if (index === columnB.length - 1 && value.trim() !== '') {
      setColumnB([...newColumnB, '']);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 mb-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-bold mb-4 text-black flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Add New Question
      </h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Question Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <motion.button
            type="button"
            className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${questionType === 'mcq' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'} border`}
            onClick={() => setQuestionType('mcq')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Multiple Choice
          </motion.button>
          
          <motion.button
            type="button"
            className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${questionType === 'fill' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'} border`}
            onClick={() => setQuestionType('fill')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
            </svg>
            Fill in Blanks
          </motion.button>
          
          <motion.button
            type="button"
            className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${questionType === 'short' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'} border`}
            onClick={() => setQuestionType('short')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Short Answer
          </motion.button>
          
          <motion.button
            type="button"
            className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${questionType === 'long' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'} border`}
            onClick={() => setQuestionType('long')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Long Answer
          </motion.button>
          
          <motion.button
            type="button"
            className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${questionType === 'match' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'} border`}
            onClick={() => setQuestionType('match')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            Matching
          </motion.button>
          
          <motion.button
            type="button"
            className={`px-3 py-2 text-sm rounded-md flex items-center justify-center ${questionType === 'true_false' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'} border`}
            onClick={() => setQuestionType('true_false')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            True/False
          </motion.button>
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="question" className="block text-gray-700 text-sm font-medium mb-2">
          Question Text
          {questionType === 'fill' && <span className="text-xs text-gray-500 ml-1">(Use _ for blanks)</span>}
        </label>
        <textarea
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
          rows={3}
          required
        />
      </div>
      
      {questionType === 'mcq' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Options
          </label>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center">
                <span className="bg-gray-100 text-gray-700 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                  {String.fromCharCode(65 + index)}
                </span>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {questionType === 'match' && (
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Column A
            </label>
            <div className="space-y-2">
              {columnA.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="bg-gray-100 text-gray-700 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleColumnAChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
                    placeholder={`Item ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Column B
            </label>
            <div className="space-y-2">
              {columnB.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="bg-gray-100 text-gray-700 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleColumnBChange(index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
                    placeholder={`Item ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {questionType === 'true_false' && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Answer
          </label>
          <div className="flex space-x-3">
            <motion.button
              type="button"
              onClick={() => setTrueOrFalse(true)}
              className={`px-4 py-2 rounded-md ${trueOrFalse === true ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              True
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setTrueOrFalse(false)}
              className={`px-4 py-2 rounded-md ${trueOrFalse === false ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              False
            </motion.button>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="marks" className="block text-gray-700 text-sm font-medium mb-2">
          Marks
        </label>
        <input
          id="marks"
          type="number"
          value={marks || ''}
          onChange={(e) => setMarks(e.target.valueAsNumber || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent transition"
          placeholder="Enter marks"
          min="1"
        />
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white border border-gray-300 text-black rounded-md text-sm hover:bg-gray-50 flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 shadow-sm flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Question
        </motion.button>
      </div>
    </motion.form>
  );
}
