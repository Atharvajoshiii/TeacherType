'use client';
import { Section, Question } from '../../types';

interface PreviewModeProps {
  sections: Section[];
}

// Define explicit interfaces for MCQ and Match questions
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

export default function PreviewMode({ sections }: PreviewModeProps) {
  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case 'mcq': {
        const mcqQuestion = question as MCQQuestion;
        return (
          <div className="mt-1 pl-6 space-y-1">
            {mcqQuestion.options && mcqQuestion.options.map((option, i) => (
              <div key={i} className="flex">
                <span className="mr-2">{String.fromCharCode(65 + i)}.</span>
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      }
      case 'fill':
        return (
          <div className="mt-1">
            {question.question.split('_').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="mx-1 border-b border-black inline-block min-w-[30px]">&nbsp;</span>
                )}
              </span>
            ))}
          </div>
        );
      case 'match': {
        const matchQuestion = question as MatchQuestion;
        return (
          <div className="mt-1 pl-6">
            <div className="flex justify-between mb-2 font-medium">
              <div className="w-1/2">Column A</div>
              <div className="w-1/2">Column B</div>
            </div>
            {matchQuestion.columnA && matchQuestion.columnB && 
              Array.from({length: Math.max(matchQuestion.columnA.length, matchQuestion.columnB.length)}).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="w-1/2">{i+1}. {matchQuestion.columnA[i] || ''}</div>
                  <div className="w-1/2">{String.fromCharCode(97 + i)}. {matchQuestion.columnB[i] || ''}</div>
                </div>
              ))
            }
          </div>
        );
      }
      case 'true_false':
        return (
          <div className="mt-1 pl-6 flex space-x-4">
            <div className="px-3 py-1 border border-gray-300 rounded">True</div>
            <div className="px-3 py-1 border border-gray-300 rounded">False</div>
          </div>
        );
      case 'short':
      case 'long':
        return (
          <div className="mt-1 pl-6">
            {question.type === 'long' ? (
              <div className="h-16 border-b border-gray-300"></div>
            ) : (
              <div className="h-8 border-b border-gray-300"></div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (sections.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">No content to preview. Add sections and questions first.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow print:shadow-none">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2 text-black">Question Paper</h1>
        <p className="text-sm text-black">
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="break-inside-avoid">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-black">{section.title}</h2>
              {section.instructions && (
                <p className="text-sm italic mt-1 text-black">{section.instructions}</p>
              )}
            </div>
            <div className="space-y-4">
              {section.questions.map((question, questionIndex) => (
                <div key={question.id} className="break-inside-avoid">
                  <div className="flex">
                    <span className="font-medium mr-2 text-black">
                      {questionIndex + 1}.
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="text-black">{question.question}</div>
                        {question.marks && (
                          <div className="text-sm text-black ml-2">
                            [{question.marks} marks]
                          </div>
                        )}
                      </div>
                      {renderQuestionContent(question)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
