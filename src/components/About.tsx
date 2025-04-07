import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PostcardData {
  id: number;
  title: string;
  content: string;
  icon: string;
}

const postcardData: PostcardData[] = [
  {
    id: 1,
    title: "MISSION",
    content: "To foster innovation and excellence in data science through collaborative learning and research.",
    icon: "🎯"
  },
  {
    id: 2,
    title: "VISION",
    content: "Empowering students with cutting-edge data science skills and creating future leaders in the field.",
    icon: "👁️"
  },
  {
    id: 3,
    title: "ACHIEVEMENTS",
    content: "Successfully organized 20+ workshops, 5 hackathons, and mentored 100+ students in data science projects.",
    icon: "🏆"
  },
  {
    id: 4,
    title: "VALUES",
    content: "Innovation • Collaboration • Excellence • Ethics • Leadership",
    icon: "⭐"
  },
  {
    id: 5,
    title: "TEAM",
    content: "A dynamic group of students, mentors, and industry experts working together to advance data science.",
    icon: "👥"
  },
  {
    id: 6,
    title: "FUTURE",
    content: "Building a comprehensive data science ecosystem and expanding our reach globally.",
    icon: "🚀"
  }
];

const About = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<PostcardData[]>(postcardData);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleCards = () => {
    setIsShuffling(true);
    const newCards = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(newCards);
    setTimeout(() => setIsShuffling(false), 500);
  };

  const handleCardClick = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  useEffect(() => {
    // Add initial animation delay
    const timer = setTimeout(() => {
      shuffleCards();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-[#0A0A0A] py-20 px-4 relative overflow-hidden">
      {/* Retro Background Grid */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(255, 0, 0, 0.3) 39px,
            rgba(255, 0, 0, 0.3) 40px
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

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl font-bold text-red-500 heading-8bit mb-4">
          ABOUT US
        </h2>
        <motion.div 
          className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Shuffle Button */}
      <motion.button
        onClick={shuffleCards}
        className="relative mx-auto mb-12 block group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-white/20 rounded-lg blur-sm"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="relative px-8 py-2 bg-black/90 border border-red-500 group-hover:border-white transition-colors duration-300 rounded-lg backdrop-blur-sm">
          <span className="text-white text-lg font-medium tracking-wider">SHUFFLE CARDS</span>
        </div>
      </motion.button>

      {/* Postcards Grid */}
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {shuffledCards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={`card-${card.id}`}
              className="relative aspect-[4/3] cursor-pointer [perspective:1000px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: isShuffling ? Math.random() * 20 - 10 : 0
              }}
              transition={{ duration: 0.5 }}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ 
                scale: 1.05,
                rotate: Math.random() * 5 - 2.5
              }}
            >
              <div 
                className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d]"
                style={{ 
                  transform: flippedCard === card.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Back of card */}
                <div 
                  className="absolute inset-0 bg-black/90 border-2 border-red-500 rounded-lg p-6 flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]"
                >
                  <div className="text-white text-center">
                    <p className="text-lg mb-4 pixel-text">{card.content}</p>
                    <span className="text-red-500 text-sm">Click to flip back</span>
                  </div>
                  
                  {/* Back side holographic effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-lg"
                    animate={{
                      opacity: [0, 0.2, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Front of card */}
                <div 
                  className="absolute inset-0 bg-black/90 border-2 border-red-500 rounded-lg p-6 [backface-visibility:hidden]"
                >
                  <div className="h-full flex flex-col items-center justify-center relative">
                    {/* Corner Decorations */}
                    {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((position, i) => (
                      <div key={i} className={`absolute w-6 h-6 ${position} border-red-500`} style={{
                        borderWidth: position.includes('top') ? '2px 2px 0 0' : position.includes('bottom') ? '0 0 2px 2px' : '2px'
                      }} />
                    ))}
                    
                    {/* Icon */}
                    <motion.div
                      className="text-4xl mb-4"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {card.icon}
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-red-500 mb-2 text-center heading-8bit">
                      {card.title}
                    </h3>
                    
                    <span className="text-white/70 text-sm">Click to flip</span>
                    
                    {/* Front side holographic effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"
                      animate={{
                        opacity: [0, 0.1, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>

              {/* Card glow effect */}
              <motion.div
                className="absolute inset-0 -z-10 bg-red-500/20 blur-xl rounded-lg"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.95, 1, 0.95]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Corner Decorations */}
      {[
        'top-0 left-0',
        'top-0 right-0 rotate-90',
        'bottom-0 right-0 rotate-180',
        'bottom-0 left-0 -rotate-90'
      ].map((position, index) => (
        <motion.div
          key={index}
          className={`absolute w-16 h-16 ${position} opacity-60`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.2 * index }}
        >
          <motion.div
            className="w-full h-full relative"
            animate={{
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 border-l-4 border-t-4 border-red-500" />
            <div className="absolute inset-4 border-l-2 border-t-2 border-white/30" />
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
};

export default About; 