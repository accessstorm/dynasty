import { useState, useEffect } from 'react';
import { TextInput, Button, Box, Text } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const NewsletterPopup = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Show popup after a delay when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if the user has already subscribed (using localStorage)
      const hasSubscribed = localStorage.getItem('newsletterSubscribed') === 'true';
      if (!hasSubscribed) {
        setIsVisible(true);
      }
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Set a session storage flag to not show again during this session
    sessionStorage.setItem('popupClosed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (email && email.includes('@') && email.includes('.')) {
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      // Store in localStorage to not show again
      localStorage.setItem('newsletterSubscribed', 'true');
      
      // Hide popup after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-8 right-8 z-50 shadow-lg w-full max-w-sm"
        >
          <Box className="bg-gray-50 relative p-6 border border-gray-200 rounded-sm">
            {/* Custom X button */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 flex items-center justify-center"
            >
              <X size={24} strokeWidth={3} className="text-black" />
            </button>
            
            <Text fw={500} className="text-center mb-1">STAY UPDATED !</Text>
            
            <Text size="sm" c="dimmed" className="text-center mb-4">
              Subscribe to get notifications for product launches & special offers.
            </Text>
            
            <Text size="xs" className="text-center mb-2">
              Contact 123@dynasty.in for customised queries.
            </Text>
            
            <Text size="sm" className="text-center mb-4">
              Happy Shopping :)
            </Text>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <TextInput 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4 w-full max-w-[240px]"
                  styles={{
                    input: {
                      border: '1px solid #ddd',
                      backgroundColor: '#fff',
                      padding: '10px',
                      fontSize: '14px',
                      textAlign: 'center'
                    }
                  }}
                  required
                />
                
                <Button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-medium tracking-wider w-full max-w-[120px]"
                  styles={{
                    root: {
                      padding: '8px',
                      textTransform: 'uppercase',
                      fontSize: '14px'
                    }
                  }}
                >
                  SUBSCRIBE
                </Button>
              </form>
            ) : (
              <Text size="sm" fw={500} className="text-center text-green-600">
                Thank you for subscribing!
              </Text>
            )}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup; 