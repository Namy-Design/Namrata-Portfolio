import React, { useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ScrollHighlight.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollHighlightProps {
  children: React.ReactNode;
  className?: string;
  scroller?: string | Element | null;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  activeColor?: string;
  inactiveColor?: string;
  inlineHighlightColor?: string;
}

interface WordData {
  id: string;
  text: string;
  isHighlight: boolean;
}

export const Highlight = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const ScrollHighlight: React.FC<ScrollHighlightProps> = ({
  children,
  className = '',
  scroller,
  start = 'top 80%',
  end = '+=50%',
  scrub = 0.5,
  activeColor = '#E0DFBF',
  inactiveColor = 'rgba(224, 223, 191, 0.16)',
  inlineHighlightColor = '#F67C29',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // We now track the wrappers (for measuring geometry) and active layers (for animating)
  const wrapperRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const activeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Parse children into a trackable array of words
  const words = useMemo<WordData[]>(() => {
    const result: WordData[] = [];
    let idCounter = 0;

    const processString = (str: string, isHighlight: boolean) => {
      const splitWords = str.split(/\s+/).filter(w => w.length > 0);
      splitWords.forEach(w => {
        result.push({ id: `w_${idCounter++}`, text: w, isHighlight });
      });
    };

    React.Children.forEach(children, (child) => {
      if (typeof child === 'string') {
        processString(child, false);
      } else if (React.isValidElement(child)) {
        const childElement = child as React.ReactElement<any>;
        if (typeof childElement.props.children === 'string') {
          processString(childElement.props.children, true);
        }
      }
    });
    return result;
  }, [children]);

  // Core Animation Setup
  const setupAnimation = useCallback(() => {
    if (!containerRef.current || wrapperRefs.current.length === 0) return;

    if (timelineRef.current) timelineRef.current.kill();

    // Reset active layers to be 100% hidden (clipped from the right)
    gsap.set(activeRefs.current, { clipPath: 'inset(0% 100% 0% 0%)' });

    // A. Detect Rendered Lines based on the wrapper's top position
    const lines: { wrapper: HTMLSpanElement; activeLayer: HTMLSpanElement }[][] = [];
    let currentLine: { wrapper: HTMLSpanElement; activeLayer: HTMLSpanElement }[] = [];
    let currentTop = -1;
    const threshold = 5;

    wrapperRefs.current.forEach((wrapperEl, index) => {
      const activeLayer = activeRefs.current[index];
      if (!wrapperEl || !activeLayer) return;
      
      const top = wrapperEl.getBoundingClientRect().top;

      if (currentTop === -1) {
        currentTop = top;
        currentLine.push({ wrapper: wrapperEl, activeLayer });
      } else if (Math.abs(top - currentTop) <= threshold) {
        currentLine.push({ wrapper: wrapperEl, activeLayer });
      } else {
        lines.push(currentLine);
        currentLine = [{ wrapper: wrapperEl, activeLayer }];
        currentTop = top;
      }
    });
    if (currentLine.length > 0) lines.push(currentLine);

    // B. Build timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: scroller || undefined,
        start: start,
        end: end,
        scrub: scrub,
        markers: false
      }
    });

    // Sequence the animation horizontally across every word
    lines.forEach((line) => {
      line.forEach(({ wrapper, activeLayer }) => {
        // Measure the physical width of the word to normalize scroll velocity
        const width = wrapper.getBoundingClientRect().width || 1;
        
        tl.to(activeLayer, {
          clipPath: 'inset(0% 0% 0% 0%)', // Reveal from left to right
          ease: 'none',
          duration: width 
        }, '>');
      });
    });

    timelineRef.current = tl;
    ScrollTrigger.refresh();
  }, [start, end, scrub, scroller]);

  // Handle Resize and Init
  useGSAP(() => {
    document.fonts.ready.then(setupAnimation);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupAnimation, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [setupAnimation]);

  return (
    <p
      ref={containerRef}
      className={`scroll-highlight-wrapper ${className}`}
      style={{
        '--active-color': activeColor,
        '--inactive-color': inactiveColor,
        '--inline-highlight-color': inlineHighlightColor
      } as React.CSSProperties}
    >
      {words.map((word, i) => {
        const activeCssColor = word.isHighlight 
          ? 'var(--inline-highlight-color)' 
          : 'var(--active-color)';

        return (
          <React.Fragment key={word.id}>
            {/* The wrapper handles normal document flow and word wrapping */}
            <span
              ref={el => { wrapperRefs.current[i] = el; }}
              className="scroll-word-wrapper"
            >
              {/* Bottom Layer: Inactive Text */}
              <span className="scroll-word-inactive">
                {word.text}
              </span>
              
              {/* Top Layer: Active Text (Initially masked out) */}
              <span
                ref={el => { activeRefs.current[i] = el; }}
                className="scroll-word-active"
                style={{ color: activeCssColor }}
              >
                {word.text}
              </span>
            </span>
            {' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};