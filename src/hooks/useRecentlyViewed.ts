import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useRecentlyViewed() {
  const [recentlyViewedIds, setRecentlyViewedIds] = useLocalStorage<string[]>("gamezone_recently_viewed", []);

  const addRecentlyViewed = useCallback(
    (productId: string) => {
      setRecentlyViewedIds((prev) => {
        // Avoid state update / reference change if the product is already the first recently viewed item
        if (prev[0] === productId) {
          return prev;
        }
        // Remove if already exists
        const filtered = prev.filter((id) => id !== productId);
        // Add to beginning and take max 10
        return [productId, ...filtered].slice(0, 10);
      });
    },
    [setRecentlyViewedIds]
  );

  return { recentlyViewedIds, addRecentlyViewed };
}
