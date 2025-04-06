import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EVENTS', href: '#events' },
  { name: 'TEAM', href: '#team' },
  { name: 'CONTACT', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          if (sectionId) {
            setActiveItem(navLinks.findIndex(link => link.name === sectionId.replace('-', ' ')));
          }
        }
      });
      
      // If at top of page, set home as active
      if (window.scrollY < 100) {
        setActiveItem(null);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call handleScroll on initial load to set initial active link
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2 border-b border-gray-100' 
          : 'bg-black/40 backdrop-blur-md py-5'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Retro Border Effect */}
        <div className="relative">
          <motion.div 
            className="absolute inset-0 bg-black border-2 border-red-500"
            animate={{
              borderColor: ['rgba(255,0,0,0.5)', 'rgba(255,0,0,1)', 'rgba(255,0,0,0.5)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/5 to-transparent bg-size-200 animate-scan" />

          {/* Navigation Items */}
          <div className="relative flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <motion.div 
              className="text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <a href="/">
                <span className="text-white">DATA</span>
                <span className="text-red-500">ZEN</span>
              </a>
            </motion.div>

            {/* Menu Items */}
            <div className="flex space-x-8">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  onHoverStart={() => setActiveItem(index)}
                  onHoverEnd={() => setActiveItem(null)}
                >
                  <a href={item.href}>
                    <motion.span 
                      className={`text-sm font-bold tracking-wider ${activeItem === index ? 'text-red-500' : 'text-white'}`}
                      whileHover={{ x: 5 }}
                    >
                      {item.name}
                    </motion.span>
                  </a>
                  
                  {/* Hover Indicator */}
                  {activeItem === index && (
                    <motion.div
                      className="absolute -left-4 top-1/2 -translate-y-1/2 text-red-500"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▶
                    </motion.div>
                  )}

                  {/* Bottom Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeItem === index ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Power Indicator */}
            <motion.div
              className="w-2 h-2 rounded-full bg-red-500"
              animate={{
                backgroundColor: ['#ff0000', '#ff6666', '#ff0000'],
                boxShadow: [
                  '0 0 5px #ff0000',
                  '0 0 10px #ff0000',
                  '0 0 5px #ff0000'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <motion.button 
        className="md:hidden focus:outline-none z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-8 h-8 flex items-center justify-center relative">
          <span 
            className={`block w-6 h-0.5 absolute transition-all duration-300 ${
              mobileMenuOpen 
                ? 'rotate-45 bg-white' 
                : `-translate-y-1.5 ${isScrolled ? 'bg-black' : 'bg-white'}`
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 absolute transition-all duration-300 ${
              mobileMenuOpen 
                ? 'opacity-0 bg-white' 
                : `opacity-100 ${isScrolled ? 'bg-black' : 'bg-white'}`
            }`}
          ></span>
          <span 
            className={`block w-6 h-0.5 absolute transition-all duration-300 ${
              mobileMenuOpen 
                ? '-rotate-45 bg-white' 
                : `translate-y-1.5 ${isScrolled ? 'bg-black' : 'bg-white'}`
            }`}
          ></span>
        </div>
      </motion.button>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-gradient-to-b from-black to-red-900/90 backdrop-blur-md flex flex-col items-center justify-center md:hidden z-40"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 32px) 32px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 32px) 32px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 32px) 32px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex flex-col items-center space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navLinks.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-gray-200 text-2xl font-semibold transition-colors relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  {item.name}
                  <motion.span 
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-white origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 text-white/60 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <p>© {new Date().getFullYear()} Datazen</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar; 