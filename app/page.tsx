'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation Bar */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="ml-2 text-lg font-bold text-gray-900">QPGenerator</span>
                </Link>
              </motion.div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Features</Link>
              <Link href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">About</Link>
              <Link href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">FAQ</Link>
              <Link href="/workspace" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
                Get Started
              </Link>
            </div>
            
            <div className="md:hidden">
              <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <motion.main 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
            <div className="lg:w-1/2 text-left">
              <motion.div 
                className="inline-block px-4 py-1 mb-6 bg-red-50 text-red-600 rounded-full font-medium text-sm border border-red-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Simple · Fast · Professional
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl font-black mb-6 text-gray-900 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Create <span className="relative">
                  Beautiful
                  <svg className="absolute -bottom-2 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9C71 3 146 1.5 297 9" stroke="#EF4444" strokeWidth="5" strokeLinecap="round"/>
                  </svg>
                </span> Question Papers
              </motion.h1>
              
              <motion.p 
                className="text-xl mb-8 text-gray-700 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                A powerful tool for educators to design professional, customizable question papers with ease. Save time and focus on what matters most—teaching.
              </motion.p>
              
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Link
                  className="px-8 py-3.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors flex items-center justify-center shadow-md"
                  href="/workspace"
                >
                  <span>Create Your First Paper</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                
                <Link
                  className="px-8 py-3.5 bg-white text-gray-800 border border-gray-300 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center group"
                  href="#features"
                >
                  <span>See Features</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </Link>
              </motion.div>
              
              <motion.div
                className="mt-12 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-sm text-gray-700">
                  <span className="font-medium">Trusted by 1000+</span> teachers worldwide
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <motion.div 
                className="relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3,
                }}
              >
                <div className="w-full h-full absolute bg-red-100 rounded-full filter blur-3xl opacity-20 -z-10 transform scale-150"></div>
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src="/question-paper.svg"
                    alt="Question Paper"
                    width={500}
                    height={500}
                    className="relative z-10"
                    priority
                  />
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                  className="absolute top-10 -left-10 bg-white p-3 rounded-lg shadow-lg flex items-center"
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Easy to format</span>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-5 right-10 bg-white p-3 rounded-lg shadow-lg flex items-center"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Download as DOCX</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          <div id="features" className="max-w-5xl mx-auto w-full pt-16">
            
            <motion.h2
              className="text-3xl font-bold mb-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Designed for <span className="text-red-600">Educators</span>
            </motion.h2>
            
            <motion.p
              className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our tools simplify the question paper creation process so you can focus on what really matters - creating great educational content.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="mb-6 p-4 rounded-2xl bg-red-50 w-16 h-16 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">Easy Question Creation</h2>
                <p className="text-gray-700 mb-4 pr-4">Create multiple choice, fill-in-the-blank, short and long answer questions with intuitive tools and formatting.</p>
                <div className="flex items-center text-red-600 font-medium">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="mb-6 p-4 rounded-2xl bg-blue-50 w-16 h-16 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">Smart Organization</h2>
                <p className="text-gray-700 mb-4 pr-4">Group questions into sections with custom instructions and organize with simple drag-and-drop functionality.</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="mb-6 p-4 rounded-2xl bg-green-50 w-16 h-16 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors">Professional Output</h2>
                <p className="text-gray-700 mb-4 pr-4">Generate beautifully formatted Word documents with consistent styling perfect for classroom distribution.</p>
                <div className="flex items-center text-green-600 font-medium">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col md:flex-row gap-6 items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-10 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="md:w-2/3 text-white text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3">Ready to create your first question paper?</h3>
                <p className="text-gray-300">Join thousands of educators who are saving time and creating professional papers.</p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link
                  className="px-8 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors flex items-center justify-center shadow-md"
                  href="/workspace"
                >
                  <span>Get Started Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.main>
        
        <footer className="mt-24 border-t border-gray-200 pt-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Question Paper Generator</h3>
              <p className="text-gray-600 mb-4">A professional tool designed specifically for educators to create beautiful question papers effortlessly.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Question Types</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Paper Templates</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Export Options</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Cloud Saving</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Video Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Contact Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 Question Paper Generator. All rights reserved.
            </p>
            <p className="text-sm text-gray-600">
              Made with <span className="text-red-600">❤️</span> for teachers by <span className="font-bold">Atharva</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
