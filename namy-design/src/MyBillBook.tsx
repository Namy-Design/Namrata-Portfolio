import { useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './MyBillBook.css'; // Import the specific CSS for this page

export default function MyBillBook() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Force the body and html to allow scrolling
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';

    // 2. If you are using Lenis globally, try to stop it here
    // If you have a global Lenis instance, you need to call lenis.destroy()
    // Or just suppress it for this route:
    const body = document.querySelector('body');
    if (body) {
       body.style.overflow = 'auto';
    }

    return () => {
      // Optional: restore overflow if you want smooth scroll back on Home
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    };
  }, []);

  // Intersection Observer to play/pause video when it enters/leaves screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="mybillbook-page">
      <picture>
        <source srcSet="assets/images/mybillbook_1.jpg" media="(max-width: 1920px)" />
        <img className="project-img" src="assets/images/mybillbook_1.jpg" alt="MyBillBook Intro" />
      </picture>

      <div className="page-2-video-container">
        <video 
          ref={videoRef} 
          id="page-2-video" 
          muted 
          loop 
          playsInline
        >
          <source src="assets/videos/mybillbook_9.mp4" type="video/mp4" />
        </video>
      </div>

      <picture>
        <source srcSet="assets/images/mybillbook_2_small.webp" media="(max-width: 1920px)" />
        <img className="project-img" src="assets/images/mybillbook_2.webp" alt="MyBillBook Details" />
      </picture>

      {/* React-based Infinite Marquee */}
      <div className="moving-text" data-animated="true">
        <div className="revolving-text">
          {[1, 2].map((iteration) => (
            <Fragment key={iteration}>
              <div className="revolve-child-txt">HOPE YOU LIKED IT</div>
              <div className="revolve-child-txt">HOPE YOU LIKED IT</div>
              <div className="revolve-child-txt">HOPE YOU LIKED IT</div>
              <div className="revolve-child-txt">HOPE YOU LIKED IT</div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="footer-header">NEXT PROJECT</div>
        <Link to="/goldsetu">
          <div className="footer-img">
            <picture>
              {/* Image for Mobile/Tablet */}
              <source media="(max-width: 600px)" srcSet="assets/images/GoldSetu.webp" />
              {/* Default Image for Desktop */}
              <img className="app-image asset-tracker" src="assets/images/digi-gold.webp" alt="group-order" />
            </picture>
          </div>
        </Link>
      </div>
    </div>
  );
}