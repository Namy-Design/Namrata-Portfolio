var scrollableDiv = document.getElementById('myScrollableDiv');

// ── Smooth scroll ──────────────────────────────────────────────────────────
const lenis = new Lenis({
    wrapper: scrollableDiv,
    content: scrollableDiv,
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    syncTouch: false,
    touchMultiplier: 2,
});

gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({ scroller: scrollableDiv });
lenis.on('scroll', ScrollTrigger.update);
// ───────────────────────────────────────────────────────────────────────────

const scrollHighlightSections = [
    { element: document.getElementById('page-3-text'), words: [] },
    { element: document.getElementById('page-5-text'), words: [] }
];

function buildScrollHighlightWords(node, accentWord) {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.match(/(\S+|\s+)/g).map((token) => {
            if (/\s+/.test(token)) {
                return document.createTextNode(token);
            }

            const word = document.createElement('span');
            word.className = accentWord ? 'scroll-highlight-word scroll-highlight-accent' : 'scroll-highlight-word';
            word.textContent = token;

            return word;
        });
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const isAccentWord = accentWord || node.classList.contains('scroll-highlight-accent');
        return Array.from(node.childNodes).flatMap((childNode) => buildScrollHighlightWords(childNode, isAccentWord));
    }

    return [];
}

function setupScrollHighlightSection(section) {
    if (!section.element) {
        return;
    }

    const highlightLines = Array.from(section.element.querySelectorAll('.scroll-highlight-line'));

    highlightLines.forEach((line) => {
        const fragment = document.createDocumentFragment();
        const wordNodes = Array.from(line.childNodes).flatMap((childNode) => buildScrollHighlightWords(childNode, false));

        wordNodes.forEach((wordNode) => {
            fragment.appendChild(wordNode);
        });

        line.replaceChildren(fragment);
    });

    section.words = Array.from(section.element.querySelectorAll('.scroll-highlight-word'));
}

function setupGSAPHighlight(section) {
    if (!section.element || !section.words.length) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section.element,
            start: 'top 82%',
            end: 'top 22%',
            scrub: true,
        }
    });

    section.words.forEach((word) => {
        tl.fromTo(word,
            { '--word-progress': 0 },
            { '--word-progress': 1, ease: 'none', duration: 1 }
        );
    });
}

var _currentScrollY = 0;

function handleScrollEffects(scrollPosition) {
    _currentScrollY = scrollPosition !== undefined ? scrollPosition : scrollableDiv.scrollTop;
    var topSlider = document.querySelector('.top-slider');
    var bottomSlider = document.querySelector('.bottom-slider');
    var sliderDiv = document.querySelector('.slider-screen-container');
    var windowHeight = window.innerHeight;

    if (_currentScrollY >= windowHeight) {
        sliderDiv.style.zIndex = '0';
    } else {
        sliderDiv.style.zIndex = '1';
    }

    topSlider.style.transform = 'translateY(' + (-_currentScrollY / 2) + 'px)';
    bottomSlider.style.transform = 'translateY(' + (_currentScrollY / 2) + 'px)';

}

scrollHighlightSections.forEach(setupScrollHighlightSection);
scrollHighlightSections.forEach(setupGSAPHighlight);

// Drive slider parallax from Lenis so it runs on the smoothed position
lenis.on('scroll', ({ scroll }) => handleScrollEffects(scroll));
  

const canvas_page_1 = document.getElementById('meshCanvas');
const ctx_page_1 = canvas_page_1.getContext('2d');

// Set canvas size
canvas_page_1.width = window.innerWidth;
canvas_page_1.height = window.innerHeight;

const main_canvas = document.getElementById('mainCanvas');
const main_ctx = main_canvas.getContext('2d');

// Set canvas size
main_canvas.width = window.innerWidth;
main_canvas.height = 13.6 * window.innerHeight;

// Function to draw horizontal and vertical lines
function drawMesh(canvas, ctx) {
    const lineColor = '#282828'; // Color of the mesh lines

    // Draw horizontal lines
    for (let y = 0; y < canvas.height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    }

    // Draw vertical lines
    for (let x = 0; x < canvas.width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = lineColor;
    ctx.stroke();
    }
}

// Initial draw
drawMesh(canvas_page_1, ctx_page_1);
drawMesh(main_canvas, main_ctx);

// Redraw on window resize
window.addEventListener('resize', () => {
    canvas_page_1.width = window.innerWidth;
    canvas_page_1.height = window.innerHeight;
    drawMesh(canvas_page_1, ctx_page_1);

    main_canvas.width = window.innerWidth;
    main_canvas.height = scrollableDiv.style.height;
    drawMesh(main_canvas, main_ctx);
});

handleScrollEffects();


const hoverfeedbackSidImageDiv = document.getElementById('sid-img');
const hoverfeedbackKevImageDiv = document.getElementById('kevin-img');
const hoverfeedbackShankImageDiv = document.getElementById('shankar-img');
const hoverfeedbackSidArrowDiv = document.getElementById('sid-arrow');
const hoverfeedbackKevArrowDiv = document.getElementById('kevin-arrow');
const hoverfeedbackShankArrowDiv = document.getElementById('shankar-arrow');
const feedbackContentMainTextDiv = document.getElementById('page-8-main-text');
const feedbackContentNameTextDiv = document.getElementById('page-8-name-text');
const feedbackContentRoleTextDiv1 = document.getElementById('page-8-role-text-1');
const feedbackContentRoleTextDiv2 = document.getElementById('page-8-role-text-2');

