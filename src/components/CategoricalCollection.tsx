import { useState } from 'react';
import { Card, Text, Button } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const CategoricalCollection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Using the existing necktie images from public/images
  const products: Product[] = [
    { id: 1, name: 'Classic Silk Tie', price: 1999, image: '/images/necktie.jpg' },
    { id: 2, name: 'Striped Pattern Tie', price: 2199, image: '/images/necktie1.jpg' },
    { id: 3, name: 'Geometric Design Tie', price: 2299, image: '/images/necktie2.jpg' },
    { id: 4, name: 'Floral Pattern Tie', price: 2399, image: '/images/necktie3.jpg' },
    { id: 5, name: 'Solid Color Tie', price: 2499, image: '/images/necktie4.jpg' },
    { id: 6, name: 'Paisley Pattern Tie', price: 2599, image: '/images/necktie5.jpg' },
    { id: 7, name: 'Dotted Pattern Tie', price: 2699, image: '/images/necktie6.jpg' },
    { id: 8, name: 'Bow Tie Classic', price: 1899, image: '/images/bowtie.jpg' },
    { id: 9, name: 'Bow Tie Pattern', price: 2099, image: '/images/bowtie1.jpg' },
    { id: 10, name: 'Bow Tie Solid', price: 2199, image: '/images/bowtie2.jpg' },
    { id: 11, name: 'Pocket Square Classic', price: 999, image: '/images/pocketsquares.jpg' },
    { id: 12, name: 'Pocket Square Pattern', price: 1199, image: '/images/pocketsquares1.jpg' }
  ];

  // Function to format price in Indian Rupees
  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Text className="text-4xl font-serif mb-3">Categorical Collection</Text>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium ties, each crafted with precision and elegance.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="relative overflow-hidden"
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                shadow="sm" 
                padding="0"
                radius="sm"
                className="overflow-hidden border border-gray-200"
              >
                <div className="relative h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Curtain Animation Overlay */}
                  <AnimatePresence>
                    {hoveredCard === product.id && (
                      <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 0.7, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-black"
                      />
                    )}
                  </AnimatePresence>

                  {/* Centered Button */}
                  <AnimatePresence>
                    {hoveredCard === product.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Button
                          component={Link}
                          to={`/product/${product.id}`}
                          variant="outline"
                          radius="0"
                          className="border-white text-white hover:bg-white hover:text-black transition-all px-8 py-2 tracking-widest text-sm uppercase"
                        >
                          View Details
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-4">
                  <Text fw={500} className="mb-1">{product.name}</Text>
                  <Text fz="sm" c="dimmed">{formatINR(product.price)}</Text>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            component={Link}
            to="/neckties"
            variant="outline"
            radius="0"
            className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
          >
            Explore All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoricalCollection; 