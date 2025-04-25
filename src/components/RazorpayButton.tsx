import { Button } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { Modal } from '@mantine/core';
import ShippingAddressForm from './ShippingAddressForm';
import { useNavigate } from 'react-router-dom';

// Define Razorpay response interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Define Razorpay options interface
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

// Define shipping address interface
interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

// Define global window with Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayButtonProps {
  amount: number;
  name: string;
  description: string;
  className?: string;
  buttonText?: string;
  children?: React.ReactNode;
  productDetails?: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  };
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  name,
  description,
  className,
  buttonText = "Buy Now",
  children,
  productDetails
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const navigate = useNavigate();
  
  // Load Razorpay script on component mount
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (document.getElementById('razorpay-script')) {
        setScriptLoaded(true);
        return;
      }
      
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          resolve(true);
          setScriptLoaded(true);
        };
        script.onerror = () => {
          console.error("Failed to load Razorpay script");
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    
    loadRazorpayScript();
  }, []);
  
  // Function to handle shipping address submission
  const handleAddressSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setShowAddressModal(false);
    // Proceed with payment after address is collected
    handlePayment(address);
  };
  
  // Function to create shipment with Delhivery
  const createShipment = async (paymentId: string, orderData: any, address: ShippingAddress) => {
    try {
      console.log('Creating shipment with Delhivery...');
      
      const orderDetails = {
        products: productDetails ? [productDetails] : [{ 
          id: 1, 
          name: name, 
          quantity: 1, 
          price: amount 
        }],
        amount: amount
      };
      
      const response = await fetch('/api/create-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          order: orderDetails,
          address
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Shipment error: ${response.status} ${response.statusText}`);
      }
      
      const shipmentData = await response.json();
      console.log("Shipment created:", shipmentData);
      
      // Navigate to order confirmation page with tracking details
      navigate(`/order-confirmation?trackingId=${shipmentData.trackingId}&estimatedDelivery=${shipmentData.estimatedDelivery}&paymentId=${paymentId}`);
      
    } catch (error) {
      console.error('Error creating shipment:', error);
      alert('Your payment was successful, but there was an issue creating your shipment. Our team will contact you shortly.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to handle payment
  const handlePayment = async (address: ShippingAddress) => {
    try {
      setIsLoading(true);
      
      // Check if script is loaded
      if (!scriptLoaded) {
        alert('Razorpay script is still loading. Please try again in a moment.');
        setIsLoading(false);
        return;
      }
      
      // Create order on the server using Vercel API route
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      
      const orderData = await response.json();
      console.log("Order created:", orderData);
      
      // Initialize Razorpay
      const options = {
        key: 'rzp_test_k7psHC0CdwYUlW',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Dynasty',
        description: `Payment for ${name}`,
        order_id: orderData.id,
        handler: function (response: RazorpayResponse) {
          console.log("Payment successful:", response);
          // Instead of just showing an alert, create shipment with Delhivery
          createShipment(response.razorpay_payment_id, orderData, address);
        },
        prefill: {
          name: address.name,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };
      
      try {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          console.error('Payment failed:', response.error);
          alert(`Payment failed: ${response.error.description}`);
          setIsLoading(false);
        });
        
        rzp.open();
      } catch (err) {
        console.error("Error creating Razorpay instance:", err);
        alert("Could not initialize payment. Please try again later.");
        setIsLoading(false);
      }
      
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Payment initialization failed: ' + (error as Error).message);
      setIsLoading(false);
    }
  };
  
  // Handle button click to show address form first
  const handleButtonClick = () => {
    setShowAddressModal(true);
  };
  
  return (
    <>
      <div className="relative">
        <Button
          className={className || "bg-black text-white hover:bg-gray-800"}
          radius="xs"
          onClick={handleButtonClick}
          disabled={isLoading || !scriptLoaded}
        >
          {children || buttonText}
        </Button>
        
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      {/* Shipping Address Modal */}
      <Modal
        opened={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        title="Shipping Details"
        size="lg"
        padding="xl"
      >
        <ShippingAddressForm
          onSubmit={handleAddressSubmit}
          onCancel={() => setShowAddressModal(false)}
        />
      </Modal>
    </>
  );
};

export default RazorpayButton; 