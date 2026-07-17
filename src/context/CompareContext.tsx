import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  compareCount: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useLocalStorage<Product[]>("gamezone_compare", []);

  const addToCompare = (product: Product) => {
    setCompareItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      if (prev.length >= 4) {
        toast.error("You can only compare up to 4 products");
        return prev;
      }
      toast.success("Added to comparison");
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((item) => item.id === productId);
  };

  const compareCount = compareItems.length;

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        compareCount,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
