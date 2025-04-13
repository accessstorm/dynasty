import { ProductCardProps } from '../components/ProductCard';

interface TieData {
  id: number;
  name: string;
  pattern: string;
  material: string;
  color: string;
  description: string;
  price: number;
}

export interface CategoryDistribution {
  home: ProductCardProps[];
  neckties: ProductCardProps[];
  bowTies: ProductCardProps[];
  pocketSquares: ProductCardProps[];
  men: ProductCardProps[];
  women: ProductCardProps[];
  combos: ProductCardProps[];
  oversizedTees: ProductCardProps[];
  wedding: ProductCardProps[];
}

// Common image path
const imagePath = '/images/Formal Attire Portrait.jpeg';

// This function will fetch and distribute ties across categories
export const fetchAndDistributeTies = async (): Promise<CategoryDistribution> => {
  try {
    const response = await fetch('/data/ties.json');
    const data = await response.json();
    
    // Convert ties to ProductCardProps format
    const allTies: ProductCardProps[] = data.ties.map((tie: TieData) => ({
      id: tie.id,
      name: tie.name,
      description: tie.description,
      price: tie.price,
      image: imagePath,
      pattern: tie.pattern,
      material: tie.material,
      color: tie.color,
      isNew: true,
      category: determinePrimaryCategory(tie),
      link: `/product/${tie.id}`
    }));
    
    // Distribute ties across categories
    return distributeTiesToCategories(allTies);
  } catch (error) {
    console.error('Error fetching ties data:', error);
    return {
      home: [],
      neckties: [],
      bowTies: [],
      pocketSquares: [],
      men: [],
      women: [],
      combos: [],
      oversizedTees: [],
      wedding: []
    };
  }
};

// Determine the primary category for a tie based on its attributes
const determinePrimaryCategory = (tie: TieData): string => {
  // Wedding ties - formal patterns, luxury materials, higher price points
  if (
    tie.price > 8000 || 
    tie.pattern.includes('Paisley') || 
    tie.color.includes('Gold') ||
    tie.color.includes('Silver') ||
    tie.material.includes('silk-velvet')
  ) {
    return 'wedding';
  }
  
  // Women's ties - specific colors or patterns
  if (
    tie.color.includes('Purple') || 
    tie.color.includes('Pink') || 
    tie.color.includes('Coral')
  ) {
    return 'women';
  }
  
  // Bow ties (conceptual - since we don't have actual bow ties, assign certain patterns)
  if (
    tie.pattern.includes('Diamond') || 
    tie.pattern.includes('Geometric') ||
    tie.name.includes('Classic')
  ) {
    return 'bowTies';
  }
  
  // Pocket squares (conceptual)
  if (
    tie.pattern.includes('Solid') ||
    tie.pattern.includes('Floral') ||
    tie.material.includes('Artisanal')
  ) {
    return 'pocketSquares';
  }
  
  // Men's collection
  if (
    tie.color.includes('Blue') || 
    tie.color.includes('Navy') ||
    tie.color.includes('Black') ||
    tie.color.includes('Charcoal')
  ) {
    return 'men';
  }
  
  // Oversized Tees (conceptual)
  if (
    tie.price < 4000 ||
    tie.material.includes('Cotton')
  ) {
    return 'oversizedTees';
  }
  
  // Combos - ties with matching elements
  if (
    tie.pattern.includes('Stripe') ||
    tie.pattern.includes('Jacquard') ||
    tie.name.includes('Heritage')
  ) {
    return 'combos';
  }
  
  // Default to neckties
  return 'neckties';
};

// Distribute ties to categories based on their primary category
// and ensure even distribution
const distributeTiesToCategories = (ties: ProductCardProps[]): CategoryDistribution => {
  // Initial distribution based on primary category
  const initialDistribution = {
    home: [] as ProductCardProps[],
    neckties: [] as ProductCardProps[],
    bowTies: [] as ProductCardProps[],
    pocketSquares: [] as ProductCardProps[],
    men: [] as ProductCardProps[],
    women: [] as ProductCardProps[],
    combos: [] as ProductCardProps[],
    oversizedTees: [] as ProductCardProps[],
    wedding: [] as ProductCardProps[]
  };
  
  // First pass: distribute ties to their primary categories
  ties.forEach(tie => {
    const category = tie.category as keyof CategoryDistribution;
    
    if (initialDistribution[category]) {
      initialDistribution[category].push(tie);
    } else {
      initialDistribution.neckties.push(tie);
    }
  });
  
  // Second pass: balance distribution
  // Target exactly 12 per category (except home which gets 12, and neckties which gets 15)
  const finalDistribution = { ...initialDistribution };
  
  // Ensure home has exactly 12 featured products
  finalDistribution.home = selectFeaturedProducts(ties, 12);
  
  // Target counts for each category
  const targetCounts = {
    neckties: 15,
    bowTies: 12,
    pocketSquares: 12,
    men: 12,
    women: 12,
    combos: 12,
    oversizedTees: 12,
    wedding: 12
  };
  
  // Ensure each category has exactly its target number of products
  Object.entries(targetCounts).forEach(([category, targetCount]) => {
    const typedCategory = category as keyof typeof targetCounts;
    
    if (finalDistribution[typedCategory].length > targetCount) {
      // If too many, trim the excess
      finalDistribution[typedCategory] = finalDistribution[typedCategory].slice(0, targetCount);
    } else if (finalDistribution[typedCategory].length < targetCount) {
      // If too few, borrow from neckties or create duplicates with slight variations
      const needed = targetCount - finalDistribution[typedCategory].length;
      
      if (finalDistribution.neckties.length > needed + 15) {
        // Borrow from neckties if there are enough
        const borrowed = finalDistribution.neckties.splice(0, needed);
        finalDistribution[typedCategory].push(...borrowed);
      } else {
        // Create duplicates with slight variations if needed
        const existingProducts = finalDistribution[typedCategory];
        const duplicatesNeeded = targetCount - existingProducts.length;
        
        for (let i = 0; i < duplicatesNeeded; i++) {
          const sourceProduct = existingProducts[i % existingProducts.length];
          
          // Create a duplicate with slight variation
          const duplicate: ProductCardProps = {
            ...sourceProduct,
            id: ties.length + i, // Ensure unique ID
            name: `${sourceProduct.name} ${['Premium', 'Exclusive', 'Limited Edition', 'Classic'][i % 4]}`,
            price: Math.floor(sourceProduct.price * (1 + (Math.random() * 0.2 - 0.1))) // +/- 10% price variation
          };
          
          finalDistribution[typedCategory].push(duplicate);
        }
      }
    }
  });
  
  return finalDistribution;
};

// Select featured products for home page from all available ties
const selectFeaturedProducts = (ties: ProductCardProps[], count: number): ProductCardProps[] => {
  // Featured products should be a balanced mix of categories
  // For simplicity, we'll just take a random sample
  const shuffled = [...ties].sort(() => 0.5 - Math.random());
  
  // Select premium ties (higher price point)
  const premium = shuffled
    .filter(tie => tie.price > 6000)
    .slice(0, Math.floor(count / 2));
  
  // Select some mid-range ties for balance
  const midRange = shuffled
    .filter(tie => tie.price <= 6000 && tie.price >= 4000)
    .slice(0, Math.ceil(count / 2));
  
  // Combine and return
  return [...premium, ...midRange];
};

export default {
  fetchAndDistributeTies
}; 