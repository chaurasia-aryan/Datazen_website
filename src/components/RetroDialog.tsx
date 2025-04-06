import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RetroDialogProps {
  message: string;
  onClose?: () => void;
}

const RetroDialog = ({ message, onClose }: RetroDialogProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Start animation after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible && currentIndex < message.length) {
      const timer = setTimeout(() => {
        setCurrentText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Speed of text typing

      return () => clearTimeout(timer);
    }
  }, [isVisible, currentIndex, message]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 left-8 z-50 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Computer Icon Image */}
          <motion.div 
            className="w-16 h-16 relative"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="retro-computer w-full h-full pixel-corners">
              <img 
                src="/images/images (1).png" 
                alt="Retro Computer" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </motion.div>

          {/* Dialog Box */}
          <div className="relative max-w-md">
            {/* Main dialog box */}
            <div className="relative bg-white p-[2px] pixel-corners retro-glow">
              <div className="retro-dialog-bg bg-black p-4 relative overflow-hidden">
                <div className="retro-grid"></div>
                {/* Text content */}
                <p className="pixel-text text-white text-sm leading-relaxed relative z-10 crt-flicker">
                  {currentText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block ml-1"
                  >
                    _
                  </motion.span>
                </p>
              </div>
            </div>

            {/* Dialog tail */}
            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 bg-white transform rotate-45 retro-glow"></div>
              <div className="absolute inset-[2px] retro-dialog-bg transform rotate-45">
                <div className="retro-grid"></div>
              </div>
            </div>
          </div>

          {/* Close button */}
          {onClose && (
            <motion.button
              className="absolute top-0 right-0 w-8 h-8 bg-red-500 pixel-corners retro-shadow flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <span className="text-white font-bold">×</span>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RetroDialog; 