import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 1, 1, 0.3]);

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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Floating animation
  const floatingAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden bg-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0">
          <motion.div 
            className="absolute -right-40 -top-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute -left-40 -bottom-40 w-96 h-96 bg-black/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y }}
        className="container mx-auto relative z-10"
        ref={contentRef}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Left content */}
          <motion.div variants={itemVariants} className="flex-1">
            <motion.div 
              className="inline-block px-4 py-1 mb-4 bg-red-50 border border-primary/20 rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.span
                className="text-primary font-mono text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                01 · ABOUT US
              </motion.span>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 text-black"
            >
              Data<span className="text-primary">zen</span> Community
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-6">
              Datazen is a dynamic community of data enthusiasts, innovators, and problem solvers. We are committed to bridging the gap between data science theory and real-world applications.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8">
              We think slightly out of the box, we believe that a community's resources must not only be channeled into conducting events but also to propagate learning and teaching, symbiotically.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <motion.div 
                className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
              >
                <div className="text-primary text-3xl font-bold mb-2">25+</div>
                <div className="text-gray-700">Events Organized</div>
              </motion.div>

              <motion.div 
                className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-primary text-3xl font-bold mb-2">2k+</div>
                <div className="text-gray-700">Community Members</div>
              </motion.div>

              <motion.div 
                className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-primary text-3xl font-bold mb-2">10+</div>
                <div className="text-gray-700">Years Experience</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content - Mission card */}
          <motion.div 
            variants={itemVariants} 
            className="flex-1 flex justify-center items-center"
          >
            <motion.div 
              className="relative w-full max-w-md"
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                rotate: 2,
                transition: { duration: 0.5 }
              }}
            >
              {/* Abstract shapes in background */}
              <motion.div 
                className="absolute -right-8 -top-8 w-20 h-20 bg-primary/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute -left-5 -bottom-5 w-16 h-16 bg-black/5 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Main content card */}
              <div className="relative bg-white border border-gray-100 p-8 rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/70"></div>
                
                <h3 className="text-2xl font-bold mb-4 text-black">Our <span className="text-primary">Mission</span></h3>
                
                <p className="text-gray-700 mb-6">
                  To create a thriving ecosystem where data science knowledge is accessible to all, 
                  fostering innovation and collaboration among enthusiasts, students, and professionals.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-red-50 mr-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-gray-700">Community-driven learning</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-red-50 mr-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-gray-700">Practical skill development</p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-red-50 mr-3">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-gray-700">Networking opportunities</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 