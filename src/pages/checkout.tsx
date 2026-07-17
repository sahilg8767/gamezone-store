import { useState } from "react";
import { useLocation } from "wouter";
import { formatINR } from "@/utils/format";
import { motion } from "framer-motion";
import { Check, CreditCard, Wallet, Smartphone, Building } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // If someone navigates to checkout with empty cart, send them back
  if (cartItems.length === 0 && !isProcessing) {
    setLocation("/cart");
    return null;
  }

  const shipping = cartTotal > 0 && cartTotal < 100 ? 9.99 : 0;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      setLocation("/order-success");
      toast.success("Order placed successfully!");
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-12 max-w-6xl"
    >
      <h1 className="text-4xl font-heading font-black uppercase tracking-wide mb-8">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Forms */}
        <div className="lg:col-span-2 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span> 
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="bg-background" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required className="bg-background" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required className="bg-background" />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span> 
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Postal Code</Label>
                  <Input id="zip" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" required className="bg-background" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">3</span> 
                Payment Method
              </h2>
              
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                  <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><CreditCard className="w-4 h-4 mr-2 hidden sm:block" /> Card</TabsTrigger>
                  <TabsTrigger value="paypal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Wallet className="w-4 h-4 mr-2 hidden sm:block" /> PayPal</TabsTrigger>
                  <TabsTrigger value="applepay" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Smartphone className="w-4 h-4 mr-2 hidden sm:block" /> Apple Pay</TabsTrigger>
                  <TabsTrigger value="bank" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Building className="w-4 h-4 mr-2 hidden sm:block" /> Bank</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" required className="bg-background" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" required className="bg-background" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="exp">Expiry Date</Label>
                      <Input id="exp" required className="bg-background" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" required className="bg-background" placeholder="123" type="password" maxLength={4} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="paypal" className="p-4 border border-dashed rounded-lg text-center">
                  <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                </TabsContent>
                <TabsContent value="applepay" className="p-4 border border-dashed rounded-lg text-center">
                  <p className="text-muted-foreground mb-4">You will be prompted to authenticate with Apple Pay.</p>
                </TabsContent>
                <TabsContent value="bank" className="p-4 border border-dashed rounded-lg text-center">
                  <p className="text-muted-foreground mb-4">Direct bank transfer details will be provided on the next page.</p>
                </TabsContent>
              </Tabs>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-heading font-bold uppercase tracking-wide mb-6">In Your Cart</h3>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 shrink-0 bg-muted rounded border border-border overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-medium text-sm line-clamp-1">{item.name}</span>
                    <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                    <span className="font-bold text-sm mt-auto text-primary">{formatINR(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-6" />

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{formatINR(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-bold">{formatINR(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-bold">{shipping === 0 ? "Free" : formatINR(shipping)}</span>
              </div>
            </div>

            <Separator className="mb-6" />

            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-heading font-black text-foreground">
                {formatINR(finalTotal)}
              </span>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              size="lg" 
              className="w-full h-14 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] relative overflow-hidden group"
              disabled={isProcessing}
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  Place Order <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-green-500" /> 100% Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
