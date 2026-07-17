import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Package, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccess() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate random order number like GZ-8F3A2P
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderNumber(`GZ-${randomStr}`);
    window.scrollTo(0, 0);
  }, []);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" as any, delay: 0.2 } 
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "backOut" as any } 
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div 
        className="max-w-md w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Checkmark */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <motion.svg
            className="absolute inset-0 w-full h-full text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              variants={circleVariants}
            />
            <motion.path
              d="M30 50 L45 65 L70 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={pathVariants}
            />
          </motion.svg>
        </div>

        <div>
          <h1 className="text-4xl font-heading font-black uppercase tracking-wide mb-4 text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Your gear is preparing for deployment. We've sent a confirmation email with your order details.
          </p>
          
          <div className="bg-card border border-border rounded-xl p-4 inline-flex items-center gap-4 mb-8">
            <Package className="w-6 h-6 text-primary" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Order Number</div>
              <div className="font-mono text-lg font-bold text-foreground">{orderNumber}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8">
              Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
