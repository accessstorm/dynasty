import { MantineThemeOverride } from '@mantine/core';

// Royal luxury color palette
export const luxuryColors = {
  gold: '#D4AF37',
  deepGold: '#B8860B',
  royalBlue: '#1D2951',
  burgundy: '#800020',
  ivory: '#FFFFF0',
  charcoal: '#333333',
  deepBlack: '#121212'
};

// CSS class names for luxury styling
export const luxuryClasses = {
  pageTitle: 'text-3xl md:text-4xl font-serif font-medium tracking-widest uppercase text-center mb-6 relative after:content-[""] after:block after:w-20 after:h-[3px] after:bg-gradient-to-r after:from-transparent after:via-[#D4AF37] after:to-transparent after:mx-auto after:mt-3',
  
  pageSubtitle: 'text-lg font-light tracking-wide text-gray-700 max-w-2xl mx-auto text-center mb-16 leading-relaxed',
  
  productCard: 'border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white hover:border-[#D4AF3730]',
  
  productTitle: 'font-serif text-lg font-medium tracking-wide text-gray-900',
  
  productPrice: 'font-medium text-lg text-[#800020]',
  
  addToCartButton: 'border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-[#D4AF37] uppercase tracking-wider text-xs px-4 py-2 transition-colors',
  
  goldButton: 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-gray-900 uppercase tracking-wider text-xs px-6 py-3 hover:-translate-y-0.5 hover:shadow-md transition-all font-medium',
  
  categoryHeader: 'bg-gradient-to-b from-[rgba(18,18,18,0.8)] to-[rgba(18,18,18,0.4)] py-16 mb-12 relative overflow-hidden',
  
  productGrid: 'py-8 bg-[#f8f8f6]'
};

// MantineTheme override for a luxury aesthetic
export const luxuryTheme: MantineThemeOverride = {
  primaryColor: 'dark',
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
    gold: [
      '#FFF9E0',
      '#FFF3C5',
      '#FFECAA',
      '#FFE58F',
      '#FFDD74',
      '#FFD659',
      '#D4AF37', // Custom Dynasty gold color
      '#B8860B',
      '#9C7A2A',
      '#7C611D',
    ],
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Playfair Display, serif',
  },
};
 