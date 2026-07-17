import { Product } from "@/types";

const categoryImages: Record<string, string[]> = {
  'Gaming Keyboards': [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80',
    'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80',
    'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&q=80',
    'https://images.unsplash.com/photo-1626958011827-435293b47101?w=400&q=80'
  ],
  'Gaming Mice': [
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80',
    'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80',
    'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=400&q=80',
    'https://images.unsplash.com/photo-1617096200743-665e53a9d76d?w=400&q=80'
  ],
  'Gaming Headsets': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80',
    'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80'
  ],
  'Gaming Chairs': [
    'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
    'https://images.unsplash.com/photo-1688647035655-b4618e74e402?w=400&q=80',
    'https://images.unsplash.com/photo-1598550479392-74d4a8c983a5?w=400&q=80'
  ],
  'Controllers': [
    'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80',
    'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80'
  ],
  'Monitors': [
    'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=400&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    'https://images.unsplash.com/photo-1551645121-d1034da75057?w=400&q=80',
    'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=400&q=80'
  ],
  'Mouse Pads': [
    'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=400&q=80',
    'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80'
  ],
  'Microphones': [
    'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&q=80',
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80'
  ],
  'Webcams': [
    'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80',
    'https://images.unsplash.com/photo-1600541519468-4a9121def1b1?w=400&q=80'
  ],
  'Streaming Equipment': [
    'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&q=80',
    'https://images.unsplash.com/photo-1610438235354-a6fa5549e580?w=400&q=80'
  ],
};

const productTemplates = [
  { category: 'Gaming Keyboards', count: 12, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', brands: ['Logitech', 'Razer', 'SteelSeries', 'Corsair', 'HyperX', 'ASUS ROG'] },
  { category: 'Gaming Mice', count: 12, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80', brands: ['Logitech', 'Razer', 'SteelSeries', 'Zowie', 'Corsair'] },
  { category: 'Gaming Headsets', count: 12, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', brands: ['HyperX', 'Sennheiser', 'Corsair', 'Logitech', 'Bose'] },
  { category: 'Gaming Chairs', count: 10, img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80', brands: ['Secretlab', 'DXRacer', 'Corsair'] },
  { category: 'Controllers', count: 10, img: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400&q=80', brands: ['Sony', 'Xbox', 'Razer'] },
  { category: 'Monitors', count: 10, img: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=400&q=80', brands: ['ASUS ROG', 'MSI', 'BenQ', 'LG', 'ViewSonic'] },
  { category: 'Mouse Pads', count: 10, img: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=400&q=80', brands: ['SteelSeries', 'Razer', 'Logitech', 'Corsair'] },
  { category: 'Microphones', count: 8, img: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&q=80', brands: ['Blue Microphones', 'Elgato', 'HyperX'] },
  { category: 'Webcams', count: 8, img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&q=80', brands: ['Logitech', 'Razer', 'Elgato'] },
  { category: 'Streaming Equipment', count: 8, img: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&q=80', brands: ['Elgato', 'Corsair'] },
];

function generateProducts(): Product[] {
  let globalId = 1;
  const products: Product[] = [];
  
  // Seed random deterministically for consistent UI
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  productTemplates.forEach(template => {
    const imagesList = categoryImages[template.category] || [template.img];

    for (let i = 0; i < template.count; i++) {
      const brand = template.brands[i % template.brands.length];
      const isNew = random() > 0.8;
      const isTrending = random() > 0.8;
      const isBestSeller = random() > 0.8;
      const price = Math.floor(random() * 200) + 50 + 0.99;
      const hasDiscount = random() > 0.7;
      const discount = hasDiscount ? Math.floor(random() * 30) + 10 : 0;
      const originalPrice = hasDiscount ? Number((price / (1 - discount / 100)).toFixed(2)) : price;
      const image = imagesList[i % imagesList.length];
      
      products.push({
        id: `prod_${globalId++}`,
        name: `${brand} Pro ${template.category.replace('Gaming ', '')} X${i+1}`,
        brand,
        category: template.category,
        price,
        originalPrice,
        discount,
        rating: Number((random() * 1.5 + 3.5).toFixed(1)),
        reviews: Math.floor(random() * 500) + 10,
        stock: Math.floor(random() * 100),
        inStock: true,
        isNew,
        isBestSeller,
        isTrending,
        description: `Experience the ultimate gaming performance with the ${brand} Pro ${template.category.replace('Gaming ', '')}. Designed for professional gamers and enthusiasts who demand the best.`,
        specifications: {
          'Connectivity': 'Wired / Wireless',
          'Weight': `${Math.floor(random() * 500) + 100}g`,
          'Warranty': '2 Years',
          'RGB': 'Yes'
        },
        features: [
          'Premium build quality for long-lasting durability',
          'Ergonomic design for maximum comfort during long sessions',
          'Customizable RGB lighting synchronized with your gameplay',
          'Ultra-low latency for competitive edge'
        ],
        image: image
      });
    }
  });
  return products;
}

export const products = generateProducts();
