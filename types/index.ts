// Question types
export type QuestionType = 'mcq' | 'fill' | 'short' | 'long' | 'match' | 'true_false';

// Base Question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  marks?: number;
}

// Multiple Choice Question
export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  options: string[];
}

// Fill in the Blanks Question
export interface FillQuestion extends BaseQuestion {
  type: 'fill';
}

// Short Answer Question
export interface ShortQuestion extends BaseQuestion {
  type: 'short';
}

// Long Answer Question
export interface LongQuestion extends BaseQuestion {
  type: 'long';
}

// Match the Following Question
export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  columnA: string[];
  columnB: string[];
}

// True False Question
export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  answer?: boolean;
}

// Union type for all question types
export type Question = MCQQuestion | FillQuestion | ShortQuestion | LongQuestion | MatchQuestion | TrueFalseQuestion;

// Section interface
export interface Section {
  id: string;
  title: string;
  instructions: string;
  questions: Question[];
}

// QuestionPaper interface
export interface QuestionPaper {
  sections: Section[];
}
