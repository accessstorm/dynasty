import { Container, Title, Text, Grid, Paper, Image, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { Award, Globe, Sparkles, Clock, Mail, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Images for the gallery
  const images = [
    '/images/1.jpeg',
    '/images/2.jpeg',
    '/images/3.jpg',
    '/images/4.jpeg'
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[0]}')` }}
        ></div>
        
        <Container size="md" className="relative z-20 text-white px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto text-center"
          >
            <div className="w-20 h-px bg-white mx-auto mb-6"></div>
            <h1 className="text-5xl font-serif mb-4 tracking-wide">ABOUT DYNASTY</h1>
            <p className="text-xl font-light mb-8 leading-relaxed max-w-2xl mx-auto">
              Crafting premium accessories for the modern gentleman since 2020.
              Our pursuit of excellence is woven into every product we create.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button 
                variant="filled" 
                color="white" 
                radius={0}
                className="bg-white text-black hover:bg-gray-200 mt-4 px-8"
                component={Link}
                to="/contact"
              >
                GET IN TOUCH
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <Container size="md" className="px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-px bg-black mx-auto mb-6"></div>
            <Title order={2} className="text-3xl font-serif mb-2">Our Story</Title>
          </div>
          
          <Grid gutter={32}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Paper shadow="md" p="xl" radius="sm" className="h-full text-center">
                  <Text className="mb-6 text-gray-700 leading-relaxed">
                    Founded in 2020, Dynasty was born from a passion for craftsmanship and a desire to create accessories 
                    that reflect the wearer's individuality. Our founder, inspired by the rich heritage of silk textiles 
                    and the artistry of handcrafted ties, set out to create a brand that would celebrate both tradition and innovation.
                  </Text>
                  <Text className="mb-6 text-gray-700 leading-relaxed">
                    What began as a small collection of handmade ties has grown into a comprehensive range of premium 
                    accessories. Through collaboration with skilled artisans and a commitment to exceptional materials, 
                    Dynasty has established itself as a hallmark of quality and sophistication in the world of men's accessories.
                  </Text>
                  <div className="flex justify-center items-center gap-2 font-medium cursor-pointer hover:underline">
                    <span>Discover our collections</span>
                  </div>
                </Paper>
              </motion.div>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="overflow-hidden h-full">
                  <Image 
                    src={images[1]}
                    alt="Our craftsmanship"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-white">
        <Container size="md" className="px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="w-16 h-px bg-black mx-auto mb-6"></div>
            <Title order={2} className="text-3xl font-serif mb-2">Our Core Values</Title>
            <Text className="max-w-2xl mx-auto text-gray-600">
              These principles guide every decision we make and every product we create
            </Text>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeIn}>
                  <Paper shadow="sm" p="xl" radius="sm" className="h-full border border-gray-100 hover:shadow-md transition-all text-center">
                    <Award className="text-gray-800 mb-4 mx-auto" size={36} />
                    <Title order={3} className="text-xl font-serif mb-4">Quality Craftsmanship</Title>
                    <Text className="text-gray-600">
                      We believe in creating products that stand the test of time. Every tie we produce undergoes 
                      rigorous quality checks to ensure it meets our exacting standards.
                    </Text>
                  </Paper>
                </motion.div>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeIn}>
                  <Paper shadow="sm" p="xl" radius="sm" className="h-full border border-gray-100 hover:shadow-md transition-all text-center">
                    <Globe className="text-gray-800 mb-4 mx-auto" size={36} />
                    <Title order={3} className="text-xl font-serif mb-4">Sustainable Practices</Title>
                    <Text className="text-gray-600">
                      We're committed to reducing our environmental impact. From sourcing sustainable materials 
                      to minimizing waste in our production process, sustainability guides every decision.
                    </Text>
                  </Paper>
                </motion.div>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeIn}>
                  <Paper shadow="sm" p="xl" radius="sm" className="h-full border border-gray-100 hover:shadow-md transition-all text-center">
                    <Sparkles className="text-gray-800 mb-4 mx-auto" size={36} />
                    <Title order={3} className="text-xl font-serif mb-4">Innovative Design</Title>
                    <Text className="text-gray-600">
                      While we respect tradition, we're not bound by it. We constantly explore new designs, 
                      materials, and techniques to create accessories that are both timeless and contemporary.
                    </Text>
                  </Paper>
                </motion.div>
              </Grid.Col>
            </Grid>
          </motion.div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <Container size="md" className="px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="w-16 h-px bg-black mx-auto mb-6"></div>
            <Title order={2} className="text-3xl font-serif mb-2">The Team Behind Dynasty</Title>
            <Text className="max-w-2xl mx-auto text-gray-600">
              Our products are a reflection of the dedicated craftspeople who create them
            </Text>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Paper shadow="sm" p={0} radius="sm" className="overflow-hidden">
              <Grid gutter={0}>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Image 
                    src={images[2]}
                    alt="Our artisans at work"
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <div className="p-10 h-full flex flex-col justify-center items-center text-center">
                    <Users className="text-gray-800 mb-4" size={36} />
                    <Title order={3} className="text-2xl font-serif mb-4">Master Craftspeople</Title>
                    <Text className="text-gray-600 mb-6 leading-relaxed">
                      Our team consists of skilled artisans with decades of combined experience in textile 
                      craftsmanship. Many of our team members have trained in traditional techniques passed 
                      down through generations, bringing an unparalleled level of expertise to every accessory we create.
                    </Text>
                    <Text className="text-gray-600 leading-relaxed">
                      We believe in fair labor practices and providing opportunities for skilled craftspeople 
                      to showcase their talents. When you purchase a Dynasty product, you're supporting not just 
                      a brand, but the livelihoods of dedicated artisans.
                    </Text>
                  </div>
                </Grid.Col>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </section>

      {/* Service Highlights */}
      <section className="py-20 bg-black text-white">
        <Container size="md" className="px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="w-16 h-px bg-white mx-auto mb-6"></div>
            <Title order={2} className="text-3xl font-serif mb-2 text-white">What Sets Us Apart</Title>
            <Text className="max-w-2xl mx-auto text-gray-300">
              We pride ourselves on delivering an exceptional experience from start to finish
            </Text>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeIn} className="text-center px-6">
                  <Clock className="text-white mb-4 mx-auto" size={36} />
                  <Title order={3} className="text-xl font-serif mb-4 text-white">Expedited Shipping</Title>
                  <Text className="text-gray-300">
                    We offer quick turnaround times for all orders, with expedited shipping options available for those 
                    urgent occasions. Same-day delivery is available within Delhi NCR.
                  </Text>
                </motion.div>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeIn} className="text-center px-6">
                  <Sparkles className="text-white mb-4 mx-auto" size={36} />
                  <Title order={3} className="text-xl font-serif mb-4 text-white">Personalization</Title>
                  <Text className="text-gray-300">
                    Create a truly unique accessory with our customization services. From monogramming to bespoke patterns,
                    we can create accessories that reflect your personal style.
                  </Text>
                </motion.div>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <motion.div variants={fadeIn} className="text-center px-6">
                  <Mail className="text-white mb-4 mx-auto" size={36} />
                  <Title order={3} className="text-xl font-serif mb-4 text-white">Dedicated Support</Title>
                  <Text className="text-gray-300">
                    Our customer service team is available to assist with any queries or concerns you might have.
                    Reach out to us at kanika@tossido.in for personalized assistance.
                  </Text>
                </motion.div>
              </Grid.Col>
            </Grid>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <Container size="md" className="px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Image 
              src={images[3]}
              alt="Premium ties"
              height={300}
              radius="sm"
              className="mb-12 mx-auto"
            />
            
            <Title order={2} className="text-4xl font-serif mb-6">Ready to Experience Dynasty?</Title>
            <Text className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Browse our collections and discover accessories that are designed to elevate your style and leave a lasting impression.
            </Text>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                variant="filled" 
                radius={0}
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8"
                component={Link}
                to="/neckties"
              >
                SHOP COLLECTION
              </Button>
              <Button 
                variant="outline" 
                radius={0}
                size="lg"
                className="border-black text-black hover:bg-black hover:text-white px-8"
                component={Link}
                to="/contact"
              >
                CONTACT US
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default About; 