var scrollableDiv = document.getElementById('myScrollableDiv');

scrollableDiv.addEventListener('scroll', function() {
    var scrollPosition = scrollableDiv.scrollTop;
    var topSlider = document.querySelector('.top-slider');
    var bottomSlider = document.querySelector('.bottom-slider');
    var sliderDiv = document.querySelector('.slider-screen-container');
    var windowHeight = window.innerHeight;

    if (scrollPosition >= windowHeight) {
        sliderDiv.style.zIndex = '0';
    }
    else {
        sliderDiv.style.zIndex = '1';
    }

    // Move the top part up and the bottom part down based on scroll position
    topSlider.style.transform = 'translateY(' + (-scrollPosition / 2) + 'px)';
    bottomSlider.style.transform = 'translateY(' + (scrollPosition / 2) + 'px)';
    
});
  

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
    feedbackContentMainTextDiv.innerHTML = "She has been a standout member of our team";
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
        progressBar.style.background = `conic-gradient(#F67C29 ${progress * 3.6}deg, #171717 0deg)`;
        loaderText.textContent = `${progress}%`;
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