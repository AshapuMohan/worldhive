import React, { useState, useRef, useEffect } from 'react';

const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowButton(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white flex flex-col items-center justify-center py-6 rounded-t-lg"
    >
      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          title="Back to Top"
          className="absolute -top-6 right-5 bg-gray-600 text-white p-3 rounded-full shadow-lg cursor-pointer animate-bounce"
          style={{ width: '48px', height: '48px' }}
        >
          <i className="fa-solid fa-arrow-up text-xl"></i>
        </button>
      )}

      <p className="text-lg text-gray-300 mb-2">Connect with me on social media</p>

      <div className="flex justify-center gap-6 text-lg my-2">
        <a
          href="https://www.facebook.com/profile.php?id=100084252888068"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <i className="fa-brands fa-facebook hover:text-sky-800 hover:scale-150 transition-transform duration-300"></i>
        </a>
        <a
          href="https://x.com/MohanAshapu"
          target="_blank"
          rel="noreferrer"
          aria-label="X Twitter"
        >
          <i className="fa-brands fa-x-twitter hover:text-blue-500 hover:scale-150 transition-transform duration-300"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/mohan-ashapu-724aba258"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fa-brands fa-linkedin hover:text-sky-500 hover:scale-150 transition-transform duration-300"></i>
        </a>
        <a
          href="https://github.com/AshapuMohan"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <i className="fa-brands fa-github hover:text-gray-800 hover:scale-150 transition-transform duration-300"></i>
        </a>
        <a href="mailto:ashapumohan123@gmail.com" aria-label="Email">
          <i className="fa-solid fa-envelope hover:text-red-500 hover:scale-150 transition-transform duration-300"></i>
        </a>
        <a href="tel:+917989909756" aria-label="Phone">
          <i className="fa-solid fa-phone hover:text-red-500 hover:scale-150 transition-transform duration-300"></i>
        </a>
      </div>

      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2 my-2">
        <i className="fa fa-code text-blue-400"></i> Ashapu Mohan
      </h3>
      <p className="text-sm text-gray-300 my-2">© 2025 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
