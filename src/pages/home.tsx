import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Zap, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { products as allProducts } from "@/data/products";
import { Card3D } from "@/components/ui/Card3D";
import { Scroll3D } from "@/components/ui/Scroll3D";
import { ProductCarousel3D } from "@/components/ProductCarousel3D";
import { Hero3DScene } from "@/components/Hero3D";

const CATEGORIES = [
  { name: "Gaming Keyboards", icon: "⌨️", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80" },
  { name: "Gaming Mice", icon: "🖱️", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80" },
  { name: "Gaming Headsets", icon: "🎧", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" },
  { name: "Gaming Chairs", icon: "💺", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&q=80" },
  { name: "Monitors", icon: "🖥️", image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=300&q=80" },
  { name: "Controllers", icon: "🎮", image: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=300&q=80" },
];

const BRANDS = ["Logitech", "Razer", "SteelSeries", "Corsair", "HyperX", "ASUS ROG"];

export default function Home() {
  const { products: trendingProducts } = useProducts({ sort: "best_selling" });

  // Countdown timer logic for deals
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-16 pb-16"
    >
      {/* Hero Section with 3D Scene & Carousel */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
        {/* 3D Background Scene */}
        <div className="absolute inset-0 z-0">
          <Hero3DScene />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Premium Gaming Gear Store
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight uppercase leading-none mb-6"
            >
              Level Up Your
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Battlestation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
            >
              Discover the latest gaming gear from top brands. Performance-tested,
              pro-approved, and built to win.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products">
                <Button size="lg" className="h-12 px-8 text-lg font-bold shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all">
                  Shop Now <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/products?category=Gaming%20Keyboards">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg font-bold border-2">
                  View Keyboards <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-8 mt-12"
            >
              {[
                { value: "500+", label: "Products" },
                { value: "50K+", label: "Happy Gamers" },
                { value: "4.9", label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* 3D Gear Showcase Ring */}
      <ProductCarousel3D products={trendingProducts.slice(0, 5)} />

      {/* Featured Categories */}
      <Scroll3D>
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold uppercase tracking-wide flex items-center gap-2">
              <Zap className="text-primary w-6 h-6" /> Categories
            </h2>
            <Link href="/products" className="text-primary hover:underline text-sm font-medium flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}>
                <Card3D className="h-full" maxRotation={8}>
                  <div
                    className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-card border border-border flex items-center justify-center text-center p-4 h-full"
                  >
                    <div className="absolute inset-0 bg-black/60 z-10 transition-opacity group-hover:bg-black/40" />
                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="relative z-20 flex flex-col items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                      <span className="text-4xl filter drop-shadow-md">{cat.icon}</span>
                      <span className="font-bold text-white tracking-wide">{cat.name}</span>
                    </div>
                  </div>
                </Card3D>
              </Link>
            ))}
          </div>
        </section>
      </Scroll3D>

      {/* Gaming Deals (Countdown) */}
      <Scroll3D>
        <section className="bg-muted/30 py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Card3D className="w-full md:w-1/3" maxRotation={8}>
                <div className="bg-card border border-border rounded-xl p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-bold mb-4">
                      <Flame className="w-4 h-4" /> FLASH SALE
                    </div>
                    <h2 className="text-4xl font-heading font-black uppercase leading-tight mb-4">
                      Level Up Your <br /><span className="text-primary">Battlestation</span>
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Epic deals on top-tier gear. Don't miss out on these limited-time offers to upgrade your setup.
                    </p>

                    <div className="flex gap-4 mb-8">
                      <div className="flex flex-col items-center justify-center bg-background border border-border rounded-lg w-16 h-16 shadow-lg">
                        <span className="text-2xl font-bold font-mono text-primary">{String(timeLeft.h).padStart(2, '0')}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">Hours</span>
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground flex items-center">:</div>
                      <div className="flex flex-col items-center justify-center bg-background border border-border rounded-lg w-16 h-16 shadow-lg">
                        <span className="text-2xl font-bold font-mono text-primary">{String(timeLeft.m).padStart(2, '0')}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">Mins</span>
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground flex items-center">:</div>
                      <div className="flex flex-col items-center justify-center bg-background border border-border rounded-lg w-16 h-16 shadow-lg">
                        <span className="text-2xl font-bold font-mono text-primary">{String(timeLeft.s).padStart(2, '0')}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">Secs</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/products?sort=price_asc">
                    <Button size="lg" className="w-full sm:w-auto mt-4">Shop All Deals</Button>
                  </Link>
                </div>
              </Card3D>

              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allProducts.filter(p => p.discount > 20).slice(0, 2).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Scroll3D>

      {/* Trending / Best Sellers */}
      <Scroll3D>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold uppercase tracking-wide mb-8 flex items-center gap-2">
            🔥 Trending Gear
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Scroll3D>

      {/* Featured Brands */}
      <Scroll3D>
        <section className="container mx-auto px-4 pt-8">
          <h2 className="text-xl font-heading font-bold text-center uppercase tracking-widest text-muted-foreground mb-8">
            Trusted By Champions
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
            {BRANDS.map(brand => (
              <div key={brand} className="text-xl md:text-3xl font-black tracking-tighter uppercase grayscale transition-all hover:grayscale-0 hover:opacity-100 hover:text-primary cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </section>
      </Scroll3D>

    </motion.div>
  );
}
