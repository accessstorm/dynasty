# Dynasty Ties - Royal Luxury E-Commerce

An elegant e-commerce platform showcasing Dynasty's exclusive collection of luxury ties and formal accessories.

## Project Overview

Dynasty is a premium accessories brand specializing in handcrafted ties, pocket squares, and formal accessories. The website features a sophisticated royal aesthetic with a focus on luxury product presentation.

## Visual Design

The design system focuses on creating a royal luxury experience:

- **Color Palette**: Deep black, gold accents, burgundy, ivory, and charcoal
- **Typography**: Serif fonts for headings (Playfair Display), clean sans-serif for body text (Inter)
- **Product Cards**: Clean, minimal design with consistent aspect ratio and subtle hover effects
- **Category Headers**: Elegant headers with centered titles and decorative gold accents
- **Button Styles**: Black & gold buttons with refined hover states

## Technologies Used

- React with Vite + TypeScript
- React Router for page navigation
- Tailwind CSS for styling
- Mantine UI components
- Framer Motion for animations

## Product Distribution

The 100 ties in the catalog are distributed precisely across different category pages:

### Distribution Rules
- **Home**: Exactly 12 featured products (mix of premium and mid-range ties)
- **Neckties**: Exactly 15 products (main category)
- **Bow Ties**: Exactly 12 products with geometric or diamond patterns
- **Pocket Squares**: Exactly 12 products with solid colors or floral patterns
- **Men**: Exactly 12 products with masculine colors (blue, navy, black)
- **Women**: Exactly 12 products with feminine colors (purple, pink, coral)
- **Combos**: Exactly 12 products that work well in combinations (stripes, jacquard)
- **Oversized Tees**: Exactly 12 lower-priced casual products
- **Wedding**: Exactly 12 premium ties for formal occasions

### Distribution Algorithm

1. Each tie is first assigned to a primary category based on its attributes (pattern, color, material, price)
2. The system ensures each category has exactly the target number of products
3. If a category has insufficient products, the system either borrows from other categories or creates variations

For detailed mapping rules, see `src/data/categoryMapping.json`.

## Components

- **LuxuryTheme**: Color palette and class definitions for the royal aesthetic
- **ProductCard**: Displays individual product with consistent aspect ratio (1:1.5)
- **ProductGrid**: Responsive grid with precise product count control
- **Category Pages**: Each with consistent header styling and product presentation

## Responsive Design

- Desktop: 4 cards per row
- Tablet: 3 cards per row
- Mobile: 1-2 cards per row

## Card Design

- Consistent aspect ratio (1:1.5)
- 65% image area, 35% text area
- Clean borders with subtle hover effects
- Gold-accented "New" badges for new products
- Elegant typography for product titles and prices

## Razorpay Integration

This project includes Razorpay payment integration for checkout. 

### Running the Application with Payment Integration

To run the application with payment integration:

```bash
# Install dependencies
npm install

# Start the combined server (frontend + payment backend)
npm run payment
```

This will start both the Vite dev server and the payment processing backend in a single command.

### Payment Features

- One-click payment processing with Razorpay
- Secure payment gateway integration
- Test mode with provided credentials
- Mobile-responsive design

### Testing Razorpay Payments

Use these test credentials to simulate a payment:

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name
- 3D Secure Password: 1234

## Delhivery Integration

The application includes integration with Delhivery for shipping and delivery services.

### Setting Up Delhivery

To enable Delhivery integration:

1. Sign up for a Delhivery business account
2. Get your API credentials (client ID and token)
3. Add them to your .env file:
   ```
   DELHIVERY_API_KEY=your_api_key
   DELHIVERY_ENDPOINT=https://track-api.delhivery.com/api/cmu/create.json
   ```

### Shipping Features

- Automatic shipment creation after successful payment
- Real-time tracking of orders
- Shipping address collection
- Order confirmation with tracking details
- Integration with Razorpay payment flow

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open http://localhost:5173 in your browser

## Build for Production

```
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

---

© 2025 Dynasty. All rights reserved.
