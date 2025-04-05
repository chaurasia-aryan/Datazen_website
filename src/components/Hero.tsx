import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Delay the animation slightly for a better entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Calculate the movement for parallax effect
  const calcParallaxMovement = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { x, y };
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-black/10"></div>
      
      {/* Light particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary/20"
            initial={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [null, "100vh"],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>

      {/* Diagonal strips */}
      <motion.div 
        className="absolute -top-24 -right-24 w-72 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={calcParallaxMovement(-0.02)}
        transition={{ type: "spring", damping: 50 }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-24 -left-24 w-72 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={calcParallaxMovement(-0.01)}
        transition={{ type: "spring", damping: 50 }}
      ></motion.div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between py-20">
        {/* Left side with logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex justify-center mb-10 md:mb-0"
        >
          <motion.div 
            className="relative w-64 h-64 md:w-96 md:h-96"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Background Card Effect */}
            <motion.div 
              className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-full shadow-xl"
              animate={calcParallaxMovement(0.02)}
              transition={{ type: "spring", damping: 30 }}
            ></motion.div>
            
            {/* Data visualization inspired logo */}
            <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
              <defs>
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0000" />
                  <stop offset="100%" stopColor="#990000" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>
              
              {/* Outer circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="#f1f1f1" strokeWidth="2" />
              
              {/* Animated Orbit */}
              <motion.circle 
                cx="100" 
                cy="100" 
                r="75" 
                fill="none" 
                stroke="#FF0000" 
                strokeWidth="1" 
                strokeDasharray="5,5"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              />
              
              {/* Data points and connections */}
              <motion.circle 
                cx="70" cy="70" r="10" fill="url(#redGradient)" filter="url(#glow)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle 
                cx="140" cy="60" r="8" fill="url(#redGradient)" filter="url(#glow)"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.circle 
                cx="150" cy="120" r="12" fill="url(#redGradient)" filter="url(#glow)"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              />
              <motion.circle 
                cx="90" cy="150" r="9" fill="url(#redGradient)" filter="url(#glow)"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              />
              <motion.circle 
                cx="40" cy="110" r="7" fill="url(#redGradient)" filter="url(#glow)"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              />
              
              {/* Connection lines with animation */}
              <motion.path 
                d="M70,70 L140,60 L150,120 L90,150 L40,110 Z" 
                fill="none" 
                stroke="#FF0000" 
                strokeWidth="2" 
                strokeOpacity="0.5"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 6, ease: "easeInOut" }}
              />
              
              {/* Center logo */}
              <circle cx="100" cy="100" r="35" fill="white" stroke="#FF0000" strokeWidth="2" />
              <text x="100" y="108" fontSize="28" fontWeight="bold" fill="#000000" textAnchor="middle" fontFamily="Roboto">DZ</text>
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Right side with text */}
        <motion.div 
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1 
            className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
            variants={textVariants}
          >
            <span className="text-primary">DATA</span>
            <span className="text-black">ZEN</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-8 font-medium"
            variants={textVariants}
          >
            When we analyze, it matters.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={textVariants}
          >
            <motion.a
              href="#about"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Explore
            </motion.a>
            <motion.a
              href="#events"
              className="px-6 py-3 bg-white text-black border-2 border-black/10 font-medium rounded-lg hover:border-primary/50 hover:text-primary transition-colors shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Our Events
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{ boxShadow: ["0 0 0 rgba(0, 0, 0, 0)", "0 0 10px rgba(0, 0, 0, 0.2)", "0 0 0 rgba(0, 0, 0, 0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-gray-500 text-xs mt-2 text-center">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero; 