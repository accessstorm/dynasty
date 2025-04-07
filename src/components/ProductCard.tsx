import { Text, Button, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  color: string;
  pattern?: string;
  material?: string;
  category?: string;
  isNew?: boolean;
  link: string;
}

const ProductCard = ({ 
  id,
  name, 
  description,
  price, 
  image,
  isNew = false,
  link = '#'
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price to INR currency format
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
  
  return (
    <div 
      className="flex flex-col h-full group bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative overflow-hidden aspect-square">
        {/* New Badge */}
        {isNew && (
          <Badge 
            className="absolute top-3 left-3 z-10 bg-black text-white px-2 py-1 text-xs font-medium uppercase tracking-wider"
            radius="xs"
          >
            New
          </Badge>
        )}
        
        {/* The image */}
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />
        
        {/* Buy Now Button Overlay */}
        <div 
          className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              component={Link}
              to={link || `/product/${id}`}
              className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all uppercase text-xs tracking-widest px-8 py-3 font-medium"
              radius="xs"
            >
              Buy Now
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Product details */}
      <div className="flex flex-col p-5 flex-grow">
        <Text component="h3" className="font-serif text-lg font-medium mb-1 text-gray-900">
          {name}
        </Text>
        
        <Text className="text-sm text-gray-600 mb-3 line-clamp-2" title={description}>
          {description}
        </Text>
        
        <div className="mt-auto flex justify-between items-center">
          <Text className="font-medium text-lg text-gray-900">
            {formattedPrice}
          </Text>
          
          <Button
            component={Link}
            to={link || `/product/${id}`}
            variant="subtle"
            className="text-gray-800 hover:bg-gray-100 text-xs uppercase tracking-wider p-0 h-auto"
            radius="xs"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 