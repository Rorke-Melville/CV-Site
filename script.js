// Get the canvas element and its context
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the viewport
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Line class to represent each line
class Line {
  constructor(x, y, angle, speed, color, curved, length) {
    this.x = x; // Starting x-coordinate
    this.y = y; // Starting y-coordinate
    this.angle = angle; // Angle of movement (in radians)
    this.speed = speed; // Speed of movement
    this.color = color; // Color of the line
    this.curved = curved; // Whether the line is curved
    this.length = length; // Length of the line
  }

  // Draw the line on the canvas
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    if (this.curved) {
      // Draw a curved line
      const controlX = this.x + Math.cos(this.angle) * (this.length * 0.5); // Control point at half the length
      const controlY = this.y + Math.sin(this.angle) * (this.length * 0.5);
      const endX = this.x + Math.cos(this.angle) * this.length; // End point at full length
      const endY = this.y + Math.sin(this.angle) * this.length;

      ctx.moveTo(this.x, this.y);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    } else {
      // Draw a straight line
      const endX = this.x + Math.cos(this.angle) * this.length; // End point at full length
      const endY = this.y + Math.sin(this.angle) * this.length;

      ctx.moveTo(this.x, this.y);
      ctx.lineTo(endX, endY);
    }

    ctx.stroke();
  }

  // Update the position of the line
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Wrap around the edges of the canvas
    if (this.x > canvas.width + this.length) this.x = -this.length;
    if (this.x < -this.length) this.x = canvas.width + this.length;
    if (this.y > canvas.height + this.length) this.y = -this.length;
    if (this.y < -this.length) this.y = canvas.height + this.length;
  }
}

// Create an array of lines
const lines = [];
function createLines(count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random HSL color
    const curved = Math.random() > 0.5; // 50% chance of being curved
    const length = Math.random() * 800 + 100; // Random length between 100 and 400

    // Calculate starting position off-screen
    let x, y;
    if (Math.random() > 0.5) {
      // Start from left or right
      x = angle > Math.PI / 2 && angle < 3 * Math.PI / 2 ? -length : canvas.width + length;
      y = Math.random() * canvas.height;
    } else {
      // Start from top or bottom
      x = Math.random() * canvas.width;
      y = angle > Math.PI ? -length : canvas.height + length;
    }

    lines.push(new Line(x, y, angle, speed, color, curved, length));
  }
}
createLines(50); // Create 50 lines initially

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  lines.forEach(line => {
    line.update(); // Update the line's position
    line.draw(); // Draw the line
  });
  requestAnimationFrame(animate); // Loop the animation
}
animate(); // Start the animation

// Select the navbar element
const navbar = document.getElementById('custom-navbar');

