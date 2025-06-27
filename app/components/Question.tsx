'use client';
import { motion } from 'framer-motion';
import { Question } from '../../types';

interface QuestionComponentProps {
  question: Question;
  index: number;
  onDeleteQuestion: (questionId: string) => void;
}

interface MCQQuestion {
  id: string;
  type: 'mcq';
  question: string;
  options: string[];
  marks?: number;
}
interface MatchQuestion {
  id: string;
  type: 'match';
  question: string;
  columnA: string[];
  columnB: string[];
  marks?: number;
}
interface TrueFalseQuestion {
  id: string;
  type: 'true_false';
  question: string;
  answer: boolean;
  marks?: number;
}

export default function QuestionComponent({
  question,
  index,
  onDeleteQuestion,
}: QuestionComponentProps) {
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'mcq': {
        const mcqQuestion = question as MCQQuestion;
        return (
          <div className="mt-2 pl-4 space-y-1">
            {mcqQuestion.options && mcqQuestion.options.map((option, i) => (
              <div key={i} className="flex items-center">
                <span className="h-4 w-4 mr-2 rounded-full border border-gray-500 flex items-center justify-center text-xs">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      }
      case 'fill':
        return (
          <div className="mt-2">
            {question.question.split('_').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="mx-1 border-b-2 border-gray-400 inline-block min-w-[30px]">&nbsp;</span>
                )}
              </span>
            ))}
          </div>
        );
      case 'match': {
        const matchQuestion = question as MatchQuestion;
        return (
          <div className="mt-2 pl-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">Column A</div>
              <div className="font-medium">Column B</div>
            </div>
            {matchQuestion.columnA && matchQuestion.columnB && 
              Array.from({length: Math.max(matchQuestion.columnA.length, matchQuestion.columnB.length)}).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div>{i+1}. {matchQuestion.columnA[i] || ''}</div>
                  <div>{String.fromCharCode(97 + i)}. {matchQuestion.columnB[i] || ''}</div>
                </div>
              ))
            }
          </div>
        );
      }
      case 'true_false': {
        const tfQuestion = question as TrueFalseQuestion;
        return (
          <div className="mt-2 pl-4 flex space-x-4">
            <div className={`px-3 py-1 border rounded ${tfQuestion.answer === true ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}>
              True
            </div>
            <div className={`px-3 py-1 border rounded ${tfQuestion.answer === false ? 'bg-red-100 border-red-500' : 'border-gray-300'}`}>
              False
            </div>
          </div>
        );
      }
      case 'short':
      case 'long':
      default:
        return null;
    }
  };

  // Function to determine question type icon
  const getQuestionTypeIcon = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="bg-red-50 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'fill':
        return (
          <div className="bg-red-50 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        );
      case 'short':
        return (
          <div className="bg-red-50 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
        );
      case 'long':
        return (
          <div className="bg-red-50 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        );
      case 'match':
        return (
          <div className="bg-red-50 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        );
      case 'true_false':
        return (
          <div className="bg-red-50 p-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getQuestionTypeIcon()}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-medium text-black bg-gray-100 w-6 h-6 flex items-center justify-center rounded-full text-sm">
                {index}
              </span>
              <span className="font-medium text-gray-900">{question.question}</span>
            </div>
            <div className="ml-2">
              {renderQuestionContent()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {question.marks && (
            <span className="text-sm bg-black text-white px-2 py-0.5 rounded-full">
              {question.marks} marks
            </span>
          )}
          <motion.button
            onClick={() => onDeleteQuestion(question.id)}
            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-gray-100"
            title="Delete question"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
