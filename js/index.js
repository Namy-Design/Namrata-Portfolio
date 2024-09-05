
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

    // screen_height = window.innerHeight;
    // activate_threshold = (0.09 * screen_height);
    // deactivate_threshold = -(0.01 * screen_height)
    
    // var aboutTargetDiv = document.getElementById('about-list-btn');
    // var aboutTriggerSection = document.getElementById('page-2');
    // // Get the position of the trigger section
    // var aboutTriggerPosition = aboutTriggerSection.getBoundingClientRect().top;
    // if (aboutTriggerPosition <= activate_threshold & aboutTriggerPosition >= deactivate_threshold) {
    //     aboutTargetDiv.querySelector('.header_menu_item_link__inactive').style.transform = 'translateY(-100%)';
    //     aboutTargetDiv.querySelector('.header_menu_item_link__active').style.transform = 'translateY(0)';
    // } else {
    //     aboutTargetDiv.querySelector('.header_menu_item_link__inactive').style.transform = 'translateY(0)';
    //     aboutTargetDiv.querySelector('.header_menu_item_link__active').style.transform = 'translateY(-100%)';
    // }

    // var workTargetDiv = document.getElementById('work-list-btn');
    // var workTriggerSection = document.getElementById('page-7');
    // // Get the position of the trigger section
    // var workTriggerPosition = workTriggerSection.getBoundingClientRect().top;
    // if (workTriggerPosition <= activate_threshold & workTriggerPosition >= deactivate_threshold) {
    //     workTargetDiv.querySelector('.header_menu_item_link__inactive').style.transform = 'translateY(-100%)';
    //     workTargetDiv.querySelector('.header_menu_item_link__active').style.transform = 'translateY(0)';
    // } else {
        
    // }

    // var contactTargetDiv = document.getElementById('contact-list-btn');
    // var contactTriggerSection = document.getElementById('page-11');  
    // // Get the position of the trigger section
    // var contactTriggerPosition = contactTriggerSection.getBoundingClientRect().top;
    // if (contactTriggerPosition <= activate_threshold & contactTriggerPosition >= deactivate_threshold) {
    //     contactTargetDiv.querySelector('.header_menu_item_link__inactive').style.transform = 'translateY(-100%)';
    //     contactTargetDiv.querySelector('.header_menu_item_link__active').style.transform = 'translateY(0)';
    // } else {
        
    // }
    
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
main_canvas.height = 13.3 * window.innerHeight;

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
    feedbackContentMainTextDiv.innerHTML = "She has been a <br> standout member <br> of our team";
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
    feedbackContentMainTextDiv.innerHTML = "Her energy is contagious <br> & she’s always up for <br> any challenge";
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
    feedbackContentMainTextDiv.innerHTML = "Exceptional problem solver <br> with a keen eye for detail";
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
    const page3textElement = document.querySelector('#page-3-colored-text');
    const page5textElement = document.querySelector('#page-5-colored-text')

    const page3observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page3textElement.classList.add('animate');
            }
            else {
                page3textElement.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
    });

    const page5observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                page5textElement.classList.add('animate');
            }
            else {
                page5textElement.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.2 // Trigger when at least 20% of the element is visible
    });

    page3observer.observe(page3textElement);
    page5observer.observe(page5textElement);
});