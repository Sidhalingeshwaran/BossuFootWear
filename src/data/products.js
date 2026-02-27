// Product data for Bossu Footwear
// Each product has 2 images, available sizes, stock per size, MRP & offer price

const PRODUCTS = [
  // ===== MEN =====
  {
    id: 1,
    name: 'Royal Oxford Classic',
    type: 'Formals',
    category: 'Men',
    mrp: 4498,
    price: 3499,
    description: 'Premium handcrafted leather oxford shoes with brogue detailing. Perfect for formal occasions and business meetings.',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613987876445-fcb353cd8e27?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 5, 7: 8, 8: 12, 9: 10, 10: 6 }
  },
  {
    id: 2,
    name: 'Urban Runner Pro',
    type: 'Sneakers',
    category: 'Men',
    mrp: 3798,
    price: 2799,
    description: 'Lightweight mesh sneakers with premium cushioned sole. Designed for everyday comfort and street style.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 3, 7: 10, 8: 15, 9: 12, 10: 8 }
  },
  {
    id: 3,
    name: 'Baggy Street King',
    type: 'Baggy Shoes',
    category: 'Men',
    mrp: 3198,
    price: 2299,
    description: 'Oversized baggy silhouette streetwear shoes with chunky sole and breathable upper. A bold statement piece.',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 0, 7: 5, 8: 9, 9: 7, 10: 4 }
  },
  {
    id: 4,
    name: 'Comfort Cloud Slides',
    type: 'Sliders',
    category: 'Men',
    mrp: 1798,
    price: 899,
    description: 'Ultra-soft EVA foam slides with textured footbed for maximum comfort. Ideal for casual outings and home relaxation.',
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 20, 7: 25, 8: 30, 9: 20, 10: 15 }
  },
  {
    id: 5,
    name: 'Heritage Leather Sandals',
    type: 'Sandals',
    category: 'Men',
    mrp: 2598,
    price: 1599,
    description: 'Classic leather sandals with adjustable straps and cushioned insole. Timeless design with a modern edge.',
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 8, 7: 12, 8: 10, 9: 6, 10: 4 }
  },

  // ===== WOMEN =====
  {
    id: 6,
    name: 'Elegance Stiletto',
    type: 'Formals',
    category: 'Women',
    mrp: 4998,
    price: 3999,
    description: 'Sophisticated formal heels crafted from premium leather. Features a comfortable block heel and elegant pointed toe.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&h=600&fit=crop'
    ],
    sizes: { 5: 6, 6: 10, 7: 8, 8: 6, 9: 4, 10: 2 }
  },
  {
    id: 7,
    name: 'Blossom Sneaker',
    type: 'Sneakers',
    category: 'Women',
    mrp: 3498,
    price: 2599,
    description: 'Stylish women\'s sneakers with floral accents and memory foam insole. Perfect blend of fashion and comfort.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop'
    ],
    sizes: { 5: 8, 6: 12, 7: 15, 8: 10, 9: 8, 10: 3 }
  },
  {
    id: 8,
    name: 'Velvet Comfort Slippers',
    type: 'Slippers',
    category: 'Women',
    mrp: 1698,
    price: 799,
    description: 'Plush velvet indoor slippers with anti-slip sole. Wrapped in luxury for your home comfort.',
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&h=600&fit=crop'
    ],
    sizes: { 5: 10, 6: 18, 7: 20, 8: 15, 9: 10, 10: 5 }
  },
  {
    id: 9,
    name: 'Boho Chic Sandals',
    type: 'Sandals',
    category: 'Women',
    mrp: 2898,
    price: 1899,
    description: 'Handcrafted bohemian-style sandals with beaded straps and cork footbed. Perfect for summer vibes.',
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop'
    ],
    sizes: { 5: 5, 6: 7, 7: 12, 8: 8, 9: 5, 10: 0 }
  },

  // ===== KIDS =====
  {
    id: 10,
    name: 'Little Champ Sneakers',
    type: 'Sneakers',
    category: 'Kids',
    mrp: 2498,
    price: 1499,
    description: 'Colorful lightweight sneakers for active kids. Extra cushioning and easy velcro closure with fun designs.',
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 20, 7: 18, 8: 15, 9: 10, 10: 5 }
  },
  {
    id: 11,
    name: 'Tiny Explorer Sandals',
    type: 'Sandals',
    category: 'Kids',
    mrp: 1898,
    price: 999,
    description: 'Durable kids\' sandals with protective toe cap and adjustable straps. Built for adventure and playtime.',
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 15, 7: 12, 8: 10, 9: 8, 10: 5 }
  },
  {
    id: 12,
    name: 'School Day Formals',
    type: 'Formals',
    category: 'Kids',
    mrp: 2698,
    price: 1799,
    description: 'Smart formal shoes for school and special occasions. Polished faux-leather with comfortable padded insole.',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613987876445-fcb353cd8e27?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 10, 7: 14, 8: 12, 9: 6, 10: 3 }
  },
  {
    id: 13,
    name: 'Splash Proof Sliders',
    type: 'Sliders',
    category: 'Kids',
    mrp: 1598,
    price: 599,
    description: 'Waterproof sliders for kids in vibrant colors. Anti-slip sole for pool and beach safety.',
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 25, 7: 20, 8: 18, 9: 12, 10: 8 }
  },
  {
    id: 14,
    name: 'Chunky Street Baggy',
    type: 'Baggy Shoes',
    category: 'Men',
    mrp: 3898,
    price: 2999,
    description: 'Bold chunky platform baggy shoes with thick soles and oversized tongue. Stand out in the crowd.',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop'
    ],
    sizes: { 6: 2, 7: 6, 8: 8, 9: 5, 10: 3 }
  }
];

export default PRODUCTS;
