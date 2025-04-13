import { ProductCardProps } from '../components/ProductCard';

export interface CategoryProducts {
  neckties: ProductCardProps[];
  bowTies: ProductCardProps[];
  pocketSquares: ProductCardProps[];
  men: ProductCardProps[];
  women: ProductCardProps[];
  combos: ProductCardProps[];
  oversizedTees: ProductCardProps[];
  wedding: ProductCardProps[];
  home: ProductCardProps[];
}

// Generate product data manually
export const getStaticProducts = (): CategoryProducts => {
  // Base product template
  const createProduct = (
    id: number, 
    name: string, 
    description: string, 
    price: number,
    color: string,
    isNew: boolean = true
  ): ProductCardProps => {
    // Determine the category and image path based on the product ID
    let imagePath;
    
    if (id >= 76 && id <= 87) {
      // Oversized tees use the base category image
      imagePath = '/images/oversizedtees.jpg';
    } else if (id >= 88 && id <= 99) {
      // Wedding products use the base category image
      imagePath = '/images/wedding.jpg';
    } else {
      // Other products use numbered images
      let category = "necktie";
      let imageIndex = ((id - 1) % 6) + 1;
      
      if (id >= 16 && id <= 27) {
        category = "bowtie";
      } else if (id >= 28 && id <= 39) {
        category = "pocketsquares";
      }
      
      imagePath = `/images/${category}${imageIndex}.jpg`;
    }
    
    return {
      id,
      name,
      description,
      price,
      color: color.toLowerCase(),
      image: imagePath,
      isNew,
      link: `/product/${id}`
    };
  };

  // Create products for each category
  const neckties: ProductCardProps[] = [
    createProduct(1, "Royal Duchess Silk", "Handcrafted from the finest Mulberry silk", 8999, "blue", true),
    createProduct(2, "Charcoal Herringbone", "Timeless pattern with a modern twist", 6499, "grey", false),
    createProduct(3, "Midnight Blue Twill", "Deep navy tie with subtle texture", 5999, "navy", true),
    createProduct(4, "Burgundy Classic", "Rich burgundy tone for a sophisticated look", 7499, "burgundy", true),
    createProduct(5, "Geometric Gold", "Intricate gold pattern on black background", 9999, "black", false),
    createProduct(6, "Silver Anniversary", "Elegant silver tie for special occasions", 8499, "grey", true),
    createProduct(7, "Forest Green Jacquard", "Lush green with subtle pattern", 6799, "green", false),
    createProduct(8, "Azure Diamond", "Vibrant blue with diamond texture", 7299, "blue", true),
    createProduct(9, "Platinum Stripe", "Modern stripe pattern in grey and silver", 8999, "grey", true),
    createProduct(10, "Obsidian Black", "Pure black tie with subtle sheen", 7999, "black", false),
    createProduct(11, "Crimson Paisley", "Bold paisley pattern in rich red", 9499, "red", true),
    createProduct(12, "Ivory Silk", "Luxurious ivory tie for weddings", 10999, "white", true),
    createProduct(13, "Sapphire Royal", "Deep blue with royal pattern", 8599, "blue", false),
    createProduct(14, "Emerald Texture", "Rich emerald green with tactile surface", 7599, "green", true),
    createProduct(15, "Amber Heritage", "Warm amber tones with classic design", 6999, "brown", true)
  ];

  const bowTies: ProductCardProps[] = [
    createProduct(16, "Classic Black Bow", "Timeless black silk bow tie", 4999, "black", true),
    createProduct(17, "Navy Polka Dot", "Playful yet elegant navy bow tie", 5499, "navy", false),
    createProduct(18, "Burgundy Velvet", "Luxurious velvet texture", 6999, "burgundy", true),
    createProduct(19, "Diamond Point White", "Sharp diamond point for formal events", 5999, "white", true),
    createProduct(20, "Emerald Silk", "Vibrant green self-tie bow tie", 5799, "green", false),
    createProduct(21, "Charcoal Herringbone Bow", "Sophisticated pattern in grey", 6299, "grey", true),
    createProduct(22, "Gold Medallion", "Statement bow tie with medallion pattern", 7499, "beige", true),
    createProduct(23, "Ruby Red", "Bold red for striking contrast", 5299, "red", false),
    createProduct(24, "Midnight Blue", "Deep blue with subtle texture", 4899, "navy", true),
    createProduct(25, "Silver Celebration", "Lustrous silver for special occasions", 6899, "grey", true),
    createProduct(26, "Geometric Grey", "Modern geometric pattern", 5599, "grey", false),
    createProduct(27, "Tuxedo Black", "Classic black for black tie events", 6499, "black", true)
  ];

  const pocketSquares: ProductCardProps[] = [
    createProduct(28, "White Silk Square", "Pure silk with hand-rolled edges", 3499, "white", true),
    createProduct(29, "Navy Border", "White square with navy border", 3999, "navy", false),
    createProduct(30, "Burgundy Paisley", "Rich paisley pattern", 4599, "burgundy", true),
    createProduct(31, "Gold Polka", "White with gold polka dots", 4299, "beige", true),
    createProduct(32, "Forest Green Solid", "Deep green for a touch of color", 3799, "green", false),
    createProduct(33, "Charcoal Medallion", "Intricate medallion pattern", 4999, "grey", true),
    createProduct(34, "Azure Floral", "Delicate floral pattern in blue", 4799, "blue", true),
    createProduct(35, "Ruby Geometric", "Bold geometric pattern in red", 4499, "red", false),
    createProduct(36, "Silver Herringbone", "Subtle herringbone texture", 5299, "grey", true),
    createProduct(37, "Ivory Silk", "Classic ivory for weddings", 4999, "white", true),
    createProduct(38, "Emerald Pattern", "Rich emerald with detailed pattern", 4799, "green", false),
    createProduct(39, "Midnight Blue Solid", "Deep blue for versatility", 3899, "navy", true)
  ];

  const men: ProductCardProps[] = [
    createProduct(40, "Executive Navy", "Perfect for business meetings", 6999, "navy", true),
    createProduct(41, "Charcoal Pinstripe", "Subtle pinstripe pattern", 7499, "grey", false),
    createProduct(42, "Oxford Blue", "Classic blue for everyday elegance", 5999, "blue", true),
    createProduct(43, "Power Red", "Make a statement in meetings", 6499, "red", true),
    createProduct(44, "Slate Grey", "Versatile grey for any occasion", 5799, "grey", false),
    createProduct(45, "Black Diamond", "Textured black tie", 6899, "black", true),
    createProduct(46, "Navy Medallion", "Traditional pattern with modern touch", 7299, "navy", true),
    createProduct(47, "Forest Business", "Deep green for distinguished look", 6599, "green", false),
    createProduct(48, "Blue Steel", "Modern blue-grey blend", 5999, "blue", true),
    createProduct(49, "Burgundy Classic", "Timeless burgundy for professionals", 6799, "burgundy", true),
    createProduct(50, "Conservative Stripe", "Traditional striped pattern", 6299, "grey", false),
    createProduct(51, "Gentleman's Choice", "Sophisticated pattern in grey", 7599, "black", true)
  ];

  const women: ProductCardProps[] = [
    createProduct(52, "Coral Bloom", "Vibrant coral for a feminine touch", 5999, "pink", true),
    createProduct(53, "Lavender Whisper", "Delicate lavender tie", 6499, "purple", false),
    createProduct(54, "Rose Gold", "Shimmering rose gold pattern", 7999, "pink", true),
    createProduct(55, "Blush Pink", "Subtle pink for professional settings", 6299, "pink", true),
    createProduct(56, "Teal Elegance", "Rich teal with subtle pattern", 6799, "blue", false),
    createProduct(57, "Purple Passion", "Deep purple for bold statements", 7299, "purple", true),
    createProduct(58, "Crimson Slim", "Slimline tie in vibrant red", 5999, "red", true),
    createProduct(59, "Mint Refresh", "Fresh mint green for spring", 6199, "green", false),
    createProduct(60, "Sapphire Blue", "Deep blue with feminine details", 6899, "blue", true),
    createProduct(61, "Plum Perfect", "Rich plum tone for sophistication", 7199, "purple", true),
    createProduct(62, "Mauve Dream", "Soft mauve for subtle elegance", 6599, "pink", false),
    createProduct(63, "Berry Bright", "Vibrant berry tone", 6399, "burgundy", true)
  ];

  const combos: ProductCardProps[] = [
    createProduct(64, "Navy & Burgundy Set", "Tie and pocket square set", 9999, "navy", true),
    createProduct(65, "Black Formal Combo", "Bow tie and pocket square", 8999, "black", false),
    createProduct(66, "Grey Business Set", "Tie, pocket square, and cufflinks", 12999, "grey", true),
    createProduct(67, "Wedding Ivory", "Complete wedding accessory set", 15999, "white", true),
    createProduct(68, "Power Meeting", "Red tie and gold cufflinks", 9499, "red", false),
    createProduct(69, "Blue Harmony", "Coordinated blue accessories", 10999, "blue", true),
    createProduct(70, "Gentleman's Collection", "Complete set for the modern man", 14999, "black", true),
    createProduct(71, "Evening Black", "Black tie event essentials", 11999, "black", false),
    createProduct(72, "Green Coordination", "Forest green tie and pocket square", 8799, "green", true),
    createProduct(73, "Silver Celebration", "Silver tie and matching accessories", 13499, "grey", true),
    createProduct(74, "Heritage Collection", "Traditional patterns in modern set", 12499, "brown", false),
    createProduct(75, "Executive Package", "Complete professional accessory set", 16999, "navy", true)
  ];

  const oversizedTees: ProductCardProps[] = [
    createProduct(76, "Black Luxury Tee", "Oversized premium cotton t-shirt", 3999, "black", true),
    createProduct(77, "White Essential", "Staple white oversized tee", 3499, "white", false),
    createProduct(78, "Navy Comfort", "Relaxed fit navy t-shirt", 3799, "navy", true),
    createProduct(79, "Grey Marl", "Soft marl texture", 3599, "grey", true),
    createProduct(80, "Burgundy Statement", "Rich tone casual tee", 3899, "burgundy", false),
    createProduct(81, "Forest Casual", "Deep green for everyday wear", 3799, "green", true),
    createProduct(82, "Charcoal Minimal", "Subtle logo detail", 3699, "grey", true),
    createProduct(83, "Ivory Premium", "Luxurious ivory tee", 4299, "white", false),
    createProduct(84, "Blue Signature", "With subtle embroidered logo", 3999, "blue", true),
    createProduct(85, "Taupe Essential", "Neutral tone for versatility", 3599, "beige", true),
    createProduct(86, "Black Embroidered", "With gold embroidery detail", 4499, "black", false),
    createProduct(87, "Cream Luxury", "Soft cream tone premium tee", 3899, "beige", true)
  ];

  const wedding: ProductCardProps[] = [
    createProduct(88, "Ivory Celebration", "Pure silk for your special day", 9999, "white", true),
    createProduct(89, "Silver Anniversary", "Lustrous silver tie", 8999, "grey", false),
    createProduct(90, "Champagne Toast", "Warm champagne tone", 10499, "beige", true),
    createProduct(91, "White Diamond", "Textured white tie", 9499, "white", true),
    createProduct(92, "Platinum Special", "Platinum silk with subtle pattern", 11999, "grey", false),
    createProduct(93, "Gold Ceremony", "Elegant gold for ceremonies", 12499, "beige", true),
    createProduct(94, "Ivory Paisley", "Traditional pattern for weddings", 9799, "white", true),
    createProduct(95, "Pearl Elegance", "Pearlescent finish", 10999, "white", false),
    createProduct(96, "Blush Wedding", "Subtle blush tone for modern weddings", 9299, "pink", true),
    createProduct(97, "Silver Jacquard", "Intricate jacquard pattern", 11499, "grey", true),
    createProduct(98, "Cream Silk", "Pure silk with hand-rolled edges", 10799, "beige", false),
    createProduct(99, "White Celebration", "Traditional white for formal weddings", 9999, "white", true)
  ];

  // Create a function to ensure all products have images
  const ensureProductImages = (products: ProductCardProps[]): ProductCardProps[] => {
    return products.map(product => {
      // If the product doesn't have an image or has the default formal attire image
      if (!product.image || product.image.includes('Formal Attire Portrait')) {
        let imagePath;
        
        if (product.id >= 76 && product.id <= 87) {
          // Oversized tees use the base category image
          imagePath = '/images/oversizedtees.jpg';
        } else if (product.id >= 88 && product.id <= 99) {
          // Wedding products use the base category image
          imagePath = '/images/wedding.jpg';
        } else {
          // Other products use numbered images
          let category = "necktie";
          let imageIndex = ((product.id - 1) % 6) + 1;
          
          if (product.id >= 16 && product.id <= 27) {
            category = "bowtie";
          } else if (product.id >= 28 && product.id <= 39) {
            category = "pocketsquares";
          }
          
          imagePath = `/images/${category}${imageIndex}.jpg`;
        }
        
        return {
          ...product,
          image: imagePath
        };
      }
      return product;
    });
  };

  // Ensure all products have images
  const necktiesWithImages = ensureProductImages(neckties);
  const bowTiesWithImages = ensureProductImages(bowTies);
  const pocketSquaresWithImages = ensureProductImages(pocketSquares);
  const menWithImages = ensureProductImages(men);
  const womenWithImages = ensureProductImages(women);
  const combosWithImages = ensureProductImages(combos);
  const oversizedTeesWithImages = ensureProductImages(oversizedTees);
  const weddingWithImages = ensureProductImages(wedding);

  // Home page features a mix of products from all categories
  // Ensure we have enough products for the home page
  const home: ProductCardProps[] = [
    // First row - neckties and bow ties
    { ...necktiesWithImages[0], image: '/images/necktie1.jpg' },
    { ...necktiesWithImages[1], image: '/images/necktie2.jpg' },
    { ...necktiesWithImages[2], image: '/images/necktie3.jpg' },
    { ...necktiesWithImages[3], image: '/images/necktie4.jpg' },
    
    // Second row - bow ties and pocket squares
    { ...bowTiesWithImages[0], image: '/images/bowtie1.jpg' },
    { ...bowTiesWithImages[1], image: '/images/bowtie2.jpg' },
    { ...bowTiesWithImages[2], image: '/images/bowtie3.jpg' },
    { ...bowTiesWithImages[3], image: '/images/bowtie4.jpg' },
    
    // Third row - pocket squares
    { ...pocketSquaresWithImages[0], image: '/images/pocketsquares1.jpg' },
    { ...pocketSquaresWithImages[1], image: '/images/pocketsquares2.jpg' },
    { ...pocketSquaresWithImages[2], image: '/images/pocketsquares3.jpg' },
    { ...pocketSquaresWithImages[3], image: '/images/pocketsquares4.jpg' },
    
    // Fourth row - mix of categories
    { ...oversizedTeesWithImages[0], image: '/images/oversizedtees.jpg' },
    { ...weddingWithImages[0], image: '/images/wedding.jpg' },
    { ...necktiesWithImages[4], image: '/images/necktie5.jpg' },
    { ...necktiesWithImages[5], image: '/images/necktie6.jpg' }
  ];

  return {
    neckties: necktiesWithImages,
    bowTies: bowTiesWithImages,
    pocketSquares: pocketSquaresWithImages,
    men: menWithImages,
    women: womenWithImages,
    combos: combosWithImages,
    oversizedTees: oversizedTeesWithImages,
    wedding: weddingWithImages,
    home
  };
};

export default {
  getStaticProducts
}; 