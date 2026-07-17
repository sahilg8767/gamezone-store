import { useMemo } from "react";
import { products } from "@/data/products";
import { Product } from "@/types";

export interface FilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sort?: "price_asc" | "price_desc" | "rating_desc" | "best_selling" | "new_arrivals";
  search?: string;
}

const DEFAULT_FILTERS: FilterParams = {};

export function useProducts(filters: FilterParams = DEFAULT_FILTERS) {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    if (filters.rating !== undefined) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }
    if (filters.inStock) {
      result = result.filter((p) => p.stock > 0);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters.sort) {
      switch (filters.sort) {
        case "price_asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "rating_desc":
          result.sort((a, b) => b.rating - a.rating);
          break;
        case "best_selling":
          result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
        case "new_arrivals":
          result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }
    }

    return result;
  }, [filters]);

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const getProductsByIds = (ids: string[]): Product[] => {
    return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
  };

  return { products: filteredProducts, getProductById, getProductsByIds, allProducts: products };
}
