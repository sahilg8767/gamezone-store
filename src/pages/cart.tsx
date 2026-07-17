import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/utils/format";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const shipping = cartTotal > 0 && cartTotal < 100 ? 9.99 : 0;
  const tax = cartTotal * 0.08; // 8% simulated tax
  const finalTotal = cartTotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center"
      >
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wide mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Looks like you haven't added any gear to your cart yet. Gear up for your next victory!
        </p>
        <Link href="/products">
          <Button size="lg" className="h-12 px-8 text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            Explore Gear
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-heading font-black uppercase tracking-wide mb-8 flex items-center gap-3">
        Shopping Cart <span className="text-primary text-xl tracking-normal">({cartItems.length} Items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-card border border-border rounded-xl"
              >
                <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                  <Link href={`/products/${item.id}`} className="shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-bold uppercase">{item.brand}</span>
                    <Link href={`/products/${item.id}`} className="font-bold hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 mt-2 transition-colors w-fit"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 text-left md:text-center font-bold">
                  <span className="md:hidden text-muted-foreground font-normal mr-2">Price:</span>
                  {formatINR(item.price)}
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                  <div className="flex items-center border border-input rounded-md bg-background">
                    <button 
                      className="p-2 hover:bg-muted transition-colors rounded-l-md"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      className="p-2 hover:bg-muted transition-colors rounded-r-md"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 text-left md:text-right font-heading font-bold text-lg text-primary">
                  <span className="md:hidden text-muted-foreground font-normal mr-2 text-base font-sans">Total:</span>
                  {formatINR(item.price * item.quantity)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex justify-between items-center pt-4">
            <Link href="/products" className="text-primary hover:underline text-sm font-medium">
              ← Continue Shopping
            </Link>
            <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-heading font-bold uppercase tracking-wide mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{formatINR(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax (8%)</span>
                <span className="font-bold">{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Shipping</span>
                {shipping === 0 ? (
                  <span className="text-primary font-bold uppercase text-xs tracking-wider">Free</span>
                ) : (
                  <span className="font-bold">{formatINR(shipping)}</span>
                )}
              </div>
              {shipping > 0 && (
                <div className="text-xs text-muted-foreground text-right italic">
                  Add {formatINR(100 - cartTotal)} more for free shipping
                </div>
              )}
            </div>

            <Separator className="mb-6" />

            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-heading font-black text-foreground">
                {formatINR(finalTotal)}
              </span>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" /> Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
