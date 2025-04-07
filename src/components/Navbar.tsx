import { ShoppingCart, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  // Main nav links
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'NECKTIES', href: '/neckties' },
    { name: 'BOW TIES', href: '/bow-ties' },
    { name: 'POCKET SQUARES', href: '/pocket-squares' },
    { name: 'MEN', href: '/men' },
    { name: 'WOMEN', href: '/women' },
    { name: 'COMBOS', href: '/combos' },
    { name: 'OVERSIZED TEES', href: '/oversized-tees' },
    { name: 'WEDDING', href: '/wedding' },
    { name: 'MORE', href: '/about' }
  ];

  // Reference for the marquee container
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const [marqueeContent, setMarqueeContent] = useState<string>('');
  
  useEffect(() => {
    // Create repeating content for a seamless marquee
    const baseContent = 
      '3-4 WORKING DAYS (PREPAID) & 1-2 DAY EXTRA (COD)  •  ' +
      'SALE ITEMS ARE NON-RETURNABLE/EXCHANGEABLE  •  ' + 
      'SAME DAY DELIVERY AVAILABLE WITHIN DELHI NCR  •  ';
    
    // Repeat the content to ensure it fills the screen
    setMarqueeContent(baseContent.repeat(6));
  }, []);

  // CSS for the true infinite marquee
  const marqueeStyle = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  return (
    <header className="relative">
      {/* Announcement Bar with CSS-based Marquee */}
      <div className="bg-black text-white text-xs font-light py-1 fixed w-full z-50 overflow-hidden whitespace-nowrap">
        <style>{marqueeStyle}</style>
        <div 
          ref={marqueeContainerRef}
          className="inline-block whitespace-nowrap"
          style={{
            animation: 'marquee 60s linear infinite', // Slow animation (60 seconds per cycle)
            width: 'fit-content'
          }}
        >
          {marqueeContent}
        </div>
      </div>

      {/* Spacer for the announcement bar */}
      <div className="h-[26px]"></div>

      {/* Main Navigation */}
      <motion.nav 
        className="fixed w-full top-[26px] z-40 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Top section with logo and right icons */}
            <div className="w-full flex justify-between items-center py-5">
              {/* Left Spacer */}
              <div className="w-28"></div>

              {/* Logo */}
              <motion.div 
                className="flex-shrink-0 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link to="/" className="text-black no-underline">
                    <img 
                      src="/images/navbar.png" 
                      alt="DYNASTY" 
                      className="h-12 w-auto"
                    />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Icons */}
              <div className="flex items-center space-x-5 w-auto justify-end">
                {/* Contact Us Link with Phone Icon */}
                <motion.div 
                  className="flex items-center text-black transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to="/contact" className="flex items-center text-black no-underline">
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="text-xs tracking-wide font-light">CONTACT US</span>
                  </Link>
                </motion.div>

                <motion.div 
                  className="text-black transition-opacity flex items-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="ml-1">(0)</span>
                </motion.div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex justify-center space-x-6 pb-4">
              {navLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    to={link.href}
                    className="text-black text-xs tracking-wider font-light transition-opacity no-underline"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Spacer for the fixed navbar */}
      <div className="h-[106px]"></div>
    </header>
  );
};

export default Navbar;