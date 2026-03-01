import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, MessageCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES, COMMUNITY_IMAGES, type Product } from './constants';

export default function App() {
  const [view, setView] = useState<'home' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen grain-overlay overflow-x-hidden selection:bg-mungo-olive selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-mungo-beige/80 backdrop-blur-md py-3 shadow-sm text-mungo-charcoal' : 'text-white'}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMenuOpen(true)} className="hover:opacity-70 transition-opacity p-2">
            <Menu size={20} />
          </button>
          <div className="hidden md:flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
            <button onClick={() => setView('home')} className="hover:text-mungo-olive transition-colors">Shop</button>
            <button className="hover:text-mungo-olive transition-colors">New</button>
            <button className="hover:text-mungo-olive transition-colors">Vibe</button>
            <button className="hover:text-mungo-olive transition-colors">About</button>
          </div>
        </div>
        
        <button onClick={() => setView('home')} className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif italic tracking-tighter hover:scale-105 transition-transform">
          mungo.
        </button>

        <div className="flex items-center gap-6">
          <button onClick={() => setIsCartOpen(true)} className="relative hover:opacity-70 transition-opacity p-2">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-mungo-olive text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile/Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-mungo-charcoal z-[60] p-12 flex flex-col justify-between text-mungo-beige"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8">
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 mt-12">
              {['Shop', 'New Arrivals', 'The Vibe', 'Our Story'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-5xl font-serif italic text-left hover:translate-x-4 transition-transform"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setView('home');
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-6">
              <Instagram size={24} />
              <MessageCircle size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-mungo-offwhite z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif italic">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? (
                  <p className="text-mungo-charcoal/50 italic">Your bag is empty. For now.</p>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-mungo-charcoal/60">R {item.price}</p>
                      </div>
                      <button 
                        onClick={() => setCart(cart.filter((_, idx) => idx !== i))}
                        className="text-xs underline opacity-50 hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-mungo-charcoal/10">
                  <div className="flex justify-between mb-6">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">R {cart.reduce((acc, item) => acc + item.price, 0)}</span>
                  </div>
                  <button className="w-full bg-mungo-charcoal text-mungo-beige py-4 rounded-2xl font-medium hover:bg-mungo-olive transition-colors">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home onProductClick={navigateToProduct} onAddToCart={addToCart} />
            </motion.div>
          ) : (
            <motion.div
              key="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductPage product={selectedProduct!} onBack={() => setView('home')} onAddToCart={addToCart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <button className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle size={28} />
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="w-14 h-14 bg-mungo-charcoal text-mungo-beige rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <ShoppingBag size={24} />
        </button>
      </div>

      <footer className="bg-mungo-charcoal text-mungo-beige py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-6xl font-serif italic mb-6">mungo.</h2>
            <p className="text-mungo-beige/60 max-w-sm mb-8">
              South African inspired. Urban refined. For men who move different.
            </p>
            <div className="flex gap-4">
              <Instagram className="hover:text-mungo-clay cursor-pointer transition-colors" />
              <MessageCircle className="hover:text-mungo-clay cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-mungo-beige/60">
              <li className="hover:text-mungo-beige cursor-pointer">All Products</li>
              <li className="hover:text-mungo-beige cursor-pointer">New Arrivals</li>
              <li className="hover:text-mungo-beige cursor-pointer">Bags</li>
              <li className="hover:text-mungo-beige cursor-pointer">Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-mungo-beige/60">
              <li className="hover:text-mungo-beige cursor-pointer">Shipping</li>
              <li className="hover:text-mungo-beige cursor-pointer">Returns</li>
              <li className="hover:text-mungo-beige cursor-pointer">Contact</li>
              <li className="hover:text-mungo-beige cursor-pointer">FAQ</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-xs text-mungo-beige/40 flex justify-between">
          <p>© 2026 Mungo Accessories. All rights reserved.</p>
          <p>Made in South Africa.</p>
        </div>
      </footer>
    </div>
  );
}

function Home({ onProductClick, onAddToCart }: { onProductClick: (p: Product) => void, onAddToCart: (p: Product) => void }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[110vh] flex items-center px-8 md:px-20 overflow-hidden bg-mungo-charcoal">
        <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Lifestyle" 
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-mungo-beige/60 text-[10px] uppercase tracking-[0.4em] mb-6 block font-bold">Est. 2026 • Cape Town</span>
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-serif italic text-mungo-beige leading-[0.85] mb-10 -ml-1 md:-ml-2">
              It’s a <br />
              <span className="text-stroke hover:text-mungo-beige transition-colors duration-700">mungo</span> thing.
            </h1>
            <p className="text-lg md:text-xl text-mungo-beige/70 mb-12 font-light tracking-wide max-w-md leading-relaxed">
              Crafted for the modern explorer. For the men who move different and travel light.
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <button className="bg-mungo-beige text-mungo-charcoal px-12 py-6 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] flex items-center gap-4 hover:bg-mungo-clay transition-all hover:scale-105 active:scale-95 group">
                Shop the vibe <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="text-mungo-beige text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-60 transition-opacity flex items-center gap-2">
                See what’s new <Plus size={14} />
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-4">
            <div className="w-px h-24 bg-mungo-beige/20" />
            <span className="text-mungo-beige/40 text-[10px] uppercase tracking-[0.3em] vertical-text rotate-180">Scroll to explore</span>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories - More Broken Grid */}
      <section className="py-40 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4">
          {CATEGORIES.map((cat, i) => {
            const spans = [
              "md:col-span-7 md:aspect-[16/9]",
              "md:col-span-5 md:aspect-[4/5] md:mt-32",
              "md:col-span-4 md:aspect-[3/4] md:-mt-20",
              "md:col-span-8 md:aspect-[16/7]",
              "md:col-span-6 md:aspect-[1/1] md:ml-auto md:w-3/4"
            ];
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${spans[i % spans.length]}`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">Collection 01</span>
                  <h3 className="text-5xl font-serif italic text-white leading-none">{cat.name}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The Vibe Section - Overlapping Text */}
      <section className="relative py-60 bg-mungo-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="grid grid-cols-2 md:grid-cols-4 h-full">
            {COMMUNITY_IMAGES.slice(0, 4).map((img, i) => (
              <motion.img 
                key={i} 
                src={img} 
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2 }}
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            ))}
          </div>
        </div>
        <div className="relative z-10 px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-mungo-beige p-12 md:p-24 rounded-3xl max-w-3xl ml-auto shadow-mungo"
          >
            <h2 className="text-6xl md:text-8xl font-serif italic text-mungo-charcoal mb-8 leading-none">
              Made to move <br /> with you.
            </h2>
            <p className="text-mungo-charcoal/70 text-lg mb-12 leading-relaxed">
              Authentic style isn't about standing still. It's about the journey, the coffee, the commute, and everything in between. We build gear that ages with your stories.
            </p>
            <button className="bg-mungo-charcoal text-mungo-beige px-12 py-6 rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-mungo-olive transition-all">
              The Mungo Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products - Refined Carousel */}
      <section className="py-40 overflow-hidden bg-mungo-offwhite">
        <div className="px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span className="text-mungo-olive text-[10px] uppercase tracking-[0.4em] mb-4 block font-bold">Curated Selection</span>
            <h2 className="text-6xl md:text-7xl font-serif italic leading-none">The Essentials</h2>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full border border-mungo-charcoal/10 flex items-center justify-center hover:bg-mungo-charcoal hover:text-white transition-all duration-500">
              <ChevronLeft size={20} />
            </button>
            <button className="w-14 h-14 rounded-full border border-mungo-charcoal/10 flex items-center justify-center hover:bg-mungo-charcoal hover:text-white transition-all duration-500">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-10 px-8 md:px-[calc((100vw-1280px)/2+32px)] overflow-x-auto pb-20 no-scrollbar scroll-smooth">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -15 }}
              className="min-w-[320px] md:min-w-[450px] group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[4/5] bg-mungo-beige rounded-2xl overflow-hidden mb-8 shadow-sm group-hover:shadow-mungo transition-all duration-700">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-mungo-olive text-white text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold">
                      Just Dropped
                    </span>
                  )}
                  {product.lowStock && (
                    <span className="bg-red-500 text-white text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full font-bold">
                      Limited Run
                    </span>
                  )}
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="absolute bottom-8 right-8 w-16 h-16 bg-mungo-beige text-mungo-charcoal rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                  <Plus size={24} />
                </motion.button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-serif italic mb-1 group-hover:text-mungo-olive transition-colors">{product.name}</h3>
                  <p className="text-mungo-charcoal/40 text-[10px] uppercase tracking-widest">{product.category}</p>
                </div>
                <p className="text-xl font-medium">R {product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-32 px-8 bg-mungo-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif italic mb-4">Real ones wear it.</h2>
            <p className="text-mungo-charcoal/60">Tag @mungo_thing to be featured.</p>
          </div>
          
          <div className="columns-2 md:columns-3 gap-6 space-y-6">
            {COMMUNITY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl"
              >
                <img src={img} alt="Community" className="w-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="text-white" size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductPage({ product, onBack, onAddToCart }: { product: Product, onBack: () => void, onAddToCart: (p: Product) => void }) {
  return (
    <div className="pt-40 pb-40 px-8 max-w-7xl mx-auto">
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack} 
        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] mb-16 hover:text-mungo-olive transition-colors group"
      >
        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Images - Staggered Layout */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden bg-mungo-offwhite shadow-mungo"
          >
            <img src={product.lifestyleImage} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          <div className="grid grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[1/1] rounded-2xl overflow-hidden bg-mungo-offwhite shadow-sm"
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-[1/1] rounded-2xl overflow-hidden bg-mungo-charcoal flex flex-col items-center justify-center p-12 text-center"
            >
              <span className="text-mungo-beige/40 text-[8px] uppercase tracking-[0.4em] mb-6 font-bold">Craftsmanship</span>
              <p className="italic font-serif text-2xl text-mungo-beige leading-relaxed">"Built for the journey, not just the destination."</p>
            </motion.div>
          </div>
        </div>

        {/* Details - Sticky & Refined */}
        <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-3 mb-8">
              {product.isNew && <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-mungo-olive text-white px-3 py-1.5 rounded-full">New Arrival</span>}
              {product.lowStock && <span className="text-[8px] font-bold uppercase tracking-[0.2em] bg-red-500 text-white px-3 py-1.5 rounded-full">Limited Run</span>}
            </div>
            
            <h1 className="text-7xl md:text-8xl font-serif italic mb-6 leading-[0.9]">{product.name}</h1>
            <p className="text-4xl text-mungo-charcoal/40 font-light mb-12">R {product.price}</p>
            
            <div className="space-y-8 mb-16">
              <p className="text-xl text-mungo-charcoal/70 leading-relaxed font-light">
                {product.description}
              </p>
              
              <div className="space-y-6">
                <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] text-mungo-charcoal/40">The Build</h4>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map(m => (
                    <span key={m} className="px-5 py-2.5 bg-mungo-offwhite border border-mungo-charcoal/5 rounded-full text-[11px] font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-mungo-charcoal text-mungo-beige py-7 rounded-2xl text-xl font-bold uppercase tracking-[0.2em] hover:bg-mungo-olive transition-all duration-500 flex items-center justify-center gap-4 shadow-xl hover:shadow-mungo active:scale-95"
            >
              Add to Bag <ShoppingBag size={24} />
            </button>

            <div className="mt-20 pt-12 border-t border-mungo-charcoal/10">
              <h4 className="font-bold uppercase text-[10px] tracking-[0.3em] text-mungo-charcoal/40 mb-8">Complete the Vibe</h4>
              <div className="flex gap-6">
                {PRODUCTS.filter(p => p.id !== product.id).slice(0, 2).map(p => (
                  <div key={p.id} className="w-28 group cursor-pointer" onClick={() => onBack()}>
                    <div className="aspect-[4/5] rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest truncate group-hover:text-mungo-olive transition-colors">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-32 pt-32 border-t border-mungo-charcoal/10">
        <h2 className="text-4xl font-serif italic mb-12">What the real ones say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-4">
              <div className="flex gap-1 text-mungo-olive">
                {[1, 2, 3, 4, 5].map(s => <Plus key={s} size={12} />)}
              </div>
              <p className="italic text-mungo-charcoal/80">"Best bag I've ever owned. The leather quality is insane and it just gets better with age."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-mungo-clay" />
                <span className="text-xs font-bold uppercase tracking-widest">Sipho M.</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
