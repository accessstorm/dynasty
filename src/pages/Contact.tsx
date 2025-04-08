import { useState } from 'react';
import { TextInput, Textarea, Button, Title, Text, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 pt-20 pb-32"
    >
      {/* Hero Section */}
      <motion.div
        className="bg-black text-white py-16 md:py-20 mb-10 md:mb-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-80 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center z-0" 
             style={{ backgroundImage: "url('/images/Formal Attire Portrait.jpeg')" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-serif mb-4 tracking-wide"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              CONTACT US
            </motion.h1>
            <motion.div 
              className="w-24 h-px bg-white mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <motion.p
              className="text-base md:text-lg font-light tracking-wider max-w-2xl mx-auto px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              We'd love to hear from you. Reach out to us for any queries or feedback.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-5 md:p-8 shadow-sm"
          >
            <motion.div variants={itemVariants}>
              <Title order={2} className="font-serif mb-2 text-2xl md:text-3xl">Get In Touch</Title>
              <div className="w-16 h-px bg-black mb-6"></div>
              <Text className="mb-8 text-gray-600 text-sm md:text-base">
                We're here to assist you with any questions or concerns you might have about our products or services.
              </Text>
            </motion.div>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 p-6 text-center"
              >
                <Title order={3} className="font-serif mb-2">Thank You!</Title>
                <Text>Your message has been sent successfully. We'll get back to you shortly.</Text>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="mb-4">
                  <TextInput
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Name"
                    placeholder="Your name"
                    required
                    className="mb-4"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <TextInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email"
                    placeholder="Your email address"
                    required
                    className="mb-4"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <TextInput
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    label="Phone Number"
                    placeholder="Your phone number"
                    className="mb-4"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-4">
                  <TextInput
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    label="Subject"
                    placeholder="What is this regarding?"
                    className="mb-4"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    label="Message"
                    placeholder="Your message"
                    minRows={5}
                    required
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="bg-black hover:bg-gray-800 text-white w-full py-3 tracking-wider"
                  >
                    SEND MESSAGE
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white p-5 md:p-8 shadow-sm mb-8"
            >
              <motion.div variants={itemVariants}>
                <Title order={2} className="font-serif mb-2 text-2xl md:text-3xl">Contact Information</Title>
                <div className="w-16 h-px bg-black mb-6"></div>
              </motion.div>

              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-gray-100 p-3 mr-4 rounded-sm">
                    <Phone size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <Text fw={500}>Phone</Text>
                    <Text className="text-gray-600">+919820238241</Text>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-gray-100 p-3 mr-4 rounded-sm">
                    <Mail size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <Text fw={500}>Email</Text>
                    <Text className="text-gray-600">contact@dynasty.com</Text>
                    <Text className="text-gray-600">support@dynasty.com</Text>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-gray-100 p-3 mr-4 rounded-sm">
                    <MapPin size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <Text fw={500}>Address</Text>
                    <Text className="text-gray-600">
                      Dynasty Premium Accessories,<br />
                      123 Fashion Street, Luxury Lane,<br />
                      New Delhi, 110001, India
                    </Text>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-gray-100 p-3 mr-4 rounded-sm">
                    <Clock size={20} className="text-gray-700" />
                  </div>
                  <div>
                    <Text fw={500}>Business Hours</Text>
                    <Text className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</Text>
                    <Text className="text-gray-600">Sunday: Closed</Text>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white p-4 shadow-sm h-[250px] md:h-[300px] overflow-hidden"
            >
              <div className="w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8651824267837!2d77.2078909!3d28.6329398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5c1a7eac39%3A0x75a26e592bf5389d!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1649927864297!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Dynasty Store Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Title order={2} className="font-serif mb-2 text-2xl md:text-3xl">Frequently Asked Questions</Title>
          <div className="w-24 h-px bg-black mx-auto mb-8 md:mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 text-left max-w-4xl mx-auto px-2">
            <div>
              <Text fw={600} className="mb-2">What are your shipping times?</Text>
              <Text className="text-gray-600 text-sm md:text-base">
                We typically process orders within 24 hours. Delivery takes 3-4 working days for prepaid orders and 4-5 days for COD orders within India.
              </Text>
            </div>
            
            <div>
              <Text fw={600} className="mb-2">Do you ship internationally?</Text>
              <Text className="text-gray-600 text-sm md:text-base">
                Yes, we do ship internationally. International orders typically take 7-14 business days to arrive, depending on the destination.
              </Text>
            </div>
            
            <div>
              <Text fw={600} className="mb-2">What is your return policy?</Text>
              <Text className="text-gray-600 text-sm md:text-base">
                We offer a 7-day return policy for all regular-priced items. Sale items are non-returnable and non-exchangeable.
              </Text>
            </div>
            
            <div>
              <Text fw={600} className="mb-2">Do you offer customized ties?</Text>
              <Text className="text-gray-600 text-sm md:text-base">
                Yes, we offer customization services for bulk orders. Please contact us directly for customized queries at kanika@tossido.in.
              </Text>
            </div>
          </div>
          
          <Group justify="center" className="mt-8 md:mt-12">
            <Button
              variant="outline"
              color="dark"
              radius={0}
              size="md"
              className="border-black text-black hover:bg-black hover:text-white transition-all px-6 sm:px-8 py-2 tracking-widest text-sm font-light uppercase"
            >
              View All FAQs
            </Button>
          </Group>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact; 