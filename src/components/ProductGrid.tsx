import { motion } from 'framer-motion';
import { ProductCardProps } from './ProductCard';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: ProductCardProps[];
  columns?: number;
}

const ProductGrid = ({ products, columns = 4 }: ProductGridProps) => {
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

  // Generate the column class based on the props
  const getColumnClass = () => {
    switch(columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  }

  return (
    <motion.div
      className={`grid ${getColumnClass()} gap-6`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard {...product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid; 