// src/components/LandingPage.js
import  { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
const LandingPage = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(titleRef.current, { opacity: 1, y: -50, duration: 1 });
    tl.from(descriptionRef.current, { opacity: 1, y: 50, duration: 1 }, '-=0.7');
    tl.from(buttonRef.current, { opacity: 1, duration: 0.5 }, '-=0.5');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white flex flex-col justify-center items-center">
      <h1 ref={titleRef} className="text-4xl font-bold mb-6">Welcome to Pixel Studio</h1>
      <p ref={descriptionRef} className="text-lg mb-8">Create pixel art with ease</p>
      <Link
        to="/login"
        ref={buttonRef}
          className="w-1.3 text-xl rounded-md px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        Login
      </Link>
    </div>
  );
};

export default LandingPage;
