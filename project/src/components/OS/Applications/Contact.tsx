import React, { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      if (formState.name && formState.email && formState.message) {
        setSubmitted(true);
        setError(false);
      } else {
        setError(true);
      }
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="font-mono text-sm">
      <h2 className="text-red-400 text-lg mb-4 border-b border-red-800 pb-2">Contact Me</h2>
      
      <div className="bg-gray-800/70 p-4 rounded border border-gray-700">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1" htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-1" htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-1" htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white h-32 focus:outline-none focus:border-red-500"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            {error && (
              <div className="mb-4 flex items-center gap-2 text-red-400 bg-red-900/20 p-2 rounded">
                <AlertCircle size={16} />
                <span>Please fill out all fields</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center gap-2 px-4 py-2 rounded ${
                submitting 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-red-700 hover:bg-red-600 text-white'
              }`}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-200 rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/30 text-green-400 rounded-full mb-4">
              <Check size={32} />
            </div>
            <h3 className="text-green-400 text-lg mb-2">Message Sent!</h3>
            <p className="text-gray-300 mb-4">Thank you for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormState({ name: '', email: '', message: '' });
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-gray-800/70 p-4 rounded border border-gray-700">
        <h3 className="text-red-400 mb-3">Other Ways to Connect</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Email:</span>
            <span className="text-gray-300">contact@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">LinkedIn:</span>
            <a href="#" className="text-blue-400 hover:underline">linkedin.com/in/example</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">GitHub:</span>
            <a href="#" className="text-blue-400 hover:underline">github.com/example</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;