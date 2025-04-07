import { useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { motion, useAnimationControls } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const controls = useAnimationControls();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      // Shake animation when empty
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      // Shake animation when invalid
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      });
      return;
    }

    // In a real app, you would send this to your API
    console.log('Subscribing email:', email);
    setSuccess(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gray-100">
      <motion.div 
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-light tracking-widest">NEWSLETTER</h2>
          <div className="w-24 h-px bg-black mx-auto mt-6 mb-4"></div>
        </motion.div>

        <motion.p 
          className="text-gray-700 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Subscribe to our newsletter for exclusive offers, styling tips, and early access to our newest collections.
        </motion.p>

        {success ? (
          <motion.div 
            className="bg-green-50 border border-green-200 text-green-800 p-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Thank you for subscribing! You'll receive our next newsletter soon.
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Group className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div animate={controls} className="w-full sm:w-72">
                <TextInput
                  placeholder="Your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  radius="xs"
                  styles={{
                    input: {
                      borderColor: '#e2e8f0',
                      '&:focus': {
                        borderColor: 'black'
                      }
                    }
                  }}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  color="dark"
                  radius="xs"
                  classNames={{
                    root: 'bg-black text-white hover:bg-gray-800 transition-all px-6',
                  }}
                >
                  SUBSCRIBE
                </Button>
              </motion.div>
            </Group>
          </motion.form>
        )}
      </motion.div>
    </section>
  );
};

export default Newsletter; 