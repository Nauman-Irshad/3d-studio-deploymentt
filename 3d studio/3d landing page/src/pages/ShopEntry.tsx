import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProductPage from '../modules/Product/Product';
import FunctionalLogin from '../components/FunctionalLogin';
import FunctionalSignUp from '../components/FunctionalSignUp';
import CartPage from '../components/CartPage';
import ShippingPage from '../components/ShippingPage';
import PaymentPage from '../components/PaymentPage';
import ThankYouPage from '../components/ThankYouPage';
import ProfileWrapper from '../components/ProfileWrapper';
import OrderListWrapper from '../components/OrderListWrapper';
import TailorProgressWrapper from '../components/TailorProgressWrapper';
import OrderDetailsWrapper from '../components/OrderDetailsWrapper';
import ChatPageWrapper from '../components/ChatPageWrapper';
import { CartProvider } from '../components/CartContext';

import { useAuth } from '../contexts/AuthContext';

// Simple page type for navigation - extended with string to support external routes conceptually in 'intendedDestination'
type Page = 'landing' | 'login' | 'signup' | 'cart' | 'shipping' | 'payment' | 'thankyou' | 'profile' | 'orders' | 'tailor-progress' | 'chat' | 'order-details' | 'product';

interface ShopEntryProps {
  initialPage?: Page;
}

