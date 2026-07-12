import { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './GoldSetu.css'; // Import the specific CSS for this page

export default function GoldSetu() {
  
  useEffect(() => {
    // 1. Force the body and html to allow scrolling when this component mounts
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';

    return () => {
      // Restore the smooth-scroll trap when navigating back to Home
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
    };
  }, []);

  return (
    <div className="goldsetu-page">
      {/* Intro Image */}
      <picture>
        <source srcSet="/assets/images/Goldsetu_1_small.webp" media="(max-width: 1920px)" />
        <img className="project-img" src="/assets/images/Goldsetu_1_4K.webp" alt="GoldSetu Intro" />
      </picture>

      {/* Details Image */}
      <picture>
        <source srcSet="/assets/images/Goldsetu_2_small.jpg" media="(max-width: 1920px)" />
        <img className="project-img" src="/assets/images/Goldsetu_2_4K.webp" alt="GoldSetu Details" />
      </picture>

      {/* React-based Infinite Marquee */}
      <div className="goldsetu-moving-text" data-animated="true">
        <div className="goldsetu-revolving-text">
          {[1, 2].map((iteration) => (
            <Fragment key={iteration}>
              <div className="goldsetu-revolve-child-txt">HOPE YOU LIKED IT</div>
              <div className="goldsetu-revolve-child-txt">HOPE YOU LIKED IT</div>
              <div className="goldsetu-revolve-child-txt">HOPE YOU LIKED IT</div>
              <div className="goldsetu-revolve-child-txt">HOPE YOU LIKED IT</div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Footer Linking to Group Orders */}
      <div className="goldsetu-footer">
        <div className="goldsetu-footer-header">NEXT PROJECT</div>
        <Link to="/group-orders">
          <div className="goldsetu-footer-img">
            <picture>
                {/* Image for Mobile/Tablet */}
                <source media="(max-width: 600px)" srcSet="/assets/images/Personal.webp" />
                {/* Default Image for Desktop */}
                <img className="app-image asset-tracker" src="/assets/images/group-order.webp" alt="group-order" />
            </picture>
          </div>
        </Link>
      </div>
    </div>
  );
}