import React, { useState, useEffect } from 'react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <a href="#" className="logo-link">
              <span className="logo-text">SREE</span>
            </a>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                Services
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="nav-cta">
            <a href="#" className="cta-button">
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

    

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', 'Arial', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .navbar:hover {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.9);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        }

        .navbar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shine 3s ease-in-out infinite;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        /* Logo Styles */
        .nav-logo {
          position: relative;
        }

        .logo-link {
          text-decoration: none;
          color: white;
        }

        .logo-text {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          transition: all 0.3s ease;
          position: relative;
        }

        .logo-text:hover {
          transform: scale(1.1) rotate(-2deg);
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
        }

        /* Navigation Menu */
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 40px;
          align-items: center;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          text-decoration: none;
          color: white;
          font-weight: 600;
          font-size: 16px;
          padding: 12px 0;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          letter-spacing: 0.5px;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
          background-size: 200% 200%;
          transition: all 0.4s ease;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: gradientFlow 2s ease-in-out infinite;
        }

        .nav-link:hover {
          color: #4ecdc4;
          transform: translateY(-3px);
          text-shadow: 0 0 20px rgba(78, 205, 196, 0.8);
        }

        .nav-link:hover::before {
          width: 120%;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .nav-link:hover::after {
          left: 100%;
        }

        /* CTA Button */
        .nav-cta {
          position: relative;
        }

        .cta-button {
          text-decoration: none;
          color: white;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          background-size: 200% 200%;
          padding: 14px 28px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          border: 2px solid transparent;
          letter-spacing: 0.5px;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #4ecdc4, #45b7d1, #ff6b6b);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 30px;
        }

        .cta-button:hover {
          transform: translateY(-4px) scale(1.08);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          animation: buttonPulse 1.5s infinite;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .cta-button:hover::before {
          opacity: 1;
        }

        .cta-button span {
          position: relative;
          z-index: 1;
        }

        /* Hamburger Menu */
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .hamburger:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .bar {
          width: 28px;
          height: 3px;
          background: white;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 3px;
          position: relative;
        }

        .hamburger:hover .bar {
          background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
          box-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
        }

        /* Demo Content */
        .demo-content {
          margin-top: 100px;
          padding: 80px 20px;
          text-align: center;
          color: white;
        }

        .demo-content h1 {
          font-size: 52px;
          margin-bottom: 24px;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
          font-weight: 800;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .demo-content p {
          font-size: 20px;
          opacity: 0.9;
          font-weight: 300;
          letter-spacing: 1px;
        }

        /* Animations */
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          }
          50% {
            box-shadow: 0 12px 40px rgba(78, 205, 196, 0.5);
          }
        }

        @keyframes shine {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: rgba(131, 83, 131, 0);
            backdrop-filter: blur(20px);
            width: 100%;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            padding: 30px 0;
            gap: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-link {
            font-size: 18px;
            padding: 15px 0;
          }

          .hamburger {
            display: flex;
          }

          .hamburger.active .bar:nth-child(2) {
            opacity: 0;
            transform: translateX(20px);
          }

          .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
          }

          .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
          }

          .nav-cta {
            display: none;
          }

          .demo-content h1 {
            font-size: 36px;
          }

          .demo-content p {
            font-size: 16px;
          }

          .nav-container {
            padding: 0 15px;
          }

          .logo-text {
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .nav-menu {
            gap: 20px;
            padding: 25px 0;
          }

          .demo-content h1 {
            font-size: 28px;
          }

          .logo-text {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;