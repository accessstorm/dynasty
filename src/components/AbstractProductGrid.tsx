import { useRef } from 'react';
import { Container } from '@mantine/core';
import { motion } from 'framer-motion';
import ProductCard, { ProductCardProps } from './ProductCard';
import { luxuryClasses } from './LuxuryTheme';

interface AbstractProductGridProps {
  products: ProductCardProps[];
  maxItems?: number;
}

const AbstractProductGrid = ({ products, maxItems = 15 }: AbstractProductGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const displayProducts = products.slice(0, maxItems);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Different layout sizes for variety
  const sizes = [
    'col-span-1 row-span-1',                   // Standard (1x1)
    'col-span-2 row-span-1',                   // Wide (2x1)
    'col-span-1 row-span-2',                   // Tall (1x2)
    'col-span-2 row-span-2',                   // Large (2x2)
    'col-span-1 md:col-span-2 lg:col-span-3 row-span-1',  // Extra wide (3x1)
  ];

  // Assign sizes to products
  const getSize = (index: number) => {
    // Create an interesting pattern that depends on the index
    if (index === 0) return sizes[3]; // First item is large
    if (index % 7 === 3) return sizes[2]; // Every 7th item starting from 3rd is tall
    if (index % 5 === 2) return sizes[1]; // Every 5th item starting from 2nd is wide
    if (index % 12 === 6) return sizes[4]; // Every 12th item starting from 6th is extra wide
    return sizes[0]; // Default to standard size
  };

  return (
    <div className={luxuryClasses.productGrid}>
      <Container size="xl" className="py-12">
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 auto-rows-[minmax(200px,auto)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              className={`${getSize(index)} transition-all duration-500 relative`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                zIndex: 10, 
                transition: { duration: 0.3 } 
              }}
            >
              <div className="w-full h-full">
                <ProductCard {...product} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
};

export default AbstractProductGrid; 