export default function ShopEntry({ initialPage = 'landing' }: ShopEntryProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, signup, logout } = useAuth();

  // State to track which page is currently displayed
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');
  const [intendedDestination, setIntendedDestination] = useState<string | null>(null);

  // Sync state with prop changes (e.g. when navigating from / to /cart)
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Navigation functions
  const navigateToLanding = () => setCurrentPage('landing');
  const navigateToLogin = () => setCurrentPage('login');
  const navigateToSignUp = () => setCurrentPage('signup');
  const navigateToCart = () => setCurrentPage('cart');
  const navigateToShipping = () => setCurrentPage('shipping');
  const navigateToPayment = () => setCurrentPage('payment');
  const navigateToThankYou = () => setCurrentPage('thankyou');
  const navigateToProduct = () => setCurrentPage('product');

  const navigateToProfile = () => {
    if (isAuthenticated) {
      setCurrentPage('profile');
    } else {
      setIntendedDestination('profile');
      setCurrentPage('login');
    }
  };

  // Auth-gated navigation for new modules
  const navigateToDiscovery = () => {
    if (isAuthenticated) {
      navigate('/discovery');
    } else {
      setIntendedDestination('/discovery');
      setCurrentPage('login');
    }
  };

  const navigateToMeasurement = () => {
    if (isAuthenticated) {
      navigate('/measurement');
    } else {
      setIntendedDestination('/measurement');
      setCurrentPage('login');
    }
  };

  const navigateToOrders = () => {
    if (isAuthenticated) {
      setCurrentPage('orders');
    } else {
      setIntendedDestination('orders');
      setCurrentPage('login');
    }
  };

  const navigateToOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentPage('order-details');
  };

  const navigateToTailorProgress = () => {
    if (isAuthenticated) {
      setCurrentPage('tailor-progress');
    } else {
      setIntendedDestination('tailor-progress');
      setCurrentPage('login');
    }
  };

  const navigateToChat = () => {
    if (isAuthenticated) {
      setCurrentPage('chat');
    } else {
      setIntendedDestination('chat');
      setCurrentPage('login');
    }
  };

  // Auth actions
  const handleLogin = () => {
    login({ id: '1', name: 'User', email: 'user@example.com' });

    // Check for redirection state from ProtectedRoute
    const from = (location.state as any)?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    // Check if intendedDestination is an external route (starts with /)
    if (intendedDestination && intendedDestination.startsWith('/')) {
      navigate(intendedDestination);
      setIntendedDestination(null);
    } else {
      // Navigate to intended page or default to profile
      setCurrentPage((intendedDestination as Page) || 'profile');
      setIntendedDestination(null);
    }
  };

  const handleSignUp = () => {
    signup({ id: '1', name: 'User', email: 'user@example.com' });

    // Check for redirection state from ProtectedRoute
    const from = (location.state as any)?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
      return;
    }

    if (intendedDestination && intendedDestination.startsWith('/')) {
      navigate(intendedDestination);
      setIntendedDestination(null);
    } else {
      setCurrentPage((intendedDestination as Page) || 'profile');
      setIntendedDestination(null);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  // Placeholder navigation functions for profile sidebar
  const navigateToMeasurements = () => {
    // TODO: Implement measurements page
    console.log('Navigate to measurements');
  };

  const navigateToAddress = () => {
    // TODO: Implement address page
    console.log('Navigate to address');
  };

  const navigateToPaymentMethods = () => {
    // TODO: Implement payment methods page
    console.log('Navigate to payment methods');
  };

  const navigateToReturns = () => {
    // TODO: Implement returns page
    console.log('Navigate to returns');
  };

  const navigateToReviews = () => {
    // TODO: Implement reviews page
    console.log('Navigate to reviews');
  };

  const navigateToCancellations = () => {
    // TODO: Implement cancellations page
    console.log('Navigate to cancellations');
  };

  const navigateToTailorReviews = () => {
    // TODO: Implement tailor reviews page
    console.log('Navigate to tailor reviews');
  };

  // Render the appropriate page based on current state
  return (
    <div className="size-full">
      {currentPage === 'landing' && (
        <LandingPage
          onNavigateToSignUp={navigateToSignUp}
          onNavigateToLogin={navigateToLogin}
          onNavigateToCart={navigateToCart}
          onNavigateToChat={navigateToChat}
          onNavigateToDiscovery={navigateToDiscovery}
          onNavigateToMeasurement={navigateToMeasurement}
          onNavigateToProduct={navigateToProduct}
        />
      )}
      {currentPage === 'login' && (
        <FunctionalLogin
          onNavigateToSignUp={navigateToSignUp}
          onNavigateToLanding={navigateToLanding}
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'signup' && (
        <FunctionalSignUp
          onNavigateToLogin={navigateToLogin}
          onNavigateToLanding={navigateToLanding}
          onSignUp={handleSignUp}
        />
      )}
      {currentPage === 'cart' && (
        <CartPage
          onNavigateToLanding={navigateToLanding}
          onNavigateToShipping={navigateToShipping}
          onNavigateToProfile={navigateToProfile}
        />
      )}
      {currentPage === 'shipping' && (
        <ShippingPage
          onNavigateToCart={navigateToCart}
          onNavigateToPayment={navigateToPayment}
          onNavigateToLanding={navigateToLanding}
          onNavigateToProfile={navigateToProfile}
        />
      )}
      {currentPage === 'payment' && (
        <PaymentPage
          onNavigateToShipping={navigateToShipping}
          onNavigateToThankYou={navigateToThankYou}
          onNavigateToLanding={navigateToLanding}
          onNavigateToProfile={navigateToProfile}
        />
      )}
      {currentPage === 'thankyou' && (
        <ThankYouPage
          onNavigateToLanding={navigateToLanding}
          onNavigateToOrders={navigateToOrders}
          onNavigateToProfile={navigateToProfile}
        />
      )}
      {currentPage === 'profile' && (
        <ProfileWrapper
          onNavigateToOrders={navigateToOrders}
          onNavigateToMeasurements={navigateToMeasurements}
          onNavigateToAddress={navigateToAddress}
          onNavigateToPaymentMethods={navigateToPaymentMethods}
          onNavigateToReturns={navigateToReturns}
          onNavigateToReviews={navigateToReviews}
          onNavigateToCancellations={navigateToCancellations}
          onNavigateToTailorProgress={navigateToTailorProgress}
          onNavigateToTailorReviews={navigateToTailorReviews}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'orders' && (
        <OrderListWrapper
          onNavigateToTailorProgress={navigateToTailorProgress}
          onNavigateToProfile={navigateToProfile}
          onNavigateToMeasurements={navigateToMeasurements}
          onNavigateToAddress={navigateToAddress}
          onNavigateToPaymentMethods={navigateToPaymentMethods}
          onNavigateToReturns={navigateToReturns}
          onNavigateToReviews={navigateToReviews}
          onNavigateToCancellations={navigateToCancellations}
          onNavigateToTailorReviews={navigateToTailorReviews}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'tailor-progress' && (
        <TailorProgressWrapper
          onNavigateToOrderList={navigateToOrders}
          onNavigateToProfile={navigateToProfile}
          onNavigateToMeasurements={navigateToMeasurements}
          onNavigateToAddress={navigateToAddress}
          onNavigateToPaymentMethods={navigateToPaymentMethods}
          onNavigateToReturns={navigateToReturns}
          onNavigateToReviews={navigateToReviews}
          onNavigateToCancellations={navigateToCancellations}
          onNavigateToTailorReviews={navigateToTailorReviews}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'order-details' && (
        <OrderDetailsWrapper
          orderId={selectedOrderId}
          onNavigateToOrders={navigateToOrders}
          onNavigateToProfile={navigateToProfile}
          onNavigateToMeasurements={navigateToMeasurements}
          onNavigateToAddress={navigateToAddress}
          onNavigateToPaymentMethods={navigateToPaymentMethods}
          onNavigateToReturns={navigateToReturns}
          onNavigateToReviews={navigateToReviews}
          onNavigateToCancellations={navigateToCancellations}
          onNavigateToTailorProgress={navigateToTailorProgress}
          onNavigateToTailorReviews={navigateToTailorReviews}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'chat' && (
        <div className="size-full">
          <ChatPageWrapper
            onNavigateBack={navigateToLanding}
          />
        </div>
      )}
      {currentPage === 'product' && (
        <div className="size-full overflow-auto">
          <ProductPage />
        </div>
      )}
    </div>
  );
}
