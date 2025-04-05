import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Organizer",
    image: "https://source.unsplash.com/random/300x300?portrait=1",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Technical Lead",
    image: "https://source.unsplash.com/random/300x300?portrait=2",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 3,
    name: "Michael Park",
    role: "Design Lead",
    image: "https://source.unsplash.com/random/300x300?portrait=3",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Content Manager",
    image: "https://source.unsplash.com/random/300x300?portrait=4",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Community Manager",
    image: "https://source.unsplash.com/random/300x300?portrait=5",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  }
];

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        ease: "easeOut",
      },
    },
  };

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 bg-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-20 top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex flex-col"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span variants={itemVariants} className="text-primary font-mono text-lg mb-2 block">04</motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Meet The <span className="text-primary">Team</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 max-w-2xl mx-auto">
              Meet the dedicated individuals who make Datazen possible. Our team of passionate volunteers works tirelessly to create amazing experiences.
            </motion.p>
          </motion.div>

          {/* Team Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-black border border-white/10 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover filter group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-3">
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="bg-black/50 p-2 rounded-full text-white hover:text-primary hover:bg-black/80 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg>
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="bg-black/50 p-2 rounded-full text-white hover:text-primary hover:bg-black/80 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
                      </a>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="bg-black/50 p-2 rounded-full text-white hover:text-primary hover:bg-black/80 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Team Members - Wall of Fame */}
          <motion.div variants={itemVariants} className="mt-20">
            <h3 className="text-2xl font-bold mb-10 text-center text-white">
              Wall of <span className="text-primary">Fame</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black border border-white/10 rounded-xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">Best Club Award 2023</h4>
                    <p className="text-gray-400 text-sm">Recognized for outstanding contributions to the data science community.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black border border-white/10 rounded-xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">DataLake Project</h4>
                    <p className="text-gray-400 text-sm">Built the tech for one of the largest open-source data lakes in academia.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black border border-white/10 rounded-xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">3000+ Event Participants</h4>
                    <p className="text-gray-400 text-sm">Engaged over three thousand participants in our events over the past year.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black border border-white/10 rounded-xl overflow-hidden h-full hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-16 h-16 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">Industry Partnerships</h4>
                    <p className="text-gray-400 text-sm">Established partnerships with 15+ leading tech companies for exclusive opportunities.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Join the Team CTA */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <div className="bg-black border border-white/10 p-10 rounded-2xl relative overflow-hidden max-w-3xl mx-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Want to <span className="text-primary">join us</span>?
              </h3>
              <p className="text-gray-300 mb-8">
                We're always looking for passionate individuals to join our team. If you're interested in data science and want to make an impact, we'd love to hear from you!
              </p>
              <a 
                href="#" 
                className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient transition element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/80 to-white"></div>
    </section>
  );
};

export default Team; 