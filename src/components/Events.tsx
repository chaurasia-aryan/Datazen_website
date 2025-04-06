import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Particles from "../ReactBits/Particles/Particles";
import BlurText from "../ReactBits/Particles/BlurText";
import ScrollVelocity from "../ReactBits/Particles/ScrollVelocity";

// Sample event data with updated images
const eventsData = [
  {
    id: 1,
    title: "DataCamp",
    description: "A comprehensive workshop on data science fundamentals and practical applications.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "June 15, 2023",
    category: "Workshop"
  },
  {
    id: 2,
    title: "HackData",
    description: "24-hour hackathon focused on creating innovative data-driven solutions.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "August 22, 2023",
    category: "Hackathon"
  },
  {
    id: 3,
    title: "AI Summit",
    description: "Conference featuring leading industry experts discussing the future of AI.",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "October 10, 2023",
    category: "Conference"
  },
  {
    id: 4,
    title: "Data Networking",
    description: "Networking event connecting data professionals and enthusiasts.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    date: "November 5, 2023",
    category: "Networking"
  }
];

const Events = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ["All", "Workshop", "Hackathon", "Conference", "Networking"];

  // Define the velocity variable
  const velocity = 25; // Example value, adjust as needed

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.7, 1, 1, 0.7]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const cardVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      scale: 1.03, 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.8 } }
  };

  const filteredEvents = activeCategory === "All"
    ? eventsData
    : eventsData.filter(event => event.category === activeCategory);

  return (
    <section 
      id="events" 
      ref={sectionRef}
      className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-4 bg-black overflow-hidden"
    >
      {/* Retro Background Grid */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(255, 0, 0, 0.1) 39px,
            rgba(255, 0, 0, 0.1) 40px
          )`
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            rgba(255, 0, 0, 0.1) 39px,
            rgba(255, 0, 0, 0.1) 40px
          )`
        }} />
      </div>

      {/* Particles Background */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={300}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      {/* Complementary gradient transition from Team section */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <motion.div 
            className="absolute right-0 top-20 w-64 h-64 bg-red-50 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute left-0 bottom-20 w-64 h-64 bg-gray-100 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y }}
        className="container mx-auto relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              className="inline-block px-4 py-1 mb-4 bg-red-50 border border-primary/20 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span 
                className="text-primary font-mono text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                02 · EVENTS & ACTIVITIES
              </motion.span>
            </motion.div>
            <div className="w-full flex justify-center">

            <ScrollVelocity
              texts={[' OUR ', 'EVENTS']} 
              velocity={velocity} 
              className="custom-scroll-text"
            />
            </div>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join us for exciting workshops, hackathons, and networking events. We organize various events throughout the year to foster learning and collaboration.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.05), duration: 0.4 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Events Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  initial="rest"
                  whileHover="hover"
                  animate={hoveredEvent === event.id ? "hover" : "rest"}
                  onHoverStart={() => setHoveredEvent(event.id)}
                  onHoverEnd={() => setHoveredEvent(null)}
                  className="bg-black rounded-2xl overflow-hidden shadow-md border-4 border-red-800 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      variants={imageVariants}
                    />
                    <motion.div 
                      className="absolute top-3 right-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
                      whileHover={{ scale: 1.05 }}
                    >
                      {event.category}
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mr-2"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </motion.div>
                      <div className="text-gray-100 text-sm">{event.date}</div>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-red-600 hover:text-red-700 font-mono text-sm font-bold mb-4 leading-relaxed tracking-wide transition-colors duration-300"

                    >
                      {event.description}
                    </p>
                    <motion.a 
                      href="#" 
                      className="inline-flex items-center text-primary text-sm font-mono font-medium transition-all duration-300"
                      whileHover={{ x: 5 }}
                      initial={{ x: 0 }}
                    >
                      Learn more
                      <svg className="w-4 h-4 ml-1 transform transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mt-20">
            <motion.div 
              className="inline-block px-4 py-1 mb-4 bg-red-50 border border-primary/20 rounded-full mx-auto flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span 
                className="text-primary font-mono text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                OUR TIMELINE
              </motion.span>
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-10 text-center text-black">
              Event <span className="text-primary">Timeline</span>
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/70 to-primary/30"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.div>
              
              {/* Timeline items */}
              <div className="flex flex-col space-y-12">
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">Women Techies</h4>
                        <p className="text-gray-600 text-sm">Our annual women-focused technical event with workshops and competitions.</p>
                      </motion.div>
                    </div>
                    <div className="md:pl-12 pl-4"></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0"></div>
                    <div className="md:pl-12 pl-4">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">DevJams</h4>
                        <p className="text-gray-600 text-sm">A 48-hour development hackathon for creating innovative solutions.</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}  
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">Hexathon</h4>
                        <p className="text-gray-600 text-sm">Six-hour rapid ideation and prototyping competition.</p>
                      </motion.div>
                    </div>
                    <div className="md:pl-12 pl-4"></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-md flex items-center justify-center"
                    whileInView={{
                      scale: [0, 1.5, 1],
                      opacity: [0, 1, 1]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div className="w-2 h-2 bg-primary rounded-full"></motion.div>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:text-right md:pr-12 pl-4 md:pl-0"></div>
                    <div className="md:pl-12 pl-4">
                      <motion.div 
                        className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl transition-all duration-300 hover:shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <h4 className="text-lg font-bold mb-2 text-black">CTF</h4>
                        <p className="text-gray-600 text-sm">Capture The Flag cybersecurity competition with challenging puzzles.</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA */}
          <motion.div 
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true, margin: "-100px" }}  
            className="flex flex-col items-center mt-20 bg-red-50/50 border border-primary/10 p-10 rounded-2xl relative overflow-hidden shadow-sm"
          >
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <motion.div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/70"></motion.div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black text-center relative z-10">
              Ready to join our <span className="text-primary">next event</span>?
            </h3>
            
            <p className="text-gray-700 mb-8 text-center max-w-2xl relative z-10">
              Subscribe to our newsletter to stay updated on upcoming events and exclusive opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg relative z-10">
              <motion.input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-gray-200 text-black focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                whileFocus={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              />
              <motion.button 
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(255, 0, 0, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Events;