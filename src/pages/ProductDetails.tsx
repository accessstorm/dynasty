import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Text, Button, Badge, Accordion } from '@mantine/core';
import { getStaticProducts } from '../services/StaticProductService';
import { ProductCardProps } from '../components/ProductCard';
import RazorpayButton from '../components/RazorpayButton';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const allProducts = getStaticProducts();
        // Flatten all product categories into a single array
        const productsArray = [
          ...allProducts.neckties,
          ...allProducts.bowTies,
          ...allProducts.pocketSquares,
          ...allProducts.men,
          ...allProducts.women,
          ...allProducts.combos,
          ...allProducts.oversizedTees,
          ...allProducts.wedding,
        ];
        
        // Find the product with the matching ID
        const foundProduct = productsArray.find(p => p.id === Number(productId));
        
        if (foundProduct) {
          // Determine product category
          let category = "necktie"; // Default
          
          if (allProducts.bowTies.some(p => p.id === foundProduct.id)) category = "bowtie";
          else if (allProducts.pocketSquares.some(p => p.id === foundProduct.id)) category = "pocketsquares";
          else if (allProducts.oversizedTees.some(p => p.id === foundProduct.id)) category = "oversizedtees";
          else if (allProducts.wedding.some(p => p.id === foundProduct.id)) category = "wedding";
          
          // Generate product images based on category
          const images = generateProductImages(category, foundProduct.id);
          setProductImages(images);
          
          // Update product with the first image
          setProduct({
            ...foundProduct,
            image: images[0]
          });
        } else {
          setProduct(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId]);

  // Function to generate product images based on category and ID
  const generateProductImages = (category: string, id: number): string[] => {
    const images: string[] = [];
    
    // Map product ID to image index (1-6)
    const imageIndex = ((id - 1) % 6) + 1;
    
    // Add main product image
    images.push(`/images/${category}${imageIndex}.jpg`);
    
    // Add additional images (repeating if needed)
    for (let i = 1; i <= 4; i++) {
      const additionalIndex = ((imageIndex + i - 1) % 6) + 1;
      images.push(`/images/${category}${additionalIndex}.jpg`);
    }
    
    return images;
  };

  // Function to handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  // Function to handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Function to generate breadcrumbs based on product category
  const generateBreadcrumbs = () => {
    if (!product) return [];
    
    // Determine product category (simplified for this example)
    let category = "neckties"; // Default
    const allProducts = getStaticProducts();
    
    if (allProducts.bowTies.some(p => p.id === product.id)) category = "bow-ties";
    else if (allProducts.pocketSquares.some(p => p.id === product.id)) category = "pocket-squares";
    else if (allProducts.men.some(p => p.id === product.id)) category = "men";
    else if (allProducts.women.some(p => p.id === product.id)) category = "women";
    else if (allProducts.combos.some(p => p.id === product.id)) category = "combos";
    else if (allProducts.oversizedTees.some(p => p.id === product.id)) category = "oversized-tees";
    else if (allProducts.wedding.some(p => p.id === product.id)) category = "wedding";
    
    return [
      { label: "HOME", path: "/" },
      { 
        label: category.toUpperCase().replace("-", " "), 
        path: `/${category}` 
      },
      { label: product.name.toUpperCase(), path: "" }
    ];
  };

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center">
          <Text size="xl">Loading product...</Text>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-center">
          <Text size="xl" className="mb-4">Product not found</Text>
          <Button component={Link} to="/" variant="outline">
            Return to Home
          </Button>
        </div>
      </Container>
    );
  }

  // Generate breadcrumbs
  const breadcrumbs = generateBreadcrumbs();

  return (
    <Container size="xl" className="py-12">
      {/* Breadcrumbs navigation */}
      <div className="flex text-sm text-gray-500 mb-8">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2">›</span>}
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-black">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-black">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto px-4 py-10">
        {/* Left: Product Images */}
        <div className="flex flex-col space-y-4">
          <div className="relative aspect-square overflow-hidden border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <Badge 
                className="absolute top-4 left-4 bg-black text-white py-1 px-3"
                radius="xs"
              >
                NEW
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {productImages.map((image, i) => (
              <div 
                key={i} 
                className="aspect-square border border-gray-200 cursor-pointer hover:border-black"
                onClick={() => setProduct({...product, image})}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${i+1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col space-y-6">
          {/* Product Title & Info */}
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            {product.name}
          </h1>
          
          <div className="text-xl text-gray-900 mb-4">
            SKU: TTH-SNT-{product.id}
          </div>
          
          {/* Price */}
          <div className="text-2xl md:text-3xl font-serif">
            ₹{product?.price.toLocaleString('en-IN')}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex border border-gray-300">
              <button 
                onClick={handleDecrement}
                className="px-3 py-1 text-lg border-r border-gray-300"
              >
                -
              </button>
              <span className="px-4 py-1 text-lg">{quantity}</span>
              <button 
                onClick={handleIncrement}
                className="px-3 py-1 text-lg border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all uppercase text-sm tracking-widest py-4 font-medium"
              radius="xs"
              onClick={() => console.log("Add to cart clicked")}
            >
              Add to Cart
            </Button>
            
            <RazorpayButton
              amount={product?.price * quantity}
              name={product?.name || "Product"}
              description={product?.description || "Description"}
              className="bg-black text-white hover:bg-[#D4AF37] hover:text-black transition-all uppercase text-sm tracking-widest py-4 font-medium"
              buttonText="Buy Now"
              productDetails={{
                id: product?.id || 0,
                name: product?.name || "Product",
                quantity: quantity,
                price: product?.price || 0
              }}
            />
          </div>
          
          {/* Product Description */}
          <div className="mb-10">
            <Button
              variant="subtle"
              className="text-gray-500 hover:text-black underline p-0"
              radius="none"
            >
              ADD TO WISHLIST
            </Button>
          </div>
          
          {/* Product Information Accordion */}
          <Accordion className="border-t border-b border-gray-200" 
            styles={{
              control: {
                padding: '16px 0',
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              },
              chevron: {
                display: 'none' // Hide the chevron/arrow icon
              },
              item: {
                borderBottom: '1px solid #eaeaea'
              },
              panel: {
                padding: '0 0 16px 0'
              }
            }}
          >
            <Accordion.Item value="description">
              <Accordion.Control>
                <Text fw={500}>PRODUCT DESCRIPTION</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  {product.description}
                  <br /><br />
                  This premium {product.color} necktie is designed with geometric diamond patterns, 
                  adding a sophisticated touch to any formal attire. Crafted from high-quality microfiber,
                  this tie offers a silky finish and excellent durability for everyday wear.
                  <br /><br />
                  Each tie is meticulously handcrafted by our master artisans, ensuring the highest 
                  quality and attention to detail that Dynasty is renowned for.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="information">
              <Accordion.Control>
                <Text fw={500}>MORE INFORMATION</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text fw={500} className="mb-1">Material</Text>
                    <Text className="text-gray-700">Premium Microfiber</Text>
                  </div>
                  <div>
                    <Text fw={500} className="mb-1">Pattern</Text>
                    <Text className="text-gray-700">Geometric Diamond</Text>
                  </div>
                  <div>
                    <Text fw={500} className="mb-1">Color</Text>
                    <Text className="text-gray-700" style={{textTransform: 'capitalize'}}>{product.color}</Text>
                  </div>
                  <div>
                    <Text fw={500} className="mb-1">Width</Text>
                    <Text className="text-gray-700">3.25 inches</Text>
                  </div>
                  <div>
                    <Text fw={500} className="mb-1">Length</Text>
                    <Text className="text-gray-700">58 inches</Text>
                  </div>
                  <div>
                    <Text fw={500} className="mb-1">Care</Text>
                    <Text className="text-gray-700">Dry Clean Only</Text>
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            
            <Accordion.Item value="shipping">
              <Accordion.Control>
                <Text fw={500}>SHIPPING & HANDLING</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Text className="text-gray-700 leading-relaxed">
                  Free standard shipping on all orders within India. Orders are typically 
                  processed within 24 hours and delivered within 3-5 business days.
                  <br /><br />
                  International shipping is available for select countries. Shipping rates 
                  and delivery times vary by location.
                  <br /><br />
                  For more information, please visit our shipping policy page.
                </Text>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails; 