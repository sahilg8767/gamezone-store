export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
