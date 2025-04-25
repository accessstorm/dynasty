import React, { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Grid, Paper, Group, Divider, Timeline } from '@mantine/core';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Check, Package, Clock } from 'lucide-react';

interface TrackingDetails {
  trackingId: string;
  estimatedDelivery: string;
  status: string;
}

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [trackingDetails, setTrackingDetails] = useState<TrackingDetails | null>(null);
  
  useEffect(() => {
    // Get tracking details from URL parameters
    const trackingId = searchParams.get('trackingId');
    const estimatedDelivery = searchParams.get('estimatedDelivery');
    const paymentId = searchParams.get('paymentId');
    
    // In a real app, you would fetch the complete order details from your backend
    // For now, we'll use the URL parameters
    if (trackingId && estimatedDelivery) {
      setTrackingDetails({
        trackingId,
        estimatedDelivery,
        status: 'Processing'
      });
    }
  }, [searchParams]);
  
  if (!trackingDetails) {
    return (
      <Container size="md" py={40}>
        <Text className="text-center">No order information found.</Text>
        <Group justify="center" mt="xl">
          <Button component={Link} to="/" variant="outline">
            Return to Home
          </Button>
        </Group>
      </Container>
    );
  }
  
  // Format the estimated delivery date
  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('en-IN', options);
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <Container size="md" py={40}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <Title order={1} className="text-2xl md:text-3xl font-serif">
            Thank You for Your Order!
          </Title>
          <Text size="lg" color="dimmed" mt="md">
            Your order has been placed successfully
          </Text>
        </div>
        
        <Paper shadow="xs" p="md" className="mb-8 border border-gray-200">
          <Grid columns={12}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text fw={500}>Order Information</Text>
              <Divider my="xs" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text color="dimmed">Order Status:</Text>
                  <Text fw={500}>{trackingDetails.status}</Text>
                </div>
                <div className="flex justify-between">
                  <Text color="dimmed">Tracking Number:</Text>
                  <Text fw={500}>{trackingDetails.trackingId}</Text>
                </div>
                <div className="flex justify-between">
                  <Text color="dimmed">Estimated Delivery:</Text>
                  <Text fw={500}>{formatDate(trackingDetails.estimatedDelivery)}</Text>
                </div>
              </div>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text fw={500}>Delivery Status</Text>
              <Divider my="xs" />
              
              <Timeline active={1} bulletSize={24} lineWidth={2}>
                <Timeline.Item bullet={<Check size={12} />} title="Order Confirmed">
                  <Text size="xs" mt={4}>Your order has been confirmed</Text>
                </Timeline.Item>
                
                <Timeline.Item bullet={<Package size={12} />} title="Order Processing">
                  <Text size="xs" mt={4}>Your order is being processed</Text>
                </Timeline.Item>
                
                <Timeline.Item bullet={<Truck size={12} />} title="Shipped">
                  <Text size="xs" mt={4}>Will be updated soon</Text>
                </Timeline.Item>
                
                <Timeline.Item bullet={<Clock size={12} />} title="Out for Delivery">
                  <Text size="xs" mt={4}>Expected by {formatDate(trackingDetails.estimatedDelivery)}</Text>
                </Timeline.Item>
              </Timeline>
            </Grid.Col>
          </Grid>
        </Paper>
        
        <Paper shadow="xs" p="md" className="mb-8 border border-gray-200">
          <Text fw={500} className="mb-3">Shipping via Delhivery</Text>
          <Text size="sm">
            You can track your package using your tracking number ({trackingDetails.trackingId}) 
            on the <a href="https://www.delhivery.com/track" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Delhivery tracking page</a>.
          </Text>
        </Paper>
        
        <Group justify="center" mt="xl">
          <Button 
            component={Link} 
            to="/"
            className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all uppercase text-sm tracking-widest"
          >
            Continue Shopping
          </Button>
          
          <Button 
            component="a"
            href={`https://www.delhivery.com/track/#package/${trackingDetails.trackingId}`}
            target="_blank"
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest"
          >
            Track Order
          </Button>
        </Group>
      </motion.div>
    </Container>
  );
};

export default OrderConfirmation; 