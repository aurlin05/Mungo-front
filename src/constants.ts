export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  lifestyleImage: string;
  description: string;
  materials: string[];
  isNew?: boolean;
  lowStock?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Nomad Duffel',
    price: 1850,
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    lifestyleImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
    description: 'Handcrafted from premium South African leather. Built for the man who moves different.',
    materials: ['Full-grain Leather', 'Brass Hardware', 'Organic Cotton Lining'],
    isNew: true
  },
  {
    id: '2',
    name: 'Karoo Cuff',
    price: 450,
    category: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    lifestyleImage: 'https://images.unsplash.com/photo-1523260572679-8e2fe2762bf1?auto=format&fit=crop&q=80&w=1200',
    description: 'Minimalist brass cuff inspired by the vast Karoo landscape.',
    materials: ['Solid Brass', 'Hand-polished'],
    lowStock: true
  },
  {
    id: '3',
    name: 'Veld Wallet',
    price: 650,
    category: 'Wallets',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    lifestyleImage: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=1200',
    description: 'Slim profile, maximum character. Ages beautifully with every journey.',
    materials: ['Vegetable-tanned Leather'],
    isNew: true
  },
  {
    id: '4',
    name: 'Table Mountain Belt',
    price: 850,
    category: 'Belts',
    image: 'https://images.unsplash.com/photo-1624222247344-550fbadcd973?auto=format&fit=crop&q=80&w=800',
    lifestyleImage: 'https://images.unsplash.com/photo-1511499767390-a7335958beba?auto=format&fit=crop&q=80&w=1200',
    description: 'Rugged elegance for everyday wear. A staple for the modern explorer.',
    materials: ['Full-grain Leather', 'Antique Brass Buckle']
  },
  {
    id: '5',
    name: 'Cape Chrono',
    price: 2400,
    category: 'Watches',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    lifestyleImage: 'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=1200',
    description: 'Timeless design meets urban utility. Water-resistant and ready for anything.',
    materials: ['Stainless Steel', 'Sapphire Glass', 'Leather Strap'],
    lowStock: true
  }
];

export const CATEGORIES = [
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600', rotation: -2 },
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1523260572679-8e2fe2762bf1?auto=format&fit=crop&q=80&w=600', rotation: 3 },
  { name: 'Wallets', image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=600', rotation: -1 },
  { name: 'Belts', image: 'https://images.unsplash.com/photo-1511499767390-a7335958beba?auto=format&fit=crop&q=80&w=600', rotation: 2 },
  { name: 'Watches', image: 'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=600', rotation: -3 },
];

export const COMMUNITY_IMAGES = [
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
];
