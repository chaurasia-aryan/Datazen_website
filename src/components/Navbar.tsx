import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', href: '#' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EVENTS', href: '#events' },
  { name: 'TEAM', href: '#team' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#');
  
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
            setActiveLink('#' + sectionId);
          }
        }
      });
      
      // If at top of page, set home as active
      if (window.scrollY < 100) {
        setActiveLink('#');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call handleScroll on initial load to set initial active link
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2 border-b border-gray-100' 
          : 'bg-black/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="text-xl md:text-2xl font-bold flex items-center"
            initial={{ opacity: 100 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mr-2 flex space-x-1">
              <motion.span 
                className="inline-block w-4 h-4 bg-primary rounded-sm"
                animate={{ 
                  rotate: [0, 180, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              <motion.span 
                className="inline-block w-4 h-4 bg-black rounded-sm"
                animate={{ 
                  rotate: [0, 180, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
            <span className={`font-display ${isScrolled ? 'text-black' : 'text-white'} transition-colors duration-300`}>
              <span className="text-primary">Data</span>zen
            </span>
          </motion.a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.a 
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wider font-medium relative ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                } transition-colors duration-300 hover:text-primary`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    layoutId="navIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
            
            {/* Action Button */}
            <motion.a
              href="#contact"
              className={`px-5 py-2 ${
                isScrolled 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-black hover:text-primary'
              } rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
              }}
              whileTap={{ scale: 0.98 }}
            >
              Menu
            </motion.a>
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
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-gradient-to-b from-black to-primary/90 backdrop-blur-md flex flex-col items-center justify-center md:hidden z-40"
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
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-gray-200 text-2xl font-semibold transition-colors relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    {link.name}
                    <motion.span 
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
                
                <motion.a
                  href="#contact"
                  className="mt-4 px-8 py-3 bg-white text-black rounded-lg font-medium transition-all hover:text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + navLinks.length * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Menu
                </motion.a>
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
      </div>
    </nav>
  );
}

export default Navbar; 