hoverfeedbackSidImageDiv.addEventListener('mouseover', () => {
    feedbackContentMainTextDiv.innerHTML = "Her balance of creativity and practicality made her indespensable";
    feedbackContentNameTextDiv.innerHTML = "Siddharth Seth";
    feedbackContentRoleTextDiv1.innerHTML = "VP of Products";
    feedbackContentRoleTextDiv2.innerHTML = "Flobiz"
    hoverfeedbackSidImageDiv.src = "assets/images/sid_active.svg";
    hoverfeedbackKevImageDiv.src = "assets/images/kevin_inactive.svg";
    hoverfeedbackShankImageDiv.src = "assets/images/shankar_inactive.svg";
    hoverfeedbackSidArrowDiv.style.display = "block";
    hoverfeedbackKevArrowDiv.style.display = "none";
    hoverfeedbackShankArrowDiv.style.display = "none";
});

hoverfeedbackKevImageDiv.addEventListener('mouseover', () => {
    feedbackContentMainTextDiv.innerHTML = "Her energy is contagious & she’s always up for any challenge";
    feedbackContentNameTextDiv.innerHTML = "Kevin";
    feedbackContentRoleTextDiv1.innerHTML = "Senior Designer";
    feedbackContentRoleTextDiv2.innerHTML = "Flobiz"
    hoverfeedbackSidImageDiv.src = "assets/images/sid_inactive.svg";
    hoverfeedbackKevImageDiv.src = "assets/images/kevin_active.svg";
    hoverfeedbackShankImageDiv.src = "assets/images/shankar_inactive.svg";
    hoverfeedbackSidArrowDiv.style.display = "none";
    hoverfeedbackKevArrowDiv.style.display = "block";
    hoverfeedbackShankArrowDiv.style.display = "none";
});

hoverfeedbackShankImageDiv.addEventListener('mouseover', () => {
    feedbackContentMainTextDiv.innerHTML = "Exceptional problem solver with a keen eye for detail";
    feedbackContentNameTextDiv.innerHTML = "Shankar";
    feedbackContentRoleTextDiv1.innerHTML = "Founding Designer";
    feedbackContentRoleTextDiv2.innerHTML = "Goldsetu"
    hoverfeedbackSidImageDiv.src = "assets/images/sid_inactive.svg";
    hoverfeedbackKevImageDiv.src = "assets/images/kevin_inactive.svg";
    hoverfeedbackShankImageDiv.src = "assets/images/shankar_active.svg";
    hoverfeedbackSidArrowDiv.style.display = "none";
    hoverfeedbackKevArrowDiv.style.display = "none";
    hoverfeedbackShankArrowDiv.style.display = "block";
});

const scrollers = document.querySelectorAll("#page-10-gallery-container");

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector("#page-10-gallery");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

addAnimation();

document.addEventListener('DOMContentLoaded', () => {
    const page7Container1Element = document.querySelector('#page-7-container-1');
    const page7BlurredBackground1 = document.querySelector('#page-7-blurred-bg-1')

    const page7Container1observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page7BlurredBackground1.style.opacity = 1;
            }
            else {
                page7BlurredBackground1.style.opacity = 0;
            }
        });
    }, {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
    });

    page7Container1observer.observe(page7Container1Element);

    const page7Container2Element = document.querySelector('#page-7-container-2');
    const page7BlurredBackground2 = document.querySelector('#page-7-blurred-bg-2')

    const page7Container2observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page7BlurredBackground2.style.opacity = 1;
            }
            else {
                page7BlurredBackground2.style.opacity = 0;
            }
        });
    }, {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
    });

    page7Container2observer.observe(page7Container2Element);

    const page7Container3Element = document.querySelector('#page-7-container-3');
    const page7BlurredBackground3 = document.querySelector('#page-7-blurred-bg-3')

    const page7Container3observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page7BlurredBackground3.style.opacity = 1;
            }
            else {
                page7BlurredBackground3.style.opacity = 0;
            }
        });
    }, {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
    });

    page7Container3observer.observe(page7Container3Element);

    const progressBar = document.querySelector('.circular-loader');
    const loaderText = document.querySelector('.loader-value');
    const loaderPage = document.querySelector('.loading-page');
    const assets = document.querySelectorAll('.asset-tracker');

    let loadedAssets = 0;
    const totalAssets = 44; // +1 for the font

    // Function to update the progress bar
    function updateProgress() {
        loadedAssets++;
        // console.log(totalAssets);
        // console.log(loadedAssets);
        const progress = Math.floor((loadedAssets / totalAssets) * 100);
        setTimeout(function() {
            progressBar.style.background = `conic-gradient(#F67C29 ${progress * 3.6}deg, #171717 0deg)`;
            loaderText.textContent = `${progress}%`;
        }, 800);
        // Hide loading screen when all assets are loaded
        if (loadedAssets === (totalAssets-2)) {
            setTimeout(function() {
                progressBar.style.background = `conic-gradient(#F67C29 360deg, #171717 0deg)`;
                loaderText.textContent = `100%`;
            }, 1000);
            setTimeout(function() {
                loaderPage.style.display = 'none';
            }, 1500);
        }
    }
    
    // Check if the asset is already loaded (cached)
    function checkAssetStatus(asset) {
        if (asset.tagName === 'IMG' || asset.tagName === 'VIDEO') {
            if (asset.complete) {
                updateProgress();
            } else {
                asset.addEventListener('load', updateProgress);
                asset.addEventListener('error', updateProgress); // Count errors as loaded to avoid stalling
            }
        }

        if (asset.tagName === 'SCRIPT') {
            if (asset.readyState === 'complete' || asset.readyState === 'loaded') {
                updateProgress();
            } else {
                asset.addEventListener('load', updateProgress);
            }
        }
    }

    // Track when each asset is loaded or already cached
    assets.forEach(asset => checkAssetStatus(asset));

    // Track font loading using the FontFaceSet API
    document.fonts.ready.then(function() {
        updateProgress();  // Call this when fonts are ready
    });
});