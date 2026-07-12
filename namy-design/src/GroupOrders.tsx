import { useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './GroupOrders.css';

export default function GroupOrders() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // 1. Force the page to scroll (cleaning up global App.tsx locks)
  useEffect(() => {
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
    };
  }, []);

  // 2. Sequential Video Playback Logic (from your extra.js)
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    let isPlaying = false;
    let currentVideo: HTMLVideoElement | null = null;

    const playSequentially = () => {
      if (!isPlaying) {
        if (currentVideo === v1 || currentVideo === null) {
          currentVideo = v1;
          v1.play().catch(() => {}); // catch to prevent browser autoplay policy errors
          isPlaying = true;
        } else if (currentVideo === v2) {
          currentVideo = v2;
          v2.play().catch(() => {});
          isPlaying = true;
        }
      }
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isPlaying) playSequentially();
        } else {
          // Pause both if container goes out of view
          v1.pause();
          v2.pause();
          isPlaying = false;
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold: 0.5 });
    observer.observe(v1);
    observer.observe(v2);

    const onV1End = () => { 
      isPlaying = false; 
      currentVideo = v2; 
      playSequentially(); 
    };
    
    const onV2End = () => { 
      isPlaying = false; 
      currentVideo = v1; 
      playSequentially(); 
    };

    v1.addEventListener('ended', onV1End);
    v2.addEventListener('ended', onV2End);

    return () => {
      observer.disconnect();
      v1.removeEventListener('ended', onV1End);
      v2.removeEventListener('ended', onV2End);
    };
  }, []);

  return (
    <div className="group-orders-page">
      {/* Intro Image */}
      <picture>
        <source srcSet="/assets/images/Swiggy_small_1.webp" media="(max-width: 1920px)" />
        <img className="project-img" src="/assets/images/Swiggy_4K_1.jpg" alt="Swiggy Intro" />
      </picture>

      <div className="page-2-video-container-1">
        <video id="group-orders-video" autoPlay muted loop playsInline>
            <source src="/assets/videos/Swiggy_4K_2.mp4" type="video/mp4" />
        </video>
    </div>

      {/* Brainstorming Section */}
      <div className="brainstorming-container">
        <div className="brain-bg-container">
          <div className="brain-storm-header">
            <img src="/assets/images/brainstorm-header.svg" style={{ height: '100%' }} alt="Brainstorm Header" />
          </div>
          <div className="brain-storm-content">
            <img src="/assets/images/brainstorm-content.svg" style={{ width: '70%' }} alt="Brainstorm Content" />
            <video id="brainstorm-video" autoPlay muted loop playsInline>
              <source src="/assets/videos/order-food.MP4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <picture>
        <source srcSet="/assets/images/Swiggy_small_2.jpg" media="(max-width: 1920px)" />
        <img className="project-img" src="/assets/images/Swiggy_4K_2.webp" alt="Swiggy Details 2" />
      </picture>

      {/* Referencing Section 1 */}
      <div className="referencing-container">
        <img className="referencing-cups" src="/assets/images/swiggy-cups.svg" alt="Cups" />
        <div className="referencing-header">
          <img src="/assets/images/referencing.svg" style={{ height: '80%' }} alt="Referencing" />
        </div>
        <div className="referencing-content">
          <video style={{ height: '80%', marginRight: '30px', borderRadius: '20px' }} autoPlay muted loop playsInline>
            <source src="/assets/videos/splitwise.MP4" type="video/mp4" />
          </video>
          <video style={{ height: '80%', borderRadius: '20px' }} autoPlay muted loop playsInline>
            <source src="/assets/videos/phonepe.MP4" type="video/mp4" />
          </video>
        </div>
      </div>

      <picture>
        <source srcSet="/assets/images/Swiggy_small_3.webp" media="(max-width: 1920px)" />
        <img className="project-img" src="/assets/images/Swiggy_4K_3.webp" alt="Swiggy Details 3" />
      </picture>

      {/* Referencing Section 2 (Prototypes) */}
      <div className="referencing-container">
        <img className="referencing-sushi" src="/assets/images/sushi.svg" alt="Sushi" />
        <div className="referencing-header">
          <img src="/assets/images/prototype.svg" style={{ height: '80%' }} alt="Prototype" />
        </div>
        <div className="referencing-content" style={{ backgroundColor: '#FF7F00' }}>
          <div className="prototype-video-container" style={{ justifyContent: 'flex-end' }}>
            <video ref={video1Ref} id="swiggy-prototype-video-1" style={{ height: '100%' }} muted playsInline>
              <source src="/assets/videos/group_creator.mov" type="video/mp4" />
            </video>
          </div>
          <div className="prototype-video-container" style={{ justifyContent: 'flex-start' }}>
            <video ref={video2Ref} id="swiggy-prototype-video-2" style={{ height: '100%' }} muted playsInline>
              <source src="/assets/videos/group_visitor.mov" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <picture>
        <source srcSet="/assets/images/Swiggy_small_4.webp" media="(max-width: 1920px)" />
        <img className="project-img" src="/assets/images/Swiggy_4K_4.webp" alt="Swiggy Details 4" />
      </picture>

      {/* Infinite Marquee */}
      <div className="group-orders-moving-text" data-animated="true">
        <div className="group-orders-revolving-text">
          {[1, 2].map((iteration) => (
            <Fragment key={iteration}>
              <div className="group-orders-revolve-child-txt">THANKS FOR WATCHING</div>
              <div className="group-orders-revolve-child-txt">THANKS FOR WATCHING</div>
              <div className="group-orders-revolve-child-txt">THANKS FOR WATCHING</div>
              <div className="group-orders-revolve-child-txt">THANKS FOR WATCHING</div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Footer Linking to MyBillBook */}
      <div className="footer">
        <div className="footer-header">NEXT PROJECT</div>
        <Link to="/mybillbook">
          <div className="footer-img">
            <picture>
                {/* Image for Mobile/Tablet */}
                <source media="(max-width: 600px)" srcSet="/assets/images/MyBillBook.webp" />
                {/* Default Image for Desktop */}
                <img className="app-image asset-tracker" src="/assets/images/e-invoice.webp" alt="e-invoice" />
            </picture>
          </div>
        </Link>
      </div>
    </div>
  );
}