// Add an event listener for scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    // Show the navbar when scrolled down more than 50px
    navbar.classList.add('show');
  } else {
    // Hide the navbar when at the top of the page
    navbar.classList.remove('show');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Typewriter Effect for Hero Section
  const texts = ["Hi, I'm Rorke Melville", "I build things for the web."];
  const elements = document.querySelectorAll('.typewriter');
  const button = document.getElementById('learn-more-btn'); // Target the button

  let currentTextIndex = 0;

  // Function to type text
  const typeText = (element, text) => {
    let textIndex = 0;

    const typeCharacter = () => {
      if (textIndex < text.length) {
        element.textContent += text.charAt(textIndex);
        textIndex++;
        setTimeout(typeCharacter, 75); // Adjust typing speed here
      } else {
        currentTextIndex++;
        if (currentTextIndex === texts.length) {
          // Trigger the button fade-up effect after all texts are typed
          setTimeout(() => {
            button.classList.add('active'); // Add the 'active' class to trigger the animation
          }, 500); // Delay before fading up the button
        }
      }
    };

    typeCharacter();
  };

  // Loop through each typewriter element and start typing
  elements.forEach((element, index) => {
    setTimeout(() => {
      typeText(element, texts[index]);
    }, index * 2000); // Delay between typing each text
  });

  // Smooth Scroll and Wobble Effect for About Section
  const learnMoreBtn = document.getElementById('learn-more-btn');
  const aboutSection = document.getElementById('about');

  learnMoreBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    // Smoothly scroll to the #about section
    aboutSection.scrollIntoView({ behavior: 'smooth' });

    // Add a wobble effect once the section is in view
    setTimeout(() => {
      aboutSection.classList.add('wobble');
      // Remove the wobble class after the animation ends
      setTimeout(() => {
        aboutSection.classList.remove('wobble');
      }, 500); // Match the duration of the wobble animation
    }, 500); // Delay to ensure the scroll completes before wobbling

    // Add fade-in effect for the about-content
    setTimeout(() => {
      const aboutContent = document.querySelector('#about');
      aboutContent.classList.add('active');
    }, 500); // Delay to ensure the wobble effect completes
  });

  // New functionality: Show 'About Me' when scrolled into view
  function handleScroll() {
    const rect = aboutSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= viewportHeight / 2) {
      aboutSection.classList.add('active');
      // Remove the scroll event listener once the section becomes visible
      window.removeEventListener('scroll', handleScroll);
    }
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});

// Before-and-After Sliders
document.querySelectorAll('.slider').forEach(slider => {
  const target = slider.dataset.target;
  const afterImage = document.querySelector(`.${target} .after-image`);

  // Set initial slider value to 35%
  slider.value = 35;

  // Update clip-path based on initial value
  afterImage.style.clipPath = `inset(0 ${100 - slider.value}% 0 0)`;

  slider.addEventListener('input', () => {
    const sliderValue = slider.value;
    afterImage.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
  });
});

// Video Modal
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.querySelector('.close-modal');

// Open Modal
document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    const videoSrc = thumbnail.dataset.video;
    modalVideo.src = `assets/${videoSrc}`;
    videoModal.style.display = 'flex';
  });
});

// Close Modal
closeModal.addEventListener('click', () => {
  videoModal.style.display = 'none';
  modalVideo.pause();
  modalVideo.currentTime = 0;
});

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
});

// Accordion Functionality
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {

    const content = header.nextElementSibling; // Get the associated content
    if (!content || !content.classList.contains('accordion-content')) {
      return;
    }

    // Close all other accordions
    document.querySelectorAll('.accordion-header').forEach(otherHeader => {
      if (otherHeader !== header) {
        otherHeader.classList.remove('open'); // Remove 'open' class from other headers
        const otherContent = otherHeader.nextElementSibling;
        if (otherContent && otherContent.classList.contains('accordion-content')) {
          otherContent.classList.remove('open'); // Remove 'open' class from other contents
          otherContent.style.maxHeight = null; // Reset max-height instead of setting to '0'
        }
      }
    });

    // Toggle the clicked accordion
    const isOpen = header.classList.toggle('open'); // Toggle the 'open' class on the header

    // Toggle the 'open' class on the content
    content.classList.toggle('open', isOpen);

    // Adjust max-height dynamically based on content height
    if (isOpen) {
      content.style.maxHeight = `${content.scrollHeight}px`; // Expand to fit content
    } else {
      content.style.maxHeight = null; // Reset max-height to allow collapsing
    }
  });
});

// Close the offcanvas and remove the backdrop when a link inside it is clicked
document.addEventListener('DOMContentLoaded', function () {
  const offcanvas = document.getElementById('offcanvas');
  const links = offcanvas.querySelectorAll('.dropdown-item');

  links.forEach(link => {
    link.addEventListener('click', function () {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide(); // Programmatically close the offcanvas

        // Wait for the offcanvas to fully hide before removing the backdrop
        offcanvas.addEventListener('hidden.bs.offcanvas', function () {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove(); // Remove the backdrop element
          }
        });
      }
    });
  });
});