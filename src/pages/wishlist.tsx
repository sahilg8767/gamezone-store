import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { formatINR } from "@/utils/format";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center"
      >
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wide mb-4">Your Wishlist is Empty</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Save your favorite gear here while you decide. Build your dream setup over time.
        </p>
        <Link href="/products">
          <Button size="lg" className="h-12 px-8 text-lg">
            Discover Gear
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
        My Wishlist <Heart className="w-8 h-8 text-primary fill-primary" />
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {wishlistItems.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group relative"
            >
              <button 
                onClick={() => {
                  removeFromWishlist(product.id);
                  toast.info("Removed from wishlist");
                }}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <Link href={`/products/${product.id}`} className="aspect-square bg-muted/20 relative block">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover p-4 mix-blend-multiply dark:mix-blend-normal" />
              </Link>
              
              <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-primary font-bold uppercase mb-1">{product.brand}</div>
                <Link href={`/products/${product.id}`} className="font-bold hover:text-primary transition-colors line-clamp-2 mb-2 flex-1">
                  {product.name}
                </Link>
                <div className="font-heading font-black text-xl mb-4">
                  {formatINR(product.price)}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                    toast.success("Moved to cart!");
                  }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? "Move to Cart" : "Out of Stock"}
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
