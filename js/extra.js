const textScrollers = document.querySelectorAll(".moving-text");

function addRevolvingTextAnimation() {
  textScrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".revolving-text");
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

addRevolvingTextAnimation();

document.addEventListener("DOMContentLoaded", function () {
  const video1 = document.getElementById('swiggy-prototype-video-1');
  const video2 = document.getElementById('swiggy-prototype-video-2');

  // Keep track of which video is currently playing
  let currentVideo = null;
  let isPlaying = false;

  // Intersection Observer options
  const options = {
      root: null,  // Use the viewport as the container
      rootMargin: '0px',
      threshold: 0.5  // Play video when 50% of it is visible
  };

  // Function to play videos sequentially
  function playSequentially() {
      if (!isPlaying) {
          if (currentVideo === video1 || currentVideo === null) {
              currentVideo = video1;
              video1.play();
              isPlaying = true;
          } else if (currentVideo === video2) {
              currentVideo = video2;
              video2.play();
              isPlaying = true;
          }
      }
  }

  // Callback for Intersection Observer
  const callback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              if (!isPlaying) {
                  playSequentially();
              }
          } else {
              entry.target.pause();  // Pause video when out of view
              isPlaying = false;
          }
      });
  };

  // Create the Intersection Observer
  const observer = new IntersectionObserver(callback, options);

  // Observe both videos
  observer.observe(video1);
  observer.observe(video2);

  // Event listener for when video1 ends
  video1.addEventListener('ended', () => {
      video1.pause();  // Pause video1
      isPlaying = false;  // Reset playing state
      currentVideo = video2;  // Set next video to video2
      playSequentially();  // Start video2
  });

  // Event listener for when video2 ends
  video2.addEventListener('ended', () => {
      video2.pause();  // Pause video2
      isPlaying = false;  // Reset playing state
      currentVideo = video1;  // Set next video to video1
      playSequentially();  // Start video1
  });
});