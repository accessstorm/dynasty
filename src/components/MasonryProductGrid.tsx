import { useRef } from 'react';
import { Container, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import ProductCard, { ProductCardProps } from './ProductCard';

interface MasonryProductGridProps {
  products: ProductCardProps[];
  maxItems?: number;
}

const MasonryProductGrid = ({ products, maxItems = 15 }: MasonryProductGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const displayProducts = products.slice(0, maxItems);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Create a gallery-style masonry layout
  const getMasonryClasses = (index: number) => {
    // Create a repeatable pattern for the masonry layout
    const pattern = [
      // First row creates a large item flanked by two smaller ones
      "col-span-1 row-span-1", // Standard
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Standard
      
      // Second row has a wide item and a standard item
      "col-span-2 row-span-1", // Wide
      "col-span-1 row-span-1", // Standard
      
      // Third row has standard items
      "col-span-1 row-span-1", // Standard
      "col-span-1 row-span-1", // Standard
      "col-span-1 row-span-1"  // Standard
    ];
    
    // Repeat the pattern for all products
    return pattern[index % pattern.length];
  };

  return (
    <Container size="xl" className="py-12">
      {displayProducts.length > 0 ? (
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayProducts.map((product, index) => (
            <motion.div 
              key={product.id} 
              className={`${getMasonryClasses(index)}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="h-full overflow-hidden bg-white">
                <ProductCard {...product} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Text size="lg" className="text-center py-10">No products found in this category.</Text>
      )}
    </Container>
  );
};

export default MasonryProductGrid; 