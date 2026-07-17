import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ShoppingCart, Heart, GitCompare, Eye, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/utils/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.error("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      toast.error("Removed from compare");
    } else {
      addToCompare(product);
      toast.success("Added to compare!");
    }
  };

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("group relative", className)}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <div
          className="relative h-full bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          style={{
            transform: "translateZ(0px)",
            boxShadow: isHovered
              ? "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px hsl(var(--primary)/0.2)"
              : "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted/30">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4 transition-transform duration-500"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, -2, 2, -1, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Quick action buttons overlay */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg",
                  inWishlist
                    ? "bg-destructive/20 text-destructive border border-destructive/30"
                    : "bg-background/60 text-foreground/70 border border-border/50 hover:bg-background/80"
                )}
              >
                <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleCompare}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg",
                  inCompare
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "bg-background/60 text-foreground/70 border border-border/50 hover:bg-background/80"
                )}
              >
                <GitCompare className="w-4 h-4" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-background/60 text-foreground/70 border border-border/50 backdrop-blur-md hover:bg-background/80 transition-all shadow-lg cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
              {product.discount > 0 && (
                <Badge variant="destructive" className="text-[10px] px-2 py-0.5 font-bold shadow-lg">
                  -{product.discount}%
                </Badge>
              )}
              {product.isNew && (
                <Badge variant="default" className="text-[10px] px-2 py-0.5 font-bold shadow-lg bg-primary/90">
                  NEW
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="text-[10px] px-2 py-0.5 font-bold shadow-lg bg-amber-500/90 text-white">
                  BESTSELLER
                </Badge>
              )}
            </div>

            {/* Quick add to cart overlay */}
            <motion.div
              className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                className="w-full h-9 text-xs font-bold gap-1.5 shadow-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {product.inStock ? "Quick Add" : "Out of Stock"}
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground/50">({product.reviews})</span>
              </div>
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-lg text-foreground">
                  {formatINR(product.price)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              {!product.inStock && (
                <span className="text-[10px] font-bold text-destructive uppercase">Sold Out</span>
              )}
            </div>
          </div>

          {/* Glare effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: isHovered
                ? "radial-gradient(circle at 50% 0%, hsla(var(--primary)/0.08) 0%, transparent 60%)"
                : "none",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}