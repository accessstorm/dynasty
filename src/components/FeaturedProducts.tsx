import { useEffect, useState } from "react";
import { Card, Badge, Text, Button } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import CategoricalCollection from "./CategoricalCollection";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  pattern?: string;
  material?: string;
  color?: string;
}

interface TieData {
  id: number;
  name: string;
  pattern: string;
  material: string;
  color: string;
  description: string;
  price: number;
}

// Function to format price in Indian Rupees
const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

// Function to get image path based on product ID
const getImagePath = (id: number) => {
  // Determine category based on ID range
  if (id >= 16 && id <= 27) {
    // Bow ties
    const imageIndex = ((id - 16) % 6) + 1;
    return `/images/bowtie${imageIndex}.jpg`;
  } else if (id >= 28 && id <= 39) {
    // Pocket squares
    const imageIndex = ((id - 28) % 6) + 1;
    return `/images/pocketsquares${imageIndex}.jpg`;
  } else if (id >= 76 && id <= 87) {
    // Oversized tees
    return '/images/oversizedtees.jpg';
  } else if (id >= 88 && id <= 99) {
    // Wedding
    return '/images/wedding.jpg';
  } else {
    // Neckties (default)
    const imageIndex = ((id - 1) % 6) + 1;
    return `/images/necktie${imageIndex}.jpg`;
  }
};

const FeaturedProducts = () => {
  const [activePage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/images/Unity Through Diversity.jpeg',
    '/images/1.jpeg',
    '/images/2.jpeg',
    '/images/3.jpg',
    '/images/4.jpeg'
  ];

  // Handle slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      // Move to next slide, loop back to first slide after the last
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(timer); // Clean up on unmount
  }, [slides.length]);
  
  // Fetch products from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/ties.json');
        const data = await response.json();
        
        // Map the ties data to our Product interface
        const formattedProducts = data.ties.map((tie: TieData) => ({
          id: tie.id,
          name: tie.name,
          description: tie.description,
          price: tie.price,
          image: getImagePath(tie.id), // Use dynamic image path based on ID
          pattern: tie.pattern,
          material: tie.material,
          color: tie.color
        }));
        
        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ties data:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const productsPerPage = 12;
  
  // Calculate products for current page
  const indexOfLastProduct = activePage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Hero section variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };
  
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item variants
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

  return (
    <>
      {/* Hero Section with New Arrivals - Slideshow */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Slideshow with fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // 1 second fade transition
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('${slides[currentSlide]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1
            }}
          />
        </AnimatePresence>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center">
          <motion.h1 
            className="text-6xl font-serif text-white tracking-[0.15em] mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            NEW ARRIVALS
          </motion.h1>
          
          <motion.p
            className="text-xl text-white tracking-widest mb-16 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            UNITY THROUGH DIVERSITY
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              variant="outline"
              color="white"
              radius="0"
              classNames={{
                root: 'border-white text-white hover:bg-white hover:text-black transition-all px-8 py-2 tracking-widest text-sm font-light uppercase'
              }}
              onClick={() => window.location.href = "#products"}
            >
              Shop Now
            </Button>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Our Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Text className="text-4xl font-serif mb-3">Our Story</Text>
            <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
              The legacy of Dynasty - crafting premium neckwear since 1975.
            </Text>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="/images/logo.jpg" 
                alt="Dynasty Logo" 
                className="w-full max-w-md mx-auto h-auto object-contain rounded-sm"
              />
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mt-8 text-center md:text-left">
                <Text className="text-gray-700 leading-relaxed">
                  Started in the heart of Mumbai, Dynasty has grown from a small family-owned shop to one of India's premier tie and accessory brands. Our commitment to quality and craftsmanship has earned us the trust of discerning gentlemen across the country.
                </Text>
                <Text className="text-gray-700 leading-relaxed mt-4">
                  Each piece in our collection is meticulously handcrafted by our master artisans, using only the finest materials sourced from around the world. We take pride in our attention to detail and our dedication to preserving traditional techniques while embracing modern designs.
                </Text>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CategoricalCollection />
      
      {/* Featured Collection Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Text className="text-4xl font-serif mb-3">Featured Collection</Text>
            <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the finest ties, crafted for the modern gentleman.
            </Text>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {products.slice(0, 4).map((product, index) => (
              <Card 
                key={`featured-${index}`}
                shadow="sm" 
                padding="0"
                radius="sm"
                className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <Card.Section>
                  <div className="h-64 overflow-hidden">
                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </Card.Section>
                
                <div className="p-4">
                  <Text fw={500} className="mb-1">{product.name}</Text>
                  <Text fz="sm" c="dimmed">{formatINR(product.price)}</Text>
                </div>
              </Card>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Button
              variant="outline"
              radius="0"
              className="border-black text-black hover:bg-black hover:text-white transition-all px-8 py-2 tracking-widest text-sm uppercase"
            >
              Explore All Neckties
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Text className="text-4xl font-serif mb-3">Testimonial</Text>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Text className="font-serif text-2xl font-medium mb-4 text-gray-900 tracking-wide text-center">
              STATE-OF-THE-ART PRODUCTS WITH A DRIVEN APPROACH TOWARDS CUSTOMER DELIGHT. KEEP MARCHING AHEAD!
            </Text>
            <div className="mt-4 text-center">
              <p className="text-gray-800 font-medium">Mr. Subramaniam</p>
              <p className="text-gray-600">Real Air Vice Marshal</p>
              <p className="text-gray-600">Indian Air Force</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-400">Loading products...</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {currentProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Card 
                    shadow="sm" 
                    padding="0"
                    radius="sm"
                    withBorder={false}
                    className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 h-full bg-white"
                  >
                    <Card.Section>
                      <div className="relative h-72 overflow-hidden">
                        <motion.div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${product.image})` }}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute top-3 right-3">
                          <Badge 
                            color="dark" 
                            variant="filled"
                            className="bg-black text-xs uppercase tracking-wider py-1 font-normal"
                          >
                            New
                          </Badge>
                        </div>
                      </div>
                    </Card.Section>

                    <div className="p-5">
                      <Text component="h3" className="font-serif text-lg font-medium mb-1 text-gray-900">
                        {product.name}
                      </Text>
                      
                      <Text size="sm" color="dimmed" className="mb-3 line-clamp-2" title={product.description}>
                        {product.description}
                      </Text>

                      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                        <Text className="font-medium text-lg">
                          {formatINR(product.price)}
                        </Text>
                        
                        <Button 
                          variant="subtle" 
                          color="dark"
                          radius="xs"
                          size="xs"
                          className="uppercase tracking-wider text-xs font-medium px-0 hover:bg-transparent hover:text-black/70"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts; 