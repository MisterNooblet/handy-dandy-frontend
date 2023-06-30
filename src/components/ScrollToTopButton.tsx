import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const isScrollable = document.body.scrollHeight > window.innerHeight;
      setIsVisible(scrollTop > 0 && isScrollable);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '5rem',
        right: '1rem',
        display: isVisible ? 'block' : 'none',
        cursor: 'pointer',
        fontSize: 30,
      }}
      onClick={handleScrollToTop}
    >
      <ArrowCircleLeftIcon sx={{ transform: 'rotate(90deg)', fontSize: '2rem' }} />
    </Box>
  );
};

export default ScrollToTopButton;
