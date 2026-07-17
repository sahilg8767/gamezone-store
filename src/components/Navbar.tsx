import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Search, ShoppingCart, Heart, GitCompare, Menu, X, 
  Sun, Moon, User, LayoutGrid, Gamepad2, Headphones, Monitor
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useTheme } from "@/context/ThemeContext";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { theme, toggleTheme } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { products } = useProducts({ search: searchQuery });
  const suggestions = products.slice(0, 5);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Keyboards", href: "/products?category=Gaming%20Keyboards" },
    { label: "Mice", href: "/products?category=Gaming%20Mice" },
    { label: "Headsets", href: "/products?category=Gaming%20Headsets" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm" 
          : "bg-background border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4 lg:w-[250px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-xl font-heading font-bold uppercase tracking-wider text-primary mb-6">
                GameZone
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 group/logo">
            <motion.div
              whileHover={{ 
                rotateY: 360, 
                scale: 1.15,
                filter: "drop-shadow(0 0 8px hsl(var(--primary)))" 
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Gamepad2 className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.span 
              whileHover={{ 
                scale: 1.05, 
              }}
              className="hidden sm:inline-block text-2xl font-black tracking-widest font-heading uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
            >
              GameZone
            </motion.span>
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xl relative">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search gear, brands, categories..."
              className="w-full pl-10 pr-4 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary rounded-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </form>
          
          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-popover border rounded-xl shadow-lg overflow-hidden flex flex-col z-50">
              {suggestions.map((p) => (
                <Link 
                  key={p.id} 
                  href={`/products/${p.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-0"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded bg-muted" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 lg:w-[250px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme} 
                className="hidden sm:flex hover:scale-115 hover:text-primary transition-transform duration-200"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/compare" className="relative hidden sm:flex hover:scale-115 transition-transform duration-200">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <GitCompare className="h-5 w-5" />
                </Button>
                {compareCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground rounded-full text-xs">
                    {compareCount}
                  </Badge>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Compare Gear
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/wishlist" className="relative hidden sm:flex hover:scale-115 transition-transform duration-200">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Heart className="h-5 w-5" />
                </Button>
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground rounded-full text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Wishlist
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/cart" className="relative hover:scale-115 transition-transform duration-200">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground rounded-full text-xs animate-in zoom-in">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Cart
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden sm:flex hover:scale-115 hover:text-primary transition-transform duration-200">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Account
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-8 h-12 text-sm font-medium">
            <Link href="/products" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <LayoutGrid className="w-4 h-4" /> All Products
            </Link>
            {navLinks.slice(2).map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
