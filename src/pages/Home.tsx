import { useState, useEffect } from 'react';
import { Container, Button, Group, Title, Text, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';
import NewsletterPopup from '../components/NewsletterPopup';
import { ProductCardProps } from '../components/ProductCard';
import ProductCard from '../components/ProductCard';
import StaticProductService from '../services/StaticProductService';
import { luxuryClasses } from '../components/LuxuryTheme';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductCardProps[]>([]);
  
  useEffect(() => {
    // Get products from static service
    const { home } = StaticProductService.getStaticProducts();
    setFeaturedProducts(home);
  }, []);
  
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <FeaturedProducts />
      
      {/* Featured Products Section */}
      <Box className="bg-[#f8f8f6] py-20">
        <Container size="xl" className="mb-4">
          <Title className={luxuryClasses.pageTitle}>FEATURED COLLECTION</Title>
          <Text className={luxuryClasses.pageSubtitle}>
            Discover our curated selection of premium accessories, handcrafted for the modern gentleman
          </Text>
        </Container>
        
        {/* Custom Grid Layout */}
        <Container size="xl">
          {featuredProducts.length > 0 && (
            <div className="grid grid-cols-4 grid-rows-5 gap-4">
              {/* Large square in top-left */}
              <div className="col-span-3 row-span-3 overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                {featuredProducts[0] && (
                  <div className="h-full">
                    <ProductCard {...featuredProducts[0]} />
                  </div>
                )}
              </div>
              
              {/* Tall rectangle on right */}
              <div className="col-start-4 row-span-3 overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                {featuredProducts[1] && (
                  <div className="h-full">
                    <ProductCard {...featuredProducts[1]} />
                  </div>
                )}
              </div>
              
              {/* Medium square in bottom-right */}
              <div className="col-start-3 col-span-2 row-start-4 row-span-2 overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                {featuredProducts[3] && (
                  <div className="h-full">
                    <ProductCard {...featuredProducts[3]} />
                  </div>
                )}
              </div>
              
              {/* Medium square in bottom-left */}
              <div className="col-start-1 col-span-2 row-start-4 row-span-2 overflow-hidden rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
                {featuredProducts[4] && (
                  <div className="h-full">
                    <ProductCard {...featuredProducts[4]} />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <Group justify="center" className="mt-12">
            <Button
              component={Link}
              to="/neckties"
              variant="outline"
              radius={0}
              size="md"
              className={luxuryClasses.addToCartButton}
            >
              EXPLORE ALL NECKTIES
            </Button>
          </Group>
        </Container>
      </Box>
      
      <Newsletter />
      
      {/* Newsletter Popup */}
      <NewsletterPopup />
    </motion.main>
  );
};

export default Home; 