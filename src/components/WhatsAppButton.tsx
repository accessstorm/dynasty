import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = "Hello, I'm interested in Dynasty products!"
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation variants for the pulsing effect
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const
      }
    }
  };
  
  // Animation variants for the outer glow
  const glowVariants = {
    pulse: {
      opacity: [0.5, 0.7, 0.5],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const
      }
    }
  };
  
  // Determine if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Prepare WhatsApp URL (different format for mobile vs desktop)
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  
  return (
    <motion.div
      className={`fixed z-20 ${isMobile ? 'bottom-5 right-5' : 'bottom-8 left-8'}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
        initial={{ opacity: 0 }}
        animate="pulse"
        variants={glowVariants}
      />
      
      <motion.a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`flex items-center justify-center bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? 'w-14 h-14' : 'w-16 h-16'}`}
        aria-label="Contact us on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate="pulse"
        variants={pulseVariants}
      >
        <div className="w-7 h-7 flex items-center justify-center">
          {/* WhatsApp SVG Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="white"
            className="w-full h-full"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton; 