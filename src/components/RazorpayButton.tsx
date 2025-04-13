import { Button } from '@mantine/core';
import React, { useState, useEffect } from 'react';

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
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({
  amount,
  name,
  description,
  className,
  buttonText = "Buy Now",
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
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
  
  // Function to handle payment
  const handlePayment = async () => {
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
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9876543210',
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
  
  return (
    <div className="relative">
      <Button
        className={className || "bg-black text-white hover:bg-gray-800"}
        radius="xs"
        onClick={handlePayment}
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
  );
};

export default RazorpayButton; 