// Function to fetch the image list from the JSON file
function fetchImageList(jsonPath, callback) {
  fetch(jsonPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON file");
      }
      return response.json();
    })
    .then((data) => {
      callback(data); // Pass the image list to the callback
    })
    .catch((error) => console.error("Error loading image list:", error));
}

// Function to populate the gallery dynamically
function populateGallery(sectionId, images) {
  const section = document.querySelector(`#${sectionId} .gallery-grid`);
  if (!section) return;

  images.forEach((image, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = `compressed images/${image}`; // Path to the image
    imgElement.alt = image.split(".")[0]; // Use filename as alt text
    imgElement.className = "gallery-image";
    imgElement.dataset.index = index; // Store the index of the image
    section.appendChild(imgElement);

    // Add click event to open lightbox
    imgElement.addEventListener("click", () => openLightbox(index, images));
  });
}

// Open lightbox with full-size image
function openLightbox(index, images) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

  // Set the full-size image in the lightbox
  lightboxImage.src = `compressed images/${images[index]}`;
  lightbox.style.display = "flex";

  // Set up navigation buttons
  setupNavigation(index, images);
}

// Close the lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
}

// Set up navigation (prev/next buttons)
function setupNavigation(index, images) {
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // GSAP animation for button clicks
  const buttonClickAnimation = (button) => {
    gsap.fromTo(button, { scale: 1 }, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
  };

  // Previous image
  prevButton.onclick = () => {
    buttonClickAnimation(prevButton);
    index = (index === 0) ? images.length - 1 : index - 1;
    document.getElementById("lightbox-image").src = `compressed images/${images[index]}`;
  };

  // Next image
  nextButton.onclick = () => {
    buttonClickAnimation(nextButton);
    index = (index === images.length - 1) ? 0 : index + 1;
    document.getElementById("lightbox-image").src = `compressed images/${images[index]}`;
  };
}

// Close lightbox when clicked outside the image
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeLightbox();
  }
});

// Fetch the image list and populate the gallery
fetchImageList("js/images.json", (imageList) => {
  populateGallery("all-cars", imageList); // Populate "all-cars" section with images
});
