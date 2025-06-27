'use client';
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Question } from '../../types';
import QuestionComponent from './Question';
import AddQuestionForm from './AddQuestionForm';


import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Question component
function SortableQuestion({ question, index, onDeleteQuestion, id }: 
  { question: Question, index: number, onDeleteQuestion: (id: string) => void, id: string }) {
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 p-2 cursor-move hover:bg-gray-200 rounded"
        {...attributes}
        {...listeners}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="5" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="15" cy="5" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="19" r="1" />
        </svg>
      </div>
      <QuestionComponent 
        question={question} 
        index={index} 
        onDeleteQuestion={onDeleteQuestion}
      />
    </div>
  );
}

export default function QuestionPaperEditor() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion]);
    setShowAddQuestion(false);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active.id || !over?.id) return;

    setQuestions((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleDownload = async () => {
    try {
      if (questions.length === 0) {
        alert('Please add at least one question before downloading.');
        return;
      }
      
      const payload = { questions };
      
      const response = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate document');
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a link and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `QuestionPaper_${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  const groupedQuestions: Record<string, Question[]> = {};
  questions.forEach(q => {
    if (!groupedQuestions[q.type]) {
      groupedQuestions[q.type] = [];
    }
    groupedQuestions[q.type].push(q);
  });

  return (
    <div className="w-full mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Question Paper Generator</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)} 
            className="px-4 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700 transition-colors"
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
          <button 
            onClick={handleDownload} 
            className="px-4 py-2 bg-green-600 text-black rounded-md hover:bg-green-700 transition-colors"
            disabled={questions.length === 0}
          >
            Download
          </button>
        </div>
      </div>
      
      {isPreviewMode ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {Object.keys(groupedQuestions).length > 0 ? (
            Object.entries(groupedQuestions).map(([type, typeQuestions]) => (
              <div key={type} className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  {type === 'mcq' && 'Multiple Choice Questions'}
                  {type === 'fill' && 'Fill in the Blanks'}
                  {type === 'short' && 'Short Answer Questions'}
                  {type === 'long' && 'Long Answer Questions'}
                  {type === 'match' && 'Match the Following'}
                  {type === 'true_false' && 'True/False Questions'}
                </h3>
                <div className="space-y-3">
                  {typeQuestions.map((question, idx) => (
                    <div key={question.id} className="pl-4">
                      <QuestionComponent 
                        question={question} 
                        index={idx + 1}
                        onDeleteQuestion={() => {}} // No delete in preview mode
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No questions added yet.</p>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              {questions.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold mb-4">Questions List</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop questions to reorder them.
                  </p>
                  
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                  >
                    <SortableContext 
                      items={questions.map(question => question.id)} 
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-4 pl-8">
                        {questions.map((question, index) => (
                          <SortableQuestion 
                            key={question.id}
                            id={question.id}
                            question={question}
                            index={index + 1}
                            onDeleteQuestion={handleDeleteQuestion}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 h-full flex items-center justify-center">
                  <p className="text-gray-500">No questions added yet. Use the form on the right to add questions.</p>
                </div>
              )}
            </div>
            
            <div className="col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-4 text-black">Question Management</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Add questions below. The system will automatically organize them when you download.
                </p>
                
                {showAddQuestion ? (
                  <AddQuestionForm 
                    onAddQuestion={handleAddQuestion} 
                    onCancel={() => setShowAddQuestion(false)} 
                  />
                ) : (
                  <button
                    onClick={() => setShowAddQuestion(true)}
                    className="w-full py-3 border border-dashed border-gray-300 rounded-md text-black hover:bg-gray-50"
                  >
                    + Add New Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
