import { motion } from "framer-motion";
import { GitCompare, X, Check } from "lucide-react";
import { Link } from "wouter";
import { formatINR } from "@/utils/format";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";

export default function Compare() {
  const { compareItems, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center"
      >
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <GitCompare className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wide mb-4">Nothing to Compare</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          Add up to 4 products to compare their specs side-by-side and find the perfect gear.
        </p>
        <Link href="/products">
          <Button size="lg" className="h-12 px-8 text-lg">
            Find Products
          </Button>
        </Link>
      </motion.div>
    );
  }

  // All unique spec keys across selected products
  const allSpecKeys = Array.from(
    new Set(compareItems.flatMap((item) => Object.keys(item.specifications)))
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-heading font-black uppercase tracking-wide flex items-center gap-3">
          Compare Gear <GitCompare className="w-8 h-8 text-primary" />
        </h1>
        {compareItems.length < 4 && (
          <Link href="/products">
            <Button variant="outline">Add More ({compareItems.length}/4)</Button>
          </Link>
        )}
      </div>

      <div className="overflow-x-auto pb-8 custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="flex border-b border-border">
            <div className="w-48 shrink-0 p-4 font-bold text-muted-foreground flex items-center">
              Product
            </div>
            {compareItems.map(item => (
              <div key={item.id} className="flex-1 min-w-[250px] p-4 relative flex flex-col border-l border-border/50">
                <button 
                  onClick={() => removeFromCompare(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="aspect-square bg-muted/20 rounded-lg mb-4 p-4 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <Badge variant="outline" className="w-fit mb-2 text-primary border-primary/30">{item.brand}</Badge>
                <h3 className="font-bold line-clamp-2 mb-2 min-h-[40px]">{item.name}</h3>
                <div className="font-heading font-black text-2xl text-foreground mb-4">
                  {formatINR(item.price)}
                </div>
                <Button 
                  className="w-full mt-auto" 
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock}
                >
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            ))}
          </div>

          {/* Rating Row */}
          <div className="flex border-b border-border/50 bg-muted/10">
            <div className="w-48 shrink-0 p-4 font-semibold text-muted-foreground">Rating</div>
            {compareItems.map(item => (
              <div key={item.id} className="flex-1 min-w-[250px] p-4 border-l border-border/50 flex items-center gap-2">
                <StarRating rating={item.rating} />
                <span className="text-sm font-medium">({item.reviews})</span>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div className="flex border-b border-border/50">
            <div className="w-48 shrink-0 p-4 font-semibold text-muted-foreground">Availability</div>
            {compareItems.map(item => (
              <div key={item.id} className="flex-1 min-w-[250px] p-4 border-l border-border/50">
                {item.inStock ? (
                  <span className="flex items-center gap-1 text-green-500 font-medium text-sm">
                    <Check className="w-4 h-4" /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-destructive font-medium text-sm">
                    <X className="w-4 h-4" /> Out of Stock
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Specs Rows */}
          {allSpecKeys.map((key, index) => (
            <div key={key} className={`flex border-b border-border/50 ${index % 2 === 0 ? "bg-muted/10" : ""}`}>
              <div className="w-48 shrink-0 p-4 font-semibold text-muted-foreground capitalize">
                {key}
              </div>
              {compareItems.map(item => (
                <div key={item.id} className="flex-1 min-w-[250px] p-4 border-l border-border/50 text-sm">
                  {item.specifications[key] || "—"}
                </div>
              ))}
            </div>
          ))}

          {/* Key Features List */}
          <div className="flex border-b border-border/50 bg-muted/10">
            <div className="w-48 shrink-0 p-4 font-semibold text-muted-foreground">Key Features</div>
            {compareItems.map(item => (
              <div key={item.id} className="flex-1 min-w-[250px] p-4 border-l border-border/50">
                <ul className="space-y-2 text-sm">
                  {item.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
