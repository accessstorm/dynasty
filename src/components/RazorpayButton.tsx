import { Button } from '@mantine/core';
import React, { useState } from 'react';

// Define Razorpay response interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Define Razorpay options interface
interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  image: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
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
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
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

interface WindowWithRazorpay extends Window {
  Razorpay: any;
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
  
  // Function to handle payment
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // Make an API call to create an order
      const response = await fetch('http://localhost:3000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          notes: {
            name,
            description
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status} ${response.statusText}`);
      }
      
      const order = await response.json();
      
      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_TN1UYHfEGIr6rI', // Hardcoded test key
        amount: order.amount,
        currency: order.currency,
        name: 'Dynasty',
        description: `Payment for ${name}`,
        order_id: order.id,
        handler: function (response: RazorpayResponse) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          console.log(response);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '+919876543210',
        },
        notes: {
          address: 'Dynasty Corporate Office'
        },
        theme: {
          color: '#000000',
        },
      };
      
      const windowWithRazorpay = window as WindowWithRazorpay;
      const paymentObject = new windowWithRazorpay.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Payment initialization failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative">
      <Button
        className={className || "bg-black text-white hover:bg-gray-800"}
        radius="xs"
        onClick={handlePayment}
        disabled={isLoading}
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