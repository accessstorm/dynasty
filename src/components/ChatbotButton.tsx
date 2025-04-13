import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAEy_tjkGuwRVvc2OxmkI_Memqx0Rz_VrE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatbotButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! How can I help you with Dynasty products today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    if (isChatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [isChatOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    const newUserMessage = { role: 'user', content: userInput };
    const currentInput = userInput;
    
    // Add user message to chat
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setLoading(true);
    
    try {
      // Create context for Gemini with information about Dynasty products
      const dynastyContext = `
        You are a customer service chatbot for Dynasty, a luxury clothing brand specializing in neckties, bow ties, pocket squares, and formal wear.
        Dynasty offers premium products ranging from ₹3,499 for pocket squares to ₹16,999 for premium collections.
        Delivery takes 3-4 days for prepaid orders and 1-2 days extra for COD orders. Same-day delivery is available within Delhi NCR.
        Dynasty offers returns and exchanges within 7 days of delivery, except for sale items which are non-returnable.
        Dynasty products are crafted from premium materials like silk and microfiber and come in various colors and patterns.
      `;
      
      // Combine context with user input
      const prompt = `${dynastyContext}\n\nCustomer: ${currentInput}\n\nAssistant:`;
      
      // Generate response from Gemini
      const result = await model.generateContent(prompt);
      const response = result.response;
      const responseText = response.text();
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      
      // Fallback response
      let responseText = "I'm sorry, I encountered an error. Please try again.";
      
      // Simple keyword-based fallback
      const input = currentInput.toLowerCase();
      
      if (input.includes('necktie') || input.includes('tie')) {
        responseText = "Our neckties are crafted from premium materials like silk and microfiber. They come in various colors and patterns. Would you like to see our necktie collection?";
      } else if (input.includes('bow tie')) {
        responseText = "Our bow ties are perfect for formal events and come in classic and modern designs. Would you like to see our bow tie collection?";
      } else if (input.includes('pocket square')) {
        responseText = "Our pocket squares add a touch of elegance to any suit. They're available in matching designs with our ties. Would you like to see our pocket square collection?";
      } else if (input.includes('price') || input.includes('cost')) {
        responseText = "Our products range from ₹3,499 for pocket squares to ₹16,999 for premium collections. Is there a specific product you're interested in?";
      } else if (input.includes('delivery') || input.includes('shipping')) {
        responseText = "We offer 3-4 day delivery for prepaid orders and 1-2 days extra for COD orders. Same-day delivery is available within Delhi NCR.";
      } else if (input.includes('return') || input.includes('exchange')) {
        responseText = "We offer returns and exchanges within 7 days of delivery, except for sale items which are non-returnable.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-8 sm:right-6 left-6 sm:left-auto z-50">
      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg border border-gray-200 w-80 sm:w-96 absolute bottom-20 sm:right-0 left-0 sm:left-auto overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Chat Header */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Dynasty Chat Assistant</h3>
              <button 
                onClick={toggleChat}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto max-h-96">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-3 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div 
                    className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="text-left mb-3">
                  <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 flex">
              <input
                ref={chatInputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about our products..."
                className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-black"
                disabled={loading}
              />
              <button
                type="submit"
                className={`bg-black text-white rounded-r-lg px-3 flex items-center justify-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
                disabled={loading}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-black text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

export default ChatbotButton; 