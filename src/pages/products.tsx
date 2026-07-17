import { useState, useMemo, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, FilterX, Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useProducts, FilterParams } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkeletonCard } from "@/components/SkeletonCard";

const CATEGORIES = [
  "Gaming Keyboards", "Gaming Mice", "Gaming Headsets", 
  "Gaming Chairs", "Controllers", "Monitors", 
  "Mouse Pads", "Microphones", "Webcams", "Streaming Equipment"
];

const BRANDS = ["Logitech", "Razer", "SteelSeries", "Corsair", "HyperX", "ASUS ROG", "MSI", "BenQ", "Elgato"];

export default function Products() {
  const [location] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  const initialCategory = searchParams.get("category") || undefined;
  const initialSearch = searchParams.get("search") || undefined;
  const initialSort = searchParams.get("sort") as FilterParams["sort"] || undefined;

  const [filters, setFilters] = useState<FilterParams>({
    category: initialCategory,
    search: initialSearch,
    sort: initialSort,
    minPrice: 0,
    maxPrice: 1000,
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Whenever URL params change, update filters
  useEffect(() => {
    const params = new URLSearchParams(search);
    setFilters(prev => ({
      ...prev,
      category: params.get("category") || undefined,
      search: params.get("search") || undefined,
    }));
    setPage(1);
  }, [search]);

  const { products, allProducts } = useProducts(filters);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, [filters, page]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, page]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleFilterChange = (key: keyof FilterParams, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // reset to first page on filter
  };

  const clearFilters = () => {
    setFilters({ minPrice: 0, maxPrice: 1000 });
    setPage(1);
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== undefined && v !== "").length - 2; // -2 for min/max price default

  const SidebarContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg uppercase tracking-wide">Filters</h3>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8 text-muted-foreground">
            <FilterX className="w-3 h-3 mr-2" /> Clear
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Category</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {CATEGORIES.map(cat => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={filters.category === cat}
                onCheckedChange={(checked) => handleFilterChange('category', checked ? cat : undefined)}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Brand</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {BRANDS.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox 
                id={`brand-${brand}`} 
                checked={filters.brand === brand}
                onCheckedChange={(checked) => handleFilterChange('brand', checked ? brand : undefined)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Price Range</h4>
        <Slider 
          defaultValue={[0, 1000]} 
          max={1000} 
          step={10}
          value={[filters.minPrice || 0, filters.maxPrice || 1000]}
          onValueChange={([min, max]) => {
            setFilters(prev => ({...prev, minPrice: min, maxPrice: max}));
          }}
          className="mt-6"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>₹{((filters.minPrice || 0) * 83).toLocaleString("en-IN")}</span>
          <span>₹{((filters.maxPrice || 1000) * 83).toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Availability</h4>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="in-stock" 
            checked={filters.inStock || false}
            onCheckedChange={(checked) => handleFilterChange('inStock', checked ? true : undefined)}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase tracking-wide">
            {filters.category || filters.search ? (
              <span className="flex items-center gap-3">
                Results for <span className="text-primary">{filters.category || `"${filters.search}"`}</span>
              </span>
            ) : "All Gear"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Showing {paginatedProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1 rounded-sm bg-primary/20 text-primary">{activeFilterCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left font-heading uppercase">Filters</SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <Select value={filters.sort || "featured"} onValueChange={(val: any) => handleFilterChange('sort', val !== "featured" ? val : undefined)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating_desc">Highest Rated</SelectItem>
              <SelectItem value="best_selling">Best Selling</SelectItem>
              <SelectItem value="new_arrivals">New Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-[240px] shrink-0 border-r border-border pr-6">
          <SidebarContent />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border rounded-xl bg-card border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                We couldn't find any gear matching your current filters. Try adjusting your search criteria or clearing filters.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-10">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1 mx-4">
                    {[...Array(totalPages)].map((_, i) => {
                      // Simple pagination display logic
                      if (totalPages > 7 && i > 1 && i < totalPages - 2 && i !== page - 1) {
                        if (i === 2) return <span key={i} className="px-2">...</span>;
                        return null;
                      }
                      return (
                        <Button
                          key={i}
                          variant={page === i + 1 ? "default" : "ghost"}
                          size="icon"
                          className={`w-10 h-10 ${page === i + 1 ? "bg-primary text-primary-foreground" : ""}`}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      );
                    })}
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
