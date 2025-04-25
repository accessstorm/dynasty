import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { luxuryTheme } from './components/LuxuryTheme';
import WhatsAppButton from './components/WhatsAppButton';
import ChatbotButton from './components/ChatbotButton';

// Pages
import Home from './pages/Home';
import Neckties from './pages/Neckties';
import BowTies from './pages/BowTies';
import PocketSquares from './pages/PocketSquares';
import Men from './pages/Men';
import Women from './pages/Women';
import Combos from './pages/Combos';
import OversizedTees from './pages/OversizedTees';
import Wedding from './pages/Wedding';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <MantineProvider theme={luxuryTheme}>
      <Router>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <div className="flex-grow w-full max-w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/neckties" element={<Neckties />} />
              <Route path="/bow-ties" element={<BowTies />} />
              <Route path="/pocket-squares" element={<PocketSquares />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/combos" element={<Combos />} />
              <Route path="/oversized-tees" element={<OversizedTees />} />
              <Route path="/wedding" element={<Wedding />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </div>
          <Footer />
          {/* WhatsApp floating button */}
          <WhatsAppButton phoneNumber="+919820238241" />
          {/* Chatbot floating button */}
          <ChatbotButton />
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
