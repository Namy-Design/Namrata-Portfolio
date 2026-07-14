import { useEffect, useRef, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import './index.css'; 
import { ScrollHighlight, Highlight } from './ScrollHighlight';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  console.log('Hello World');
  const scrollableRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const meshCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for sequential video playback
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeedback, setActiveFeedback] = useState<'sid' | 'kevin' | 'shankar'>('sid');

  // ── Asset Loader Logic ─────────────────────────────────────────────────────
  useEffect(() => {
    const assets = document.querySelectorAll('.asset-tracker') as NodeListOf<HTMLImageElement | HTMLVideoElement | HTMLScriptElement>;
    let loadedAssets = 0;
    const totalAssets = 44;

    const updateProgress = () => {
      loadedAssets++;
      const progress = Math.min(100, Math.floor((loadedAssets / totalAssets) * 100));
      
      setTimeout(() => setLoadingProgress(progress), 800);
      
      if (loadedAssets >= totalAssets - 2) {
        setTimeout(() => setLoadingProgress(100), 1000);
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    const checkAssetStatus = (asset: any) => {
      if (asset.tagName === 'IMG' || asset.tagName === 'VIDEO') {
        if (asset.complete || asset.readyState >= 3) {
          updateProgress();
        } else {
          asset.addEventListener('load', updateProgress);
          asset.addEventListener('error', updateProgress);
        }
      }
    };

    assets.forEach(checkAssetStatus);
    document.fonts.ready.then(updateProgress);
  }, []);

  // ── Lenis, GSAP, Canvas, and Observers ─────────────────────────────────────
  useGSAP(() => {
    if (!scrollableRef.current) return;

    // 1. Lenis Setup
    const lenis = new Lenis({
      wrapper: scrollableRef.current,
      content: scrollableRef.current,
      duration: 1. ,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.defaults({ scroller: scrollableRef.current });
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Slider Parallax
    const handleScrollEffects = (scrollPosition: number) => {
      const topSlider = document.querySelector('.top-slider') as HTMLElement;
      const bottomSlider = document.querySelector('.bottom-slider') as HTMLElement;
      const sliderDiv = document.querySelector('.slider-screen-container') as HTMLElement;
      const windowHeight = window.innerHeight;

      // Update the z-index to 1000 when active (scroll < windowHeight), and 0 when done.
      if (sliderDiv) {
        sliderDiv.style.zIndex = scrollPosition >= windowHeight ? '0' : '1000';
      }
      
      if (topSlider) topSlider.style.transform = `translateY(${-scrollPosition / 2}px)`;
      if (bottomSlider) bottomSlider.style.transform = `translateY(${scrollPosition / 2}px)`;
    };
    
    lenis.on('scroll', ({ scroll }) => handleScrollEffects(scroll));
    handleScrollEffects(0);

    // 3. Canvas Mesh
    const drawMesh = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const lineColor = '#282828';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = lineColor; ctx.stroke();
      }
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = lineColor; ctx.stroke();
      }
    };

    const handleResize = () => {
      if (meshCanvasRef.current) {
        meshCanvasRef.current.width = window.innerWidth;
        meshCanvasRef.current.height = window.innerHeight;
        drawMesh(meshCanvasRef.current, meshCanvasRef.current.getContext('2d')!);
      }
      if (mainCanvasRef.current && scrollableRef.current) {
        mainCanvasRef.current.width = window.innerWidth;
        mainCanvasRef.current.height = scrollableRef.current.scrollHeight || (13.6 * window.innerHeight);
        drawMesh(mainCanvasRef.current, mainCanvasRef.current.getContext('2d')!);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);


    // 5. Page 7 Blurred Backgrounds
    const observeBlur = (containerId: string, bgId: string) => {
      const container = document.querySelector(containerId);
      const bg = document.querySelector(bgId) as HTMLElement;
      if (!container || !bg) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { bg.style.opacity = entry.isIntersecting ? '1' : '0'; });
      }, { threshold: 0.2 });
      observer.observe(container);
    };
    observeBlur('#page-7-container-1', '#page-7-blurred-bg-1');
    observeBlur('#page-7-container-2', '#page-7-blurred-bg-2');
    observeBlur('#page-7-container-3', '#page-7-blurred-bg-3');

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ── Sequential Video Player Logic ──────────────────────────────────────────
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    let isPlaying = false;
    let currentVideo: HTMLVideoElement | null = null;

    const playSequentially = () => {
      if (!isPlaying) {
        if (currentVideo === v1 || currentVideo === null) {
          currentVideo = v1; v1.play(); isPlaying = true;
        } else if (currentVideo === v2) {
          currentVideo = v2; v2.play(); isPlaying = true;
        }
      }
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isPlaying) playSequentially();
        } else {
          (entry.target as HTMLVideoElement).pause();
          isPlaying = false;
        }
      });
    };

    const observer = new IntersectionObserver(callback, { root: null, rootMargin: '0px', threshold: 0.5 });
    observer.observe(v1);
    observer.observe(v2);

    const onV1End = () => { v1.pause(); isPlaying = false; currentVideo = v2; playSequentially(); };
    const onV2End = () => { v2.pause(); isPlaying = false; currentVideo = v1; playSequentially(); };

    v1.addEventListener('ended', onV1End);
    v2.addEventListener('ended', onV2End);

    return () => {
      observer.disconnect();
      v1.removeEventListener('ended', onV1End);
      v2.removeEventListener('ended', onV2End);
    };
  }, []);

  return (
    <>
      {isLoading && (
         <div className="loading-page">
            <div className="circular-loader" style={{ background: `conic-gradient(#F67C29 ${loadingProgress * 3.6}deg, #171717 0deg)` }} >
            <div className="loader-value">{loadingProgress}%</div>
            <img src="/assets/images/namy_logo.svg" style={{ height: '20%', position: 'relative', zIndex: 10001 }} alt="logo" />
            </div>
        </div>
      )}

      <div className="mobile-top-gradient"></div>

      <div className="view-resume">
        <a href="./resume" target="_blank" rel="noreferrer">
          <div id="resume-btn-text" className="hide-mobile">VIEW RESUME </div>
          <div id="resume-btn-text-show" className = "hide-tab hide-desktop ">CV</div>
          <img src="/assets/images/resume_arrow.svg" className="asset-tracker" style={{ transform: 'rotate(90deg)' }} alt="arrow" />
        </a>
      </div>

      <div className="left-sticky-logo">
        <img src="/assets/images/namy_logo.svg" className="asset-tracker" style={{ height: '100%' }} alt="logo" />
      </div>

      <div className="left-sticky-menu hide-tab hide-mobile">
        <div className="side-bar-logo-container">
          <a href="https://dribbble.com/Namrata_Jaiswal" target="_blank" rel="noreferrer">
            <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/dribble_inactive.svg" alt="dribbble" />
            <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/dribble_active.svg" alt="dribbble" />
          </a>
        </div>
        <div className="side-bar-logo-container">
          <a href="https://www.behance.net/namrata_jaiswal" target="_blank" rel="noreferrer">
            <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/behance_inactive.svg" alt="behance" />
            <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/behance_active.svg" alt="behance" />
          </a>
        </div>
        <div className="side-bar-logo-container">
          <a href="https://www.linkedin.com/in/namrata-jaiswal-213449197/" target="_blank" rel="noreferrer">
            <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/linkedin_inactive.svg" alt="linkedin" />
            <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/linkedin_active.svg" alt="linkedin" />
          </a>
        </div>
      </div>

      <div className="left-sticky-menu-2">
        {/* Exact duplicate of above for menu-2 */}
        <div className="side-bar-logo-container-2">
          <a href="https://dribbble.com/Namrata_Jaiswal" target="_blank" rel="noreferrer">
            <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/dribble_inactive.svg" alt="dribbble" />
            <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/dribble_active.svg" alt="dribbble" />
          </a>
        </div>
        <div className="side-bar-logo-container-2">
          <a href="https://www.behance.net/namrata_jaiswal" target="_blank" rel="noreferrer">
            <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/behance_inactive.svg" alt="behance" />
            <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/behance_active.svg" alt="behance" />
          </a>
        </div>
        <div className="side-bar-logo-container-2">
          <a href="https://www.linkedin.com/in/namrata-jaiswal-213449197/" target="_blank" rel="noreferrer">
            <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/linkedin_inactive.svg" alt="linkedin" />
            <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/linkedin_active.svg" alt="linkedin" />
          </a>
        </div>
      </div>

      <div className="header_menu">
        <ul className="header_menu_list ul__reset">
          <li className="header_menu_item js-cursor-contract" id="about-list-btn">
            <a href="#page-2" className="text-uppercase has-tag-handle">
              <span className="header_menu_item_inner">
                <span className="header_menu_item_link header_menu_item_link__inactive">About</span>
                <span className="header_menu_item_link header_menu_item_link__active">About</span>
              </span>
            </a>
          </li>
          <li className="header_menu_item js-cursor-contract" id="work-list-btn">
            <a href="#page-7" className="text-uppercase has-tag-handle">
              <span className="header_menu_item_inner">
                <span className="header_menu_item_link header_menu_item_link__inactive">Work</span>
                <span className="header_menu_item_link header_menu_item_link__active">Work</span>
              </span>
            </a>
          </li>
          <li className="header_menu_item js-cursor-contract" id="contact-list-btn">
            <a href="#page-11" className="text-uppercase has-tag-handle">
              <span className="header_menu_item_inner">
                <span className="header_menu_item_link header_menu_item_link__inactive">Contact</span>
                <span className="header_menu_item_link header_menu_item_link__active">Contact</span>
              </span>
            </a>
          </li>
        </ul>
      </div>


      {/* ── Main Scrollable Container ─────────────────────────────────────── */}
      <div className="scrollable-container" id="myScrollableDiv" ref={scrollableRef} style={{ display: 'block' }}>
        <canvas id="mainCanvas" ref={mainCanvasRef}></canvas>
        
        <div className="slider-screen-container">
          <div className="slider top-slider"><p className="landing-header" id="landing-header-top">NAMRATA</p></div>
          <div className="slider bottom-slider">
            <p className="landing-header" id="landing-header-bottom">NAMRATA</p>
            <div className="bottom-slider-img">
              <img src="/assets/images/scroll_text.svg" className="slide-down-text asset-tracker" alt="scroll" />
              <img src="/assets/images/scroll_arrow.svg" className="slide-down-arrow asset-tracker" alt="arrow" />
            </div>
          </div>
        </div>
        
        <div className="page" id="page-1"></div>
        
        <div className="page" id="page-2">
          <video id="page-2-video" className="asset-tracker" autoPlay muted loop>
            <source src="/assets/videos/fabric.mp4" type="video/mp4" />
          </video>
          <div id="page-2-video-overlay-main">
            <canvas id="meshCanvas" ref={meshCanvasRef}></canvas>
          </div>
          <div id="page-2-video-overlay-1">
            <div className="page-2-content-container"></div>
          </div>
          <div id="page-2-video-overlay-2">
            <img id="awards-img" className="asset-tracker" src="/assets/images/awards.webp" alt="awards" />
            <div id="page-2-video-overlay-2-main-overlay"></div>
            <div className="page-2-video-overlay-2-content">
              <div className="circular-stamp-container">
                <a href="#page-11">
                  <img src="/assets/images/circle-text.svg" className="asset-tracker" id="page-2-circular-text" alt="circle text" />
                  <div className="circular-stamp-arrow-container">
                    <img src="/assets/images/circle-arrow.svg" className="asset-tracker" id="page-2-circular-arrow" alt="arrow" />
                  </div>
                </a>
              </div>
              <div id="a-a-text">
                <div className="full-width-container">AWARDS</div>
                <div className="full-width-container">/ ACHIEVEMENTS</div>
              </div>
            </div>
          </div>
        </div>

        <div className="page" id="page-3">
          <div className="page-container">
            <div className="page-header">ABOUT ME<span className="page-header-symbol">✦</span> </div>
            <div className="page-3-text">
              <ScrollHighlight
                start="top 95%"
                end="bottom 90%"
                scrub={0.5}
                activeColor="#E0DFBF"
                inactiveColor="rgba(224, 223, 191, 0.16)"
                inlineHighlightColor="#F67C29"
                className="page-3-text"
                scroller="#myScrollableDiv"
              >
                I am a <Highlight>Product Designer,</Highlight> selectively skilled & intentionally thorough because pretty without purpose is just a wallpaper
              </ScrollHighlight>
            </div>
          </div>
        </div>

        <div className="page" id="page-4">
          <div className="page-container" style={{ padding: '0px', width: '100%', paddingBottom : '30vh' }}>
            <div id="page-4-header">WHAT I DO<span className="page-header-symbol">✦</span> </div>
            <div id="page-4-selector-container">
              <div className="what-i-do-selector">
                <ScrollHighlight
                  start="top 95%"
                  end="bottom 90%"
                  scrub={0.5}
                  activeColor="#E0DFBF"
                  inactiveColor="rgba(224, 223, 191, 0.16)"
                  inlineHighlightColor="#F67C29"
                  className="what-i-do-text"
                  scroller="#myScrollableDiv"
                >
                  WIREFRAME
              </ScrollHighlight>
                <div className="hover-highlight"> Now AI does the digging, competitors, patterns, user data. I do the thinking. Surprisingly, prompts can't replace that yet</div>
                <div className="hover-aboslute-bg"></div>
              </div>
              <div className="what-i-do-selector">
                <ScrollHighlight
                  start="top 95%"
                  end="bottom 90%"
                  scrub={0.5}
                  activeColor="#E0DFBF"
                  inactiveColor="rgba(224, 223, 191, 0.16)"
                  inlineHighlightColor="#F67C29"
                  className="what-i-do-text"
                  scroller="#myScrollableDiv"
                >
                  VISUAL
                </ScrollHighlight>
                <div className="hover-highlight"> Moodboards consumed, references digested, trends ignored. What comes out is mine, not a Dribbble copy with a new palette</div>
                <div className="hover-aboslute-bg"></div>
              </div>
              <div className="what-i-do-selector">
                <ScrollHighlight
                  start="top 95%"
                  end="bottom 90%"
                  scrub={0.5}
                  activeColor="#E0DFBF"
                  inactiveColor="rgba(224, 223, 191, 0.16)"
                  inlineHighlightColor="#F67C29"
                  className="what-i-do-text"
                  scroller="#myScrollableDiv"
                >
                  MOTION
                </ScrollHighlight>
                <div className="hover-highlight"> Motion isn't decoration. It's the difference<br />between a screen that works and one that feels alive</div>
                <div className="hover-aboslute-bg"></div>
              </div>
              <div className="what-i-do-selector">
                <ScrollHighlight
                  start="top 95%"
                  end="bottom 90%"
                  scrub={0.5}
                  activeColor="#E0DFBF"
                  inactiveColor="rgba(224, 223, 191, 0.16)"
                  inlineHighlightColor="#F67C29"
                  className="what-i-do-text"
                  scroller="#myScrollableDiv"
                >
                  INTERACTION
                </ScrollHighlight>
                <div className="hover-highlight"> The first interaction is never the right one. I iterate until it feels like it couldn't have existed any other way</div>
                <div className="hover-aboslute-bg"></div>
              </div>
              <div className="what-i-do-selector">
                <ScrollHighlight
                  start="top 95%"
                  end="bottom 90%"
                  scrub={0.5}
                  activeColor="#E0DFBF"
                  inactiveColor="rgba(224, 223, 191, 0.16)"
                  inlineHighlightColor="#F67C29"
                  className="what-i-do-text"
                  scroller="#myScrollableDiv"
                >
                  USER TESTING
                </ScrollHighlight>
                <div className="hover-highlight"> Shipped isn't done. User interviews, A/B tests, dev & PM follow-ups. I stick around until the numbers have something to say</div>
                <div className="hover-aboslute-bg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="page" id="page-5">
          <div className="page-container" >
            <div className="page-header" style={{ color: '#ABABAB' }}>EXPERIENCE<span className="page-header-symbol">✦</span> </div>
            <div id="page-5-text">
              <ScrollHighlight
                start="top 95%"
                end="bottom 90%"
                scrub={0.5}
                activeColor="#E0DFBF"
                inactiveColor="rgba(224, 223, 191, 0.16)"
                inlineHighlightColor="#F67C29"
                className="page-5-text"
                scroller="#myScrollableDiv"
              >
                <Highlight>5+ years</Highlight> of shaping digital products while navigating the beautiful mess of Indian startups
              </ScrollHighlight>
            </div>
          </div>
        </div>

        <div className="page" id="page-6">
          <div className="page-container" >
            <div id="page-6-header">HISTORY<span className="page-header-symbol">✦</span></div>
            <div id="page-6-selector-container">
              {/* History Item 1 */}
              <div className="history-selector">
                <div className="history-text">
                  <div className="history-text-date">NOW</div>
                  <div className="history-text-exp">
                    <div className="exp-text">Product Designer</div>
                    <div className="exp-desc">Ionic Wealth by AngelOne</div>
                    <div className="exp-desc-hover">Witnessed the AI breakthrough era here, alongside the team of 4</div>
                  </div>
                </div>
                <div className="hover-aboslute-bg"></div>
              </div>
              {/* History Item 2 */}
              <div className="history-selector">
                <div className="history-text">
                  <div className="history-text-date">2023</div>
                  <div className="history-text-exp">
                    <div className="exp-text">Product Designer </div>
                    <div className="exp-desc">Flobiz</div>
                    <div className="exp-desc-hover">First time experience working with an organised product team</div>
                  </div>
                </div>
                <div className="hover-aboslute-bg"></div>
              </div>
              {/* History Item 3 */}
              <div className="history-selector">
                <div className="history-text">
                  <div className="history-text-date">2021</div>
                  <div className="history-text-exp">
                    <div className="exp-text">Associate Product Designer</div>
                    <div className="exp-desc">Goldsetu</div>
                    <div className="exp-desc-hover">Worked alongside an amazing designer who helped me build a strong design foundation</div>
                  </div>
                </div>
                <div className="hover-aboslute-bg"></div>
              </div>
              {/* History Item 4 */}
              <div className="history-selector">
                <div className="history-text">
                  <div className="history-text-date" style={{ paddingTop : '6px' }}>2020</div>
                  <div className="history-text-exp">
                    <div className="exp-text">UI/ UX Designer</div>
                    <div className="exp-desc">Galleri5</div>
                    <div className="exp-desc-hover">Grateful to the founder who trusted a newbie with their product, worked closely with the CTO</div>
                  </div>
                </div>
                <div className="hover-aboslute-bg"></div>
              </div>
              {/* History Item 5 */}
              <div className="history-selector">
                <div className="history-text">
                  <div className="history-text-date"  style={{ paddingTop : '6px' }}>2019</div>
                  <div className="history-text-exp">
                    <div className="exp-text">Stylist/ Graphic Designer</div>
                    <div className="exp-desc">Aditya Birla Fashion And Retail</div>
                    <div className="exp-desc-hover">First experience with a startup, the merging point</div>
                  </div>
                </div>
                <div className="hover-aboslute-bg"></div>
              </div>
            </div>
          </div>
        </div>

       <div className="page" id="page-7">
          <div className="page-7-container" id="page-7-container-1">
            <div className="page-header" id="page-7-page-header">CASE STUDIES<span className="page-header-symbol">✦</span> </div>
            <div className="page-7-content-container" id="e-invoice-content">
              <div className="app-image-container">
                <Link to="/mybillbook" className="app-image-link">
                  <picture>
                    {/* Image for Mobile/Tablet */}
                    <source media="(max-width: 600px)" srcSet="/assets/images/MyBillBook.webp" />
                    {/* Default Image for Desktop */}
                    <img className="app-image asset-tracker" src="/assets/images/e-invoice.webp" alt="e-invoice" />
                  </picture>
                </Link>
              </div>
            </div>
            <div id="page-7-blurred-bg-1" className="page-7-blurred-bg"></div>
          </div>
          
          <div className="page-7-container" id="page-7-container-2" style={{ alignItems: 'center' }}>
            <div className="page-7-content-container" id="digi-gold-content">
              <div className="app-image-container">
                <Link to="/goldsetu" className="app-image-link">
                  <picture>
                    {/* Image for Mobile/Tablet */}
                    <source media="(max-width: 600px)" srcSet="/assets/images/GoldSetu.webp" />
                    {/* Default Image for Desktop */}
                    <img className="app-image asset-tracker" src="/assets/images/digi-gold.webp" alt="digi-gold" />
                  </picture>
                </Link>
              </div>
            </div>
            <div id="page-7-blurred-bg-2" className="page-7-blurred-bg"></div>
          </div>
          
          <div className="page-7-container" id="page-7-container-3" style={{ alignItems: 'center' }}>
            <div className="page-7-content-container" id="groc-content">
              <div className="app-image-container">
                <Link to="/group-orders" className="app-image-link">
                  <picture>
                    {/* Image for Mobile/Tablet */}
                    <source media="(max-width: 600px)" srcSet="/assets/images/Personal.webp" />
                    {/* Default Image for Desktop */}
                    <img className="app-image asset-tracker" src="/assets/images/group-order.webp" alt="group-order" />
                  </picture>
                </Link>
              </div>
            </div>
            <div id="page-7-blurred-bg-3" className="page-7-blurred-bg"></div>
          </div>
        </div>

        <div className="page" id="page-8">
          <div className="page-container" style={{ position: 'absolute', top: 0, left: 0 }}>
            <div id="page-8-header">WHAT THEY SAID<span className="page-header-symbol">✦</span></div>
            
            <div id="page-8-container">
              <div id="page-8-quote-container" >
                <img className="asset-tracker" src="/assets/images/open_quotes.svg" alt="quote" />
              </div>
              
              <div id="page-8-text-container">
                <div id="page-8-main-text">
                  {activeFeedback === 'sid' && (
                    <ScrollHighlight
                      start="top 95%"
                      end="bottom 90%"
                      scrub={0.5}
                      activeColor="#E0DFBF"
                      inactiveColor="rgba(224, 223, 191, 0.16)"
                      inlineHighlightColor="#F67C29"
                      className="page-5-text"
                      scroller="#myScrollableDiv"
                    >
                      Her balance of creativity and practicality made her indespensable
                    </ScrollHighlight>
                    )}
                  {activeFeedback === 'kevin' && (
                    <ScrollHighlight
                      start="top 90%"
                      end="bottom 70%"
                      scrub={0.5}
                      activeColor="#E0DFBF"
                      inactiveColor="rgba(224, 223, 191, 0.16)"
                      inlineHighlightColor="#F67C29"
                      className="page-5-text"
                      scroller="#myScrollableDiv"
                    >
                      Her energy is contagious & she’s always up for any challenge
                    </ScrollHighlight>
                    )}
                  {activeFeedback === 'shankar' && (
                    <ScrollHighlight
                      start="top 90%"
                      end="bottom 70%"
                      scrub={0.5}
                      activeColor="#E0DFBF"
                      inactiveColor="rgba(224, 223, 191, 0.16)"
                      inlineHighlightColor="#F67C29"
                      className="page-5-text"
                      scroller="#myScrollableDiv"
                    >
                      Exceptional problem solver with a keen eye for detail
                    </ScrollHighlight>
                    )}
                </div>
                <div id="page-8-name-text">
                  {activeFeedback === 'sid' && "Siddharth Seth"}
                  {activeFeedback === 'kevin' && "Kevin"}
                  {activeFeedback === 'shankar' && "Shankar"}
                </div>
                <div id="page-8-role-text-1">
                  {activeFeedback === 'sid' && "VP of Products"}
                  {activeFeedback === 'kevin' && "Senior Designer"}
                  {activeFeedback === 'shankar' && "Founding Designer"}
                </div>
                <div id="page-8-role-text-2">
                  {activeFeedback === 'sid' && "Flobiz"}
                  {activeFeedback === 'kevin' && "Flobiz"}
                  {activeFeedback === 'shankar' && "Goldsetu"}
                </div>
              </div>
              
              <div id="page-8-selector-container">
                <div className="feedback-selector-container" onMouseOver={() => setActiveFeedback('sid')}>
                  <img className="feedback-arrow asset-tracker" style={{ display: activeFeedback === 'sid' ? 'block' : 'none' }} src="/assets/images/left_arrow_selector.svg" alt="arrow" />
                  <img className="feedback-img asset-tracker" src={activeFeedback === 'sid' ? "/assets/images/sid_active.svg" : "/assets/images/sid_inactive.svg"} alt="sid" />
                </div>
                <div className="feedback-selector-container" onMouseOver={() => setActiveFeedback('kevin')}>
                  <img className="feedback-arrow asset-tracker" style={{ display: activeFeedback === 'kevin' ? 'block' : 'none' }} src="/assets/images/left_arrow_selector.svg" alt="arrow" />
                  <img className="feedback-img asset-tracker" src={activeFeedback === 'kevin' ? "/assets/images/kevin_active.svg" : "/assets/images/kevin_inactive.svg"} alt="kevin" />
                </div>
                <div className="feedback-selector-container" onMouseOver={() => setActiveFeedback('shankar')}>
                  <img className="feedback-arrow asset-tracker" style={{ display: activeFeedback === 'shankar' ? 'block' : 'none' }} src="/assets/images/left_arrow_selector.svg" alt="arrow" />
                  <img className="feedback-img asset-tracker" src={activeFeedback === 'shankar' ? "/assets/images/shankar_active.svg" : "/assets/images/shankar_inactive.svg"} alt="shankar" />
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div className="page" id="page-9">
          
          <div className="page-container making-container">
          <div id="page-9-header">MAKING OF ME <span className="page-header-symbol">✦</span></div>
            <div className="making-grid">
              
              <div className="making-row-1">
                <div className="img-wrapper">
                  <img className="art-c asset-tracker" src="/assets/images/creativity-art.webp" alt="Art" />
                  <p className="making-text">Creativity</p>
                </div>
                
                <div className="making-symbol hide-tab hide-desktop">×</div>

                <div className="img-wrapper">
                  <img className="art-ps asset-tracker" src="/assets/images/psychology-art.webp" alt="Art" />
                  <p className="making-text" >Psychology</p>
                </div>

                <div className="making-symbol hide-desktop">×</div>
                

                <div className="img-wrapper">
                  <img className="art-pa asset-tracker" src="/assets/images/patterns-art.webp" alt="Art" />
                  <p className="making-text" >Patterns</p>
                </div>
              </div>
              <div className="making-row-2" >
                <p className="making-text">Creativity</p>
                <div className="making-symbol">×</div>
                <p className="making-text" >Psychology</p>
                <div className="making-symbol">×</div>
                <p className="making-text" >Patterns</p>
              </div>
              {/* Equation & Product Design */}
              <div className="making-row-3">
                <img className="asset-tracker hide-desktop hide-mobile" src="/assets/images/product-design-art.webp" alt="Venn Diagram" />
                <div className="making-symbol">=</div>
                <div className="making-text text-orange hide-mobile">Product Design</div>
                <img className="asset-tracker hide-tab" src="/assets/images/product-design-art.webp" alt="Venn Diagram" />
                <div className="making-text text-orange hide-tab hide-desktop">Product Design</div>
              </div>
              
            </div>
          </div>
        </div>

        <div className="page" id="page-10">
          <div className="page-container" style={{ flexDirection: 'column', rowGap: 0 }}>
            <div id="page-10-header">EXPLORATIONS<span className="page-header-symbol">✦</span></div>
            <div id="page-10-text">MY PLAYGROUND </div>
            <div id="page-10-gallery-container" data-animated="true">
              <div id="page-10-gallery">
                {[1, 2].map((iteration) => (
                  <Fragment key={iteration}>

                    {/* 1. Ionic Wealth */}
                    <a href="https://ionic.in/" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/ionic_wealth.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/ionic_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Jun '25 &bull;</span>
                        <h3 className="p10-title">Fintech Marketing Webpage</h3>
                        <span className="p10-skills">UI &bull; IA &bull; Interaction &bull; Motion &bull; Responsive</span>
                      </div>
                    </a>

                    {/* 2. Flobiz */}
                    <a href="https://www.figma.com/design/HnD750utdXv8PfigcrKYRQ/Flobiz-Revamp" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/flobiz.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/flobiz_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Aug '23 &bull;</span>
                        <h3 className="p10-title">Business Management WebApp</h3>
                        <span className="p10-skills">Visual Identity &bull; UI/UX &bull; Illustration &bull; Design System &bull; IA</span>
                      </div>
                    </a>

                    {/* 3. Galleri5 */}
                    <a href="https://dribbble.com/shots/18515848-Campaign-Management-Platform" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <picture>
                        <source media="(max-width: 768px)" srcSet="/assets/images/g5_mobile.png" />
                        <img className="page-10-card-content asset-tracker" src="/assets/images/g5.png" alt="Galleri5" />
                      </picture>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Jul '20 &bull;</span>
                        <h3 className="p10-title">Influencer Management Platform</h3>
                        <span className="p10-skills">UI/UX &bull; IA</span>
                      </div>
                    </a>

                    {/* 4. Get Fit */}
                    <a href="https://www.figma.com/design/jv3VP6AdVlLa3szqqB7G8y/Get-fit?node-id=0-1&t=U4um4kw8KIAv81r9-1" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/getfit.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/getfit_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Oct '24 &bull;</span>
                        <h3 className="p10-title">Fitness App</h3>
                        <span className="p10-skills">Visual Identity &bull; UI/UX</span>
                      </div>
                    </a>

                    {/* 5. Covet */}
                    <a href="https://www.behance.net/gallery/149906219/Covet-Magical-Potions" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <picture>
                        <source media="(max-width: 768px)" srcSet="/assets/images/covet_mobile.png" />
                        <img className="page-10-card-content asset-tracker" src="/assets/images/covet.png" alt="Covet" />
                      </picture>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Aug '22 &bull;</span>
                        <h3 className="p10-title">E-commerce Webpage</h3>
                        <span className="p10-skills">Visual Identity &bull; IA &bull; UI/UX</span>
                      </div>
                    </a>

                    {/* 6. Wellness Pro */}
                    <a href="https://www.figma.com/design/agglKv6liBYos4tO16qwXt/Wellness-PRO?node-id=0-1&t=hfR1BUu1OPb5oBzS-1" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/wellnesspro.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/wellnesspro_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Oct '24 &bull;</span>
                        <h3 className="p10-title">Fitness App Marketing Webpage</h3>
                        <span className="p10-skills">Visual Identity &bull; UI &bull; IA &bull; Motion &bull; Prototype</span>
                      </div>
                    </a>

                    {/* 7. NYC Skyline */}
                    <a href="https://dribbble.com/shots/13921738-NYC-Skyline-Sketch" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <picture>
                        <source media="(max-width: 768px)" srcSet="/assets/images/nyc_skyline_mobile.png" />
                        <img className="page-10-card-content asset-tracker" src="/assets/images/city_scape.png" alt="NYC Skyline" />
                      </picture>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Jun '21 &bull;</span>
                        <h3 className="p10-title">NYC Skyline</h3>
                        <span className="p10-skills">Illustration</span>
                      </div>
                    </a>

                    {/* 8. Wellthy */}
                    <a href="https://dribbble.com/shots/18535381-Health-Medication-Tracker" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/wellthy.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/wellthy_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Aug '20 &bull;</span>
                        <h3 className="p10-title">Healthcare Mobile App</h3>
                        <span className="p10-skills">Visual Identity &bull; IA &bull; UI/UX &bull; Motion &bull; Prototype</span>
                      </div>
                    </a>

                    {/* 9. Goldsetu */}
                    <a href="https://www.figma.com/design/IRoViMR4f9QFnIeGtw4dp7/Goldsetu-Website-Design--Resume-Link?node-id=0-1&t=EK7WVK1WmZ3Pu3JL-1" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/goldsetu.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/goldsetu_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Nov '21 &bull;</span>
                        <h3 className="p10-title">SaaS Marketing Webpage</h3>
                        <span className="p10-skills">UI &bull; IA &bull; Responsive &bull; Design System</span>
                      </div>
                    </a>

                    {/* 10. Ezsplit */}
                    <a href="https://www.behance.net/gallery/146569409/Expense-Sharing-App" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/ezsplit.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/ezsplit_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Jan '20 &bull;</span>
                        <h3 className="p10-title">Expense Sharing App</h3>
                        <span className="p10-skills">Visual &bull; UI/UX &bull; Experience</span>
                      </div>
                    </a>   

                     {/* 11. Bytflakes (Hashhealth) */}
                    <a href="https://dribbble.com/shots/18544189-Hashhealth" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/bytflakes.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/bytflakes_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Oct '21 &bull;</span>
                        <h3 className="p10-title">Healthcare Appointment App</h3>
                        <span className="p10-skills">Visual Identity &bull; IA &bull; UI/UX</span>
                      </div>
                    </a> 

                    {/* 12. Fraple */}
                    <a href="https://www.behance.net/gallery/147704601/Mobile-App-Design" className="page-10-video" target="_blank" rel="noreferrer" aria-hidden={iteration === 2}>
                      <video className="page-10-card-content asset-tracker page-10-video-desktop" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/fraple.mp4" type="video/mp4" />
                      </video>
                      <video className="page-10-card-content asset-tracker page-10-video-mobile" autoPlay loop muted playsInline style={{ pointerEvents: 'none' }}>
                        <source src="/assets/videos/fraple_mobile.mp4" type="video/mp4" />
                      </video>
                      <div className="page-10-overlay">
                        <span className="p10-meta">&bull; Dec '22 &bull;</span>
                        <h3 className="p10-title">Grocery Delivery App</h3>
                        <span className="p10-skills">Visual Identity &bull; IA &bull; UI/UX &bull; Prototype</span>
                      </div>
                    </a>
         
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="page" id="page-11">
          <div className="page-container">
            <div id="page-11-content">
              <img src="/assets/images/connect.svg" className="asset-tracker" style={{ objectFit: 'cover', height: '100%' }} alt="connect" />
            </div>
            <div id="page-11-footer">
              <div id="page-11-footer-left">Say Hello</div>
              <div id="page-11-footer-right">
                <a href="mailto:namy.designwork@gmail.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <div className="contact-info">
                    Email<br />
                    <span className="contact-text">
                      namy.designwork@gmail.com 
                      <img className="asset-tracker" src="/assets/images/resume-page-arrow.svg" style={{ marginLeft: '4px' }} alt="arrow" />
                    </span>
                  </div>
                </a>
                <div className="contact-info" style={{ marginLeft: '40px' }}>
                  Contact<br />
                  <span className="contact-text">+91 9956906247</span>
                </div>

                <div className="fixed-sticky-menu hide-desktop">
                  <div className="side-bar-logo-container">
                    <a href="https://dribbble.com/Namrata_Jaiswal" target="_blank" rel="noreferrer">
                      <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/dribble_inactive.svg" alt="dribbble" />
                      <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/dribble_active.svg" alt="dribbble" />
                    </a>
                  </div>
                  <div className="side-bar-logo-container">
                    <a href="https://www.behance.net/namrata_jaiswal" target="_blank" rel="noreferrer">
                      <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/behance_inactive.svg" alt="behance" />
                      <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/behance_active.svg" alt="behance" />
                    </a>
                  </div>
                  <div className="side-bar-logo-container">
                    <a href="https://www.linkedin.com/in/namrata-jaiswal-213449197/" target="_blank" rel="noreferrer">
                      <img className="left-sticky-menu-img-inactive asset-tracker" src="/assets/images/linkedin_inactive.svg" alt="linkedin" />
                      <img className="left-sticky-menu-img-active asset-tracker" src="/assets/images/linkedin_active.svg" alt="linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}