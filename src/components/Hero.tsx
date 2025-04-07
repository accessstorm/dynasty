import { Button } from '@mantine/core';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("/src/assets/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dynasty-black/60 to-dynasty-black/90"></div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-dynasty-gold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          DYNASTY
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl italic text-dynasty-white mb-10 font-playfair"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: 0.5,
            duration: 0.8,
            type: "spring",
            stiffness: 50
          }}
        >
          Where Elegance Reigns
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.8,
            duration: 0.5 
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            classNames={{
              root: 'bg-dynasty-gold text-dynasty-black hover:bg-dynasty-gold/90 transition-all duration-300 border-0 text-base',
            }}
            size="lg"
            onClick={() => window.location.href = "#shop"}
          >
            Shop Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 