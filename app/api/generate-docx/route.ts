import { NextRequest, NextResponse } from 'next/server';
import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer, LineRuleType, TabStopType } from 'docx';
import { Section, Question } from '../../../types';

// Explicit interfaces for MCQ and Match questions
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


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Check if we're receiving sectioned format or flat questions array
    let allQuestions: Question[] = [];
    
    if (data.sections && Array.isArray(data.sections)) {
      // Extract questions from sections
      const sections: Section[] = data.sections;
      sections.forEach(section => {
        if (section.questions && Array.isArray(section.questions)) {
          allQuestions = allQuestions.concat(section.questions);
        }
      });
    } else if (data.questions && Array.isArray(data.questions)) {
      // If directly receiving questions array
      allQuestions = data.questions;
    } else {
      return new NextResponse(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (allQuestions.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'No questions found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Group questions by type
    const groupedQuestions: Record<string, Question[]> = {};
    allQuestions.forEach(q => {
      if (!groupedQuestions[q.type]) {
        groupedQuestions[q.type] = [];
      }
      groupedQuestions[q.type].push(q);
    });
    
    // Section letters for each type (to use in headers like "SECTION A: Multiple Choice Questions")
    const sectionLetters: Record<string, string> = {
      mcq: "A",
      fill: "B",
      short: "C",
      long: "D",
      match: "E",
      true_false: "F"
    };

    // Section headers mapping
    const sectionHeaders: Record<string, string> = {
      mcq: "Multiple Choice Questions",
      fill: "Fill in the Blanks",
      short: "Short Answer Questions",
      long: "Long Answer Questions",
      match: "Match the Following",
      true_false: "True/False Questions"
    };

    // Instructions mapping
    const sectionInstructions: Record<string, string> = {
      mcq: "Choose the correct option from the given alternatives:",
      fill: "Fill in the blanks with appropriate words:",
      short: "Answer the following questions briefly:",
      long: "Answer the following questions in detail:",
      match: "Match the items in Column A with Column B:",
      true_false: "State whether the following statements are True or False:"
    };
    
    // Create document elements
    const docElements: Paragraph[] = [];
    
    // Add main title with enhanced formatting
    docElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "QUESTION PAPER",
            bold: true,
            size: 40, // Larger size for better visibility
            font: "Times New Roman",
            color: "000000", // Adding black color to title
          }),
        ],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 } // More space after title
      })
    );
    
    // Add date with better formatting
    docElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            size: 24,
            font: "Times New Roman",
            color: "000000", // Adding black color to date
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 500, // More space after date
        },
      })
    );
    
    // Process each question type as a section
    Object.keys(groupedQuestions).forEach(type => {
      const questionsOfType = groupedQuestions[type];
      
      // Add section header with professional formatting - bold black text only
      docElements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: sectionHeaders[type] || `SECTION ${sectionLetters[type] || ""}: ${type.toUpperCase()}`,
              bold: true,
              size: 28,
              color: "000000", // Black color for section headers
              font: "Times New Roman",
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
          alignment: AlignmentType.LEFT
        })
      );

      // Add section instructions with better formatting
      docElements.push(
        new Paragraph({
          children: [
            new TextRun({
              text: sectionInstructions[type] || "Answer the following questions:",
              italics: true,
              size: 24,
              font: "Times New Roman",
              color: "000000", // Adding black color to instructions
            })
          ],
          spacing: { after: 250 },
        })
      );
      
      // Add questions for this section
      questionsOfType.forEach((question, i) => {
        // Format marks consistently across all question types
        const marksValue = question.marks ? `[${question.marks} marks]` : '';
        const questionNumber = `${i + 1}. `;
        
        // Handle different question types
        if (type === "mcq" && (question as MCQQuestion).options) {
          const mcqQuestion = question as MCQQuestion;
          // Question text for MCQ
          docElements.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${questionNumber}${question.question} `,
                  bold: true,
                  color: "000000", // Black color
                  font: "Times New Roman",
                  size: 24,
                }),
                new TextRun({
                  text: marksValue,
                  italics: true,
                  color: "000000", // Black color for better visibility
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: {
                before: 150,
                after: 100,
                line: 360,
                lineRule: LineRuleType.AUTO,
              },
            })
          );
          
          // Add options with improved alignment
          mcqQuestion.options.forEach((option: string, idx: number) => {
            docElements.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${String.fromCharCode(65 + idx)}. `,
                    bold: true,
                    color: "000000", // Adding black color to option letters
                    font: "Times New Roman",
                    size: 24,
                  }),
                  new TextRun({
                    text: option,
                    color: "000000", // Adding black color to option text
                    font: "Times New Roman",
                    size: 24,
                  })
                ],
                indent: { left: 720 },
                spacing: { after: 80 },
                tabStops: [
                  {
                    type: TabStopType.LEFT,
                    position: 720, // First tab stop for better alignment
                  }
                ]
              })
            );
          });
        } else if (type === "match" && (question as MatchQuestion).columnA && (question as MatchQuestion).columnB) {
          // Match the following type
          const matchQuestion = question as MatchQuestion;
          
          docElements.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${questionNumber}${question.question} `,
                  bold: true,
                  color: "000000", // Black color
                  font: "Times New Roman",
                  size: 24,
                }),
                new TextRun({
                  text: marksValue,
                  italics: true,
                  color: "000000", // Black color for better visibility
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: {
                before: 150,
                after: 100,
                line: 360,
                lineRule: LineRuleType.AUTO,
              },
            })
          );
          
          // Create a better formatted column header with proper tab stops
          docElements.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "Column A",
                  bold: true,
                  color: "000000", // Adding black color
                  font: "Times New Roman",
                  size: 24,
                }),
                new TextRun({
                  text: "\t",  // Use tab for proper spacing
                }),
                new TextRun({
                  text: "Column B",
                  bold: true,
                  color: "000000", // Adding black color
                  font: "Times New Roman",
                  size: 24,
                })
              ],
              spacing: { after: 100 },
              indent: { left: 720 }, // Indent column headers
              tabStops: [
                {
                  type: TabStopType.LEFT,
                  position: 3600, // Position for Column B
                }
              ]
            })
          );
          
          // Create a better match layout with proper tab alignment
          const maxLength = Math.max(matchQuestion.columnA.length, matchQuestion.columnB.length);
          for (let j = 0; j < maxLength; j++) {
            const colA = matchQuestion.columnA[j] || "";
            const colB = matchQuestion.columnB[j] || "";
            
            docElements.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${j + 1}. `,
                    bold: true,
                    color: "000000", // Adding black color
                    font: "Times New Roman",
                    size: 24,
                  }),
                  new TextRun({
                    text: colA,
                    color: "000000", // Adding black color
                    font: "Times New Roman",
                    size: 24,
                  }),
                  new TextRun({
                    text: "\t", // Use tab for proper alignment
                  }),
                  new TextRun({
                    text: `${String.fromCharCode(97 + j)}. `,
                    bold: true,
                    color: "000000", // Adding black color
                    font: "Times New Roman",
                    size: 24,
                  }),
                  new TextRun({
                    text: colB,
                    color: "000000", // Adding black color
                    font: "Times New Roman",
                    size: 24,
                  }),
                ],
                spacing: { after: 80 },
                indent: { left: 720 }, // Indent columns content
                tabStops: [
                  {
                    type: TabStopType.LEFT,
                    position: 3600, // Position for Column B (consistent with header)
                  }
                ]
              })
            );
          }
        } else if (type === "fill") {
          // Fill in the blanks - improved formatting
          docElements.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${questionNumber}${question.question.replace(/_/g, '_____')} `,
                  bold: true,
                  color: "000000", // Adding black color
                  font: "Times New Roman",
                  size: 24,
                }),
                new TextRun({
                  text: marksValue,
                  italics: true,
                  color: "000000", // Black color for better visibility
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: {
                before: 150,
                after: 200,
                line: 360,
                lineRule: LineRuleType.AUTO,
              },
            })
          );
        } else {
          // Other question types (short, long, true_false) - NO ANSWER LINES
          docElements.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${questionNumber}${question.question} `,
                  bold: true,
                  color: "000000", // Adding black color
                  font: "Times New Roman",
                  size: 24,
                }),
                new TextRun({
                  text: marksValue,
                  italics: true,
                  color: "000000", // Black color for better visibility
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: {
                before: 150,
                after: 200,
                line: 360,
                lineRule: LineRuleType.AUTO,
              },
            })
          );
        }
        
        // Add extra space after each question
        docElements.push(
          new Paragraph({
            text: '',
            spacing: {
              after: 150,
            },
          })
        );
      });
      
      // Add some space between sections
      docElements.push(
        new Paragraph({
          text: "",
          spacing: { after: 300 }
        })
      );
    });
    
    // Create a new document with all paragraphs and professionally formatted page settings
    const doc = new Document({
      creator: "Question Paper Generator",
      title: "Question Paper",
      description: "Generated question paper document",
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            run: {
              font: "Times New Roman",
              size: 24,
              color: "000000", // Ensuring black text throughout document
            },
          },
        ],
      },
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1000, // ~1 inch top margin
              right: 900, // ~0.9 inch right margin
              bottom: 1000, // ~1 inch bottom margin
              left: 900, // ~0.9 inch left margin
            },
            size: {
              width: 12240, // 8.5 inches
              height: 15840, // 11 inches
            }
          }
        },
        children: docElements,
      }],
    });
    
    // Generate the document as a buffer
    const buffer = await Packer.toBuffer(doc);
    
    // In Next.js API routes, we need to return the buffer as a response
    // rather than saving it to the filesystem
    const fileName = `QuestionPaper_${Date.now()}.docx`;
    
    // Convert buffer to Uint8Array which is a valid BodyInit
    const uint8Array = new Uint8Array(buffer);
    
    // Return the document with appropriate headers for download
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    });
    
  } catch (error) {
    console.error('Error generating docx:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate document' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}