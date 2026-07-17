import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "wouter";
import { formatINR } from "@/utils/format";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, GitCompare, Check, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/StarRating";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductCard } from "@/components/ProductCard";
import { Card3D } from "@/components/ui/Card3D";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { getProductById, products: allProducts } = useProducts();
  const { addRecentlyViewed } = useRecentlyViewed();
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const product = id ? getProductById(id) : undefined;

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      window.scrollTo(0, 0);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Product Not Found</h2>
        <p className="text-muted-foreground mb-8">The gear you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6">
        <Breadcrumb items={[
          { label: "Products", href: "/products" },
          { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
          { label: product.name }
        ]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="flex flex-col gap-4">
          <Card3D maxRotation={8} glareOpacity={0.15}>
            <div 
              className="relative aspect-square rounded-xl border border-border bg-card overflow-hidden cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 z-20 bg-destructive text-destructive-foreground text-lg px-3 py-1 no-default-hover-elevate">
                  {product.discount}% OFF
                </Badge>
              )}
              
              <img 
                src={product.image} 
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? "scale-[2]" : "scale-100"}`}
                style={isZoomed ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                } : undefined}
              />
            </div>
          </Card3D>
          {/* Thumbnails (Simulated) */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((_, i) => (
              <button key={i} className={`w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${i === 0 ? "border-primary" : "border-border opacity-50 hover:opacity-100"}`}>
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="text-sm text-primary font-bold tracking-widest uppercase mb-2">
            {product.brand}
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black mb-4 uppercase leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm hover:text-primary cursor-pointer transition-colors">
              ({product.reviews} reviews)
            </span>
            <div className="h-4 w-px bg-border"></div>
            <span className={`text-sm font-bold flex items-center gap-1 ${product.inStock ? "text-green-500" : "text-destructive"}`}>
              {product.inStock ? <><Check className="w-4 h-4" /> In Stock</> : "Out of Stock"}
            </span>
          </div>

          <div className="flex flex-col mb-8">
            {product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through decoration-destructive decoration-2">
                {formatINR(product.originalPrice)}
              </span>
            )}
            <span className="text-4xl font-heading font-black text-foreground">
              {formatINR(product.price)}
            </span>
          </div>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <Separator className="mb-8" />

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-input rounded-md bg-card">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-12 w-12 rounded-none"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="w-12 text-center font-bold text-lg">{quantity}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="h-12 w-12 rounded-none"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              size="lg" 
              className="flex-1 h-12 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all"
              onClick={() => {
                addToCart(product, quantity);
                toast.success(`${quantity} x ${product.name} added to cart!`);
              }}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                if (inWishlist) {
                  removeFromWishlist(product.id);
                  toast.info("Removed from wishlist");
                } else {
                  addToWishlist(product);
                  toast.success("Added to wishlist");
                }
              }}
            >
              <Heart className={`w-4 h-4 mr-2 ${inWishlist ? "fill-primary text-primary" : ""}`} />
              {inWishlist ? "Wishlisted" : "Add to Wishlist"}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                if (inCompare) {
                  removeFromCompare(product.id);
                } else {
                  addToCompare(product);
                }
              }}
            >
              {inCompare ? <Check className="w-4 h-4 mr-2 text-primary" /> : <GitCompare className="w-4 h-4 mr-2" />}
              {inCompare ? "In Compare" : "Compare"}
            </Button>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-muted/30 rounded-xl border border-border">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Free Shipping<br/><span className="text-xs text-muted-foreground">over $100</span></span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">2 Year Warranty<br/><span className="text-xs text-muted-foreground">on all products</span></span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">30-Day Returns<br/><span className="text-xs text-muted-foreground">hassle free</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section: Features & Specs */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card3D maxRotation={4} glareOpacity={0.08}>
            <div className="bg-card border border-border rounded-xl p-8 h-full">
              <h3 className="text-2xl font-heading font-bold uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded"></span> Key Features
              </h3>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 text-primary p-1 rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card3D>
          
          <Card3D maxRotation={4} glareOpacity={0.08}>
            <div className="bg-card border border-border rounded-xl p-8 h-full">
              <h3 className="text-2xl font-heading font-bold uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-accent rounded"></span> Specifications
              </h3>
              <div className="border border-border rounded-xl overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], i) => (
                  <div key={key} className={`flex py-3 px-4 ${i % 2 === 0 ? "bg-muted/30" : "bg-card"}`}>
                    <span className="w-1/3 font-medium text-muted-foreground">{key}</span>
                    <span className="w-2/3 text-foreground font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold uppercase mb-8 tracking-wide text-center">
            Complete Your Setup
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Reviews (Simulated) */}
      <div>
        <h2 className="text-3xl font-heading font-bold uppercase mb-8 tracking-wide flex items-center gap-2">
          Customer Reviews <Badge className="ml-2 text-lg">{product.reviews}</Badge>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-card border border-border p-6 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                    U{i}
                  </div>
                  <div>
                    <div className="font-bold">Verified Gamer {i}</div>
                    <div className="text-xs text-muted-foreground">2 weeks ago</div>
                  </div>
                </div>
                <StarRating rating={5} />
              </div>
              <h4 className="font-bold mb-2">Absolute Game Changer</h4>
              <p className="text-muted-foreground text-sm">
                Upgraded from a budget alternative and the difference is night and day. Build quality is premium and performance is exactly as advertised. Highly recommend for any serious setup.
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
