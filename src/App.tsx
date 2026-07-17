import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Cursor3D } from "@/components/Cursor3D";
import { ParticleField } from "@/components/ParticleField";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Lazy load heavy components
const Home = lazy(() => import("@/pages/home"));
const Products = lazy(() => import("@/pages/products"));
const ProductDetail = lazy(() => import("@/pages/product-detail"));
const Cart = lazy(() => import("@/pages/cart"));
const Wishlist = lazy(() => import("@/pages/wishlist"));
const Compare = lazy(() => import("@/pages/compare"));
const Checkout = lazy(() => import("@/pages/checkout"));
const OrderSuccess = lazy(() => import("@/pages/order-success"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Simple loading spinner
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useLocation()]);
  return null;
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Switch key={location}>
          <Route path="/"><Home /></Route>
          <Route path="/products"><Products /></Route>
          <Route path="/products/:id"><ProductDetail /></Route>
          <Route path="/cart"><Cart /></Route>
          <Route path="/wishlist"><Wishlist /></Route>
          <Route path="/compare"><Compare /></Route>
          <Route path="/checkout"><Checkout /></Route>
          <Route path="/order-success"><OrderSuccess /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
                <ScrollToTop />
                <div className="flex flex-col min-h-[100dvh] bg-background text-foreground selection:bg-primary/30 selection:text-primary relative overflow-hidden">
                  <ParticleField />
                  <Navbar />
                  <main className="flex-grow relative z-10">
                    <Router />
                  </main>
                  <Footer />
                  <BackToTop />
                  <Cursor3D />
                </div>
              </WouterRouter>
              <Toaster position="bottom-right" theme="system" richColors />
            </TooltipProvider>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;