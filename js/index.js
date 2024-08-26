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

// document.addEventListener('DOMContentLoaded', function () {
//     // Target the div you want to observe
//     var targetDiv = document.querySelector('.top-slider');
//     var sliderDiv = document.querySelector('.slider-screen-container')
//     // Options for the Intersection Observer
//     var options = {
//       root: null, // Use the viewport as the root
//       rootMargin: '0px', // No margin around the root
//       threshold: 0.5, // Trigger when 50% of the target is visible
//     };
  
//     // Create an Intersection Observer
//     var observer = new IntersectionObserver(handleIntersection, options);
  
//     // Start observing the target div
//     observer.observe(targetDiv);
  
//     // Function to handle intersection changes
//     function handleIntersection(entries, observer) {
//       entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//             console.log("intersection")
//             sliderDiv.style.zIndex = '1';
//         } else {
//             console.log("out of view")
//             // The target div is out of view
//             // Remove the component or perform any action you want
//             sliderDiv.style.zIndex = '0';
//         }
//       });
//     }
//   });
  

const canvas_page_1 = document.getElementById('meshCanvas');
const ctx_page_1 = canvas_page_1.getContext('2d');

// Set canvas size
canvas_page_1.width = window.innerWidth;
canvas_page_1.height = window.innerHeight;

const main_canvas = document.getElementById('mainCanvas');
const main_ctx = main_canvas.getContext('2d');

// Set canvas size
main_canvas.width = window.innerWidth;
main_canvas.height = 10.3 * window.innerHeight;

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


// // JavaScript code to handle hover effect
// document.getElementById('e-invoice-content').addEventListener('mouseenter', function() {
//     document.getElementById('page-7-bg').style.backgroundImage = 'url(assets/images/e-invoice.png)';
//     document.getElementById('page-7-bg').style.backgroundSize = 'cover';
//     document.getElementById('page-7-bg').style.backgroundRepeat = 'no-repeat';
//     document.getElementById('page-7-bg').style.backgroundPosition = 'center center';
//     document.getElementById('page-7-bg').style.filter = 'blur(400px)';
//     document.getElementById('page-7-bg').style.transition = 'background-image 0.2s ease'
//   });

// // JavaScript code to handle hover effect
// document.getElementById('digi-gold-content').addEventListener('mouseenter', function() {
//     document.getElementById('page-7-bg').style.backgroundImage = 'url(assets/images/digi-gold.png)';
//     document.getElementById('page-7-bg').style.backgroundSize = 'cover';
//     document.getElementById('page-7-bg').style.backgroundRepeat = 'no-repeat';
//     document.getElementById('page-7-bg').style.backgroundPosition = 'center center';
//     document.getElementById('page-7-bg').style.filter = 'blur(400px)';
//     document.getElementById('page-7-bg').style.transition = 'background-image 0.2s ease'
//   });

// // JavaScript code to handle hover effect
// document.getElementById('groc-content').addEventListener('mouseenter', function() {
//     document.getElementById('page-7-bg').style.backgroundImage = 'url(assets/images/delivery.png)';
//     document.getElementById('page-7-bg').style.backgroundSize = 'cover';
//     document.getElementById('page-7-bg').style.backgroundRepeat = 'no-repeat';
//     document.getElementById('page-7-bg').style.backgroundPosition = 'center center';
//     document.getElementById('page-7-bg').style.filter = 'blur(400px)';
//     document.getElementById('page-7-bg').style.transition = 'background-image 0.2s ease'

//   });

