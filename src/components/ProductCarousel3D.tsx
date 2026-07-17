import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export function ProductCarousel3D({ products }: { products: Product[] }) {
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
    setAutoplayKey((k) => k + 1);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
    setAutoplayKey((k) => k + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000); // Auto-spin every 4 seconds
    return () => clearInterval(interval);
  }, [autoplayKey, products.length]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] flex flex-col items-center justify-center overflow-hidden py-10 bg-muted/10 border-y border-border/50">
      {/* Radial neon glow behind the 3D stage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_60%)] opacity-5 pointer-events-none" />

      <div className="text-center mb-6 z-10">
        <h2 className="text-3xl font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2">
          ⚡ 3D Gear Showcase
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Click the arrows to spin the 3D display ring</p>
      </div>

      {/* 3D Scene Wrapper */}
      <div 
        className="relative w-full max-w-[800px] h-[340px] flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        {/* Carousel Ring */}
        <div 
          className="relative w-[240px] h-[300px] transition-transform duration-700"
          style={{ 
            transformStyle: "preserve-3d",
            transform: `rotateY(${-activeIndex * (360 / products.length)}deg)`
          }}
        >
          {products.map((product, idx) => {
            const angle = idx * (360 / products.length);
            const isSelected = idx === activeIndex;

            return (
              <div
                key={product.id}
                className="absolute inset-0 bg-card border border-border rounded-2xl p-4 flex flex-col justify-between transition-all duration-500 shadow-xl"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(280px)`,
                  opacity: isSelected ? 1 : 0.4,
                  scale: isSelected ? 1.05 : 0.9,
                  boxShadow: isSelected ? "0 0 25px rgba(var(--primary), 0.15)" : "none",
                  borderColor: isSelected ? "hsl(var(--primary))" : "hsl(var(--border))",
                  backfaceVisibility: "hidden",
                  pointerEvents: isSelected ? "auto" : "none",
                }}
              >
                <Link href={`/products/${product.id}`} className="flex-grow flex flex-col justify-between h-full group">
                  <div className="relative aspect-square w-full rounded-xl bg-muted/10 overflow-hidden flex items-center justify-center p-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="mt-3 flex-grow flex flex-col justify-end">
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">{product.brand}</span>
                    <h3 className="font-bold text-sm line-clamp-1 mt-0.5">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="font-heading font-black text-lg text-foreground">{formatINR(product.price)}</span>
                      <Button 
                        size="sm" 
                        className="h-8 px-3 text-xs"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <button 
        onClick={prev}
        className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg z-30"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg z-30"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
