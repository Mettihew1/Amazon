import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import "./banner.css"

const Banner = () => {
  const [index, setIndex] = useState(0);
  const images = ['/images/people.gif', '/images/phone.gif'];

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='test'>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default Banner;