import React, { useState } from 'react';
import { TextInput, Textarea, Select, Button, Box, Group, Text } from '@mantine/core';

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

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
  onCancel: () => void;
}

const indianStates = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' },
  { value: 'Delhi', label: 'Delhi' },
];

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({ onSubmit, onCancel }) => {
  const [address, setAddress] = useState<ShippingAddress>({
    name: '',
    phone: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});
  
  const validateForm = () => {
    const newErrors: Partial<ShippingAddress> = {};
    
    if (!address.name) newErrors.name = 'Name is required';
    if (!address.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(address.phone)) newErrors.phone = 'Please enter a valid 10-digit phone number';
    
    if (!address.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(address.email)) newErrors.email = 'Please enter a valid email address';
    
    if (!address.line1) newErrors.line1 = 'Address Line 1 is required';
    if (!address.city) newErrors.city = 'City is required';
    if (!address.state) newErrors.state = 'State is required';
    
    if (!address.pincode) newErrors.pincode = 'PIN Code is required';
    else if (!/^\d{6}$/.test(address.pincode)) newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(address);
    }
  };
  
  return (
    <Box>
      <Text className="text-xl font-serif mb-4">Shipping Address</Text>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={address.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
          />
          
          <TextInput
            label="Phone Number"
            placeholder="10-digit mobile number"
            value={address.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            required
          />
        </div>
        
        <TextInput
          label="Email Address"
          placeholder="Your email address"
          className="mb-4"
          value={address.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
        
        <TextInput
          label="Address Line 1"
          placeholder="House/Flat number, Building name, Street"
          className="mb-4"
          value={address.line1}
          onChange={(e) => handleChange('line1', e.target.value)}
          error={errors.line1}
          required
        />
        
        <TextInput
          label="Address Line 2"
          placeholder="Area, Landmark (optional)"
          className="mb-4"
          value={address.line2}
          onChange={(e) => handleChange('line2', e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <TextInput
            label="City"
            placeholder="City/Town/Village"
            value={address.city}
            onChange={(e) => handleChange('city', e.target.value)}
            error={errors.city}
            required
          />
          
          <Select
            label="State"
            placeholder="Select your state"
            data={indianStates}
            value={address.state}
            onChange={(value) => handleChange('state', value || '')}
            error={errors.state}
            required
          />
          
          <TextInput
            label="PIN Code"
            placeholder="6-digit PIN code"
            value={address.pincode}
            onChange={(e) => handleChange('pincode', e.target.value)}
            error={errors.pincode}
            required
          />
        </div>
        
        <Group justify="flex-end" mt="xl">
          <Button
            variant="outline"
            color="gray"
            onClick={onCancel}
          >
            Back
          </Button>
          
          <Button
            type="submit"
            className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            Continue to Payment
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default ShippingAddressForm; 