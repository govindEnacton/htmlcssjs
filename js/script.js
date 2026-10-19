// 1. CAROUSEL
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let current = 0;
let timer;

function showSlide(index) {
  if (index >= slides.length) index = 0;      // wrap forward
  if (index < 0) index = slides.length - 1;   // wrap backward
  current = index;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

// Auto-advance every 4 seconds
function startAutoPlay() {
  timer = setInterval(function () {
    showSlide(current + 1);
  }, 4000);
}

document.querySelector(".carousel-btn.next").addEventListener("click", function () {
  clearInterval(timer);
  showSlide(current + 1);
  startAutoPlay();
});

document.querySelector(".carousel-btn.prev").addEventListener("click", function () {
  clearInterval(timer);
  showSlide(current - 1);
  startAutoPlay();
});

// Pause auto-play while the mouse is over the carousel, resume when it leaves
let carouselBox = document.querySelector(".carousel-box");

carouselBox.addEventListener("mouseenter", function () {
  clearInterval(timer);
});

carouselBox.addEventListener("mouseleave", function () {
  clearInterval(timer);
  startAutoPlay();
});

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    clearInterval(timer);
    showSlide(i);
    startAutoPlay();
  });
}

startAutoPlay();

// 2. GALLERY - the data lives here in an array, the page renders it
let galleryData = [
  {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Orkide_i_finstua_mot_vest.jpg/1280px-Orkide_i_finstua_mot_vest.jpg",
    alt: "Orchids growing indoors"
  },
  {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_rubiginosa_1.jpg/1280px-Rosa_rubiginosa_1.jpg",
    alt: "Pink rose in bloom"
  },
  {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Split_Aloe.jpg/1280px-Split_Aloe.jpg",
    alt: "Aloe succulent"
  },
  {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Almondsbury.garden.centre.arp.jpg/1280px-Almondsbury.garden.centre.arp.jpg",
    alt: "Inside a garden centre"
  },
  {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/%22Meillandine%22_Rose_in_clay_pot.jpg/1280px-%22Meillandine%22_Rose_in_clay_pot.jpg",
    alt: "Rose in a clay pot"
  },
  {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Flower_garden%2C_Botanic_Gardens%2C_Churchtown_2.JPG/1280px-Flower_garden%2C_Botanic_Gardens%2C_Churchtown_2.JPG",
    alt: "Flower garden display"
  }
];

let galleryGrid = document.querySelector(".gallery-grid");

// Builds the gallery photos from the array above
function renderGallery(items) {
  let html = "";

  for (let i = 0; i < items.length; i++) {
    html += '<div class="gallery-item">' +
              '<img src="' + items[i].image + '" alt="' + items[i].alt + '" class="gallery-img">' +
            '</div>';
  }

  galleryGrid.innerHTML = html;
}

renderGallery(galleryData);

// 3. GALLERY LIGHTBOX
let galleryImages = document.querySelectorAll(".gallery-img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.querySelector(".lightbox-img");
let lightboxIndex = 0;

function openLightbox(index) {
  lightboxIndex = index;
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  lightbox.classList.add("open");
}

function changeLightbox(step) {
  lightboxIndex = lightboxIndex + step;
  if (lightboxIndex >= galleryImages.length) lightboxIndex = 0;
  if (lightboxIndex < 0) lightboxIndex = galleryImages.length - 1;
  lightboxImg.src = galleryImages[lightboxIndex].src;
  lightboxImg.alt = galleryImages[lightboxIndex].alt;
}

for (let i = 0; i < galleryImages.length; i++) {
  galleryImages[i].addEventListener("click", function () {
    openLightbox(i);
  });
}

document.querySelector(".lightbox-next").addEventListener("click", function () {
  changeLightbox(1);
});

document.querySelector(".lightbox-prev").addEventListener("click", function () {
  changeLightbox(-1);
});

document.querySelector(".lightbox-close").addEventListener("click", function () {
  lightbox.classList.remove("open");
});

// Click on the dark background (not on an image/button) also closes it
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) lightbox.classList.remove("open");
});

document.addEventListener("keydown", function (event) {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") lightbox.classList.remove("open");
  if (event.key === "ArrowRight") changeLightbox(1);
  if (event.key === "ArrowLeft") changeLightbox(-1);
});

// 4. CONTACT FORM VALIDATION (mock - nothing is sent)
function validateEmail(email) {
  // Basic email shape check: something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

let form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page reload

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let valid = true;

  // Clear previous messages
  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("message-error").textContent = "";
  document.getElementById("form-success").textContent = "";

  if (name === "") {
    document.getElementById("name-error").textContent = "Please enter your name.";
    valid = false;
  }

  if (email === "") {
    document.getElementById("email-error").textContent = "Please enter your email.";
    valid = false;
  } else if (!validateEmail(email)) {
    document.getElementById("email-error").textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (message === "") {
    document.getElementById("message-error").textContent = "Please enter a message.";
    valid = false;
  }

  if (valid) {
    document.getElementById("form-success").textContent =
      "Thanks, " + name + "! Your message has been received.";
    form.reset();
  }
});

// 5. HAMBURGER MENU (mobile nav)
let hamburger = document.querySelector(".hamburger");
let navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Close the menu after tapping a link
navLinks.addEventListener("click", function (event) {
  if (event.target.tagName === "A") navLinks.classList.remove("open");
});

// 6. SCROLL SPY - highlight the nav link of the section in view
let sections = document.querySelectorAll("section[id]");
let links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  let pos = window.pageYOffset + 140; // allow for the sticky header

  for (let i = 0; i < sections.length; i++) {
    let sec = sections[i];
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      for (let j = 0; j < links.length; j++) {
        links[j].classList.toggle("active", links[j].getAttribute("href") === "#" + sec.id);
      }
      break;
    }
  }
});

// 7. MENU - the data lives here in an array, the page renders it
let menuData = [
  {
    name: "Monstera Deliciosa",
    price: "$25",
    category: "indoor",
    badge: "Best Seller",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Monstera_deliciosa2.jpg/1280px-Monstera_deliciosa2.jpg",
    alt: "Monstera Deliciosa",
    desc: "Large split leaves that instantly green up a room."
  },
  {
    name: "Snake Plant",
    price: "$18",
    category: "indoor",
    badge: "Easy Care",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/1280px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg",
    alt: "Snake Plant",
    desc: "Almost impossible to kill - perfect for beginners."
  },
  {
    name: "Peace Lily",
    price: "$22",
    category: "indoor",
    badge: "Air Purifying",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg",
    alt: "Peace Lily",
    desc: "Glossy leaves and white blooms, happy in low light."
  },
  {
    name: "Rose Plant",
    price: "$30",
    category: "outdoor",
    badge: "Popular",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_rubiginosa_1.jpg/1280px-Rosa_rubiginosa_1.jpg",
    alt: "Rose Plant",
    desc: "Classic blooms with a lovely fragrance."
  },
  {
    name: "Marigold Tray",
    price: "$12",
    category: "outdoor",
    badge: "Seasonal",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Tagetes_erecta_chendumalli_chedi.jpg/1280px-Tagetes_erecta_chendumalli_chedi.jpg",
    alt: "Marigold Tray",
    desc: "Six seedlings, ready to plant in the garden."
  },
  {
    name: "Lavender Plant",
    price: "$28",
    category: "outdoor",
    badge: "Bee Friendly",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/1280px-Single_lavender_flower02.jpg",
    alt: "Lavender Plant",
    desc: "Fragrant purple blooms that bees and butterflies love."
  },
  {
    name: "Potting Soil 5kg",
    price: "$15",
    category: "care",
    badge: "Essential",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Potting_soil.jpg",
    alt: "Potting Soil",
    desc: "Rich mix for indoor and outdoor plants."
  },
  {
    name: "Watering Can",
    price: "$20",
    category: "care",
    badge: "Gift Idea",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/MetalwateringcansDec08.jpg/1280px-MetalwateringcansDec08.jpg",
    alt: "Watering Can",
    desc: "1.5L steel can with a fine rose spout."
  },
  {
    name: "Ceramic Pot",
    price: "$14",
    category: "care",
    badge: "Handmade",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/%22Meillandine%22_Rose_in_clay_pot.jpg/1280px-%22Meillandine%22_Rose_in_clay_pot.jpg",
    alt: "Ceramic Pot",
    desc: "Hand-glazed pot with a drainage hole."
  }
];

let menuGrid = document.querySelector(".menu-grid");

// Builds the menu cards from the array above
function renderMenu(items) {
  let html = "";

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    html += '<div class="menu-item" data-category="' + item.category + '">' +
              '<img src="' + item.image + '" alt="' + item.alt + '">' +
              '<div class="menu-item-body">' +
                '<div class="menu-head">' +
                  '<span>' + item.name + '</span>' +
                  '<span class="price">' + item.price + '</span>' +
                '</div>' +
                '<p class="desc">' + item.desc + '</p>' +
                '<div class="menu-foot">' +
                  '<span class="badge">' + item.badge + '</span>' +
                  '<button type="button" class="btn btn-sm enquire-btn">Enquire</button>' +
                '</div>' +
              '</div>' +
            '</div>';
  }

  menuGrid.innerHTML = html;
}

renderMenu(menuData);

// Filter tabs re-render the grid with only the matching items
let tabs = document.querySelectorAll(".menu-tab");

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function () {
    for (let t = 0; t < tabs.length; t++) tabs[t].classList.remove("active");
    tabs[i].classList.add("active");

    let filter = tabs[i].getAttribute("data-filter");
    let filtered = menuData.filter(function (item) {
      return filter === "all" || item.category === filter;
    });
    renderMenu(filtered);
  });
}

// 8. TESTIMONIALS - data array + continuous slider
let testiData = [
  {
    quote: "My monstera arrived healthy and even bigger than in the photos. The staff told me exactly how to water it.",
    initials: "PS",
    author: "No One",
    role: "Regular Customer",
    stars: "★★★★★"
  },
  {
    quote: "They helped me pick low-light plants for my flat. Three months later every one of them is still thriving.",
    initials: "RM",
    author: "Rahul M.",
    role: "Useless",
    stars: "★★★★★"
  },
  {
    quote: "Always friendly advice and good potting soil. My balcony finally looks like a little garden.",
    initials: "AK",
    author: "Anita K.",
    role: "Local Resident",
    stars: "★★★★★"
  }
];

let testiTrack = document.querySelector(".testi-track");

// Builds the review cards from the array above
function renderTestimonials(items) {
  let html = "";

  for (let i = 0; i < items.length; i++) {
    let t = items[i];
    html += '<div class="testi-card">' +
              '<p class="testi-quote">"' + t.quote + '"</p>' +
              '<div class="testi-avatar">' + t.initials + '</div>' +
              '<h3 class="testi-author">' + t.author + '</h3>' +
              '<p class="testi-role">' + t.role + '</p>' +
              '<p class="stars">' + t.stars + '</p>' +
            '</div>';
  }

  testiTrack.innerHTML = html;
}

renderTestimonials(testiData);

let testiCards = document.querySelectorAll(".testi-card"); // the real cards
let testiTotal = testiCards.length;

// Copy every card once and put the copies at the end of the track.
// When "next" reaches these copies the slider looks identical to card 1,
// so we can jump back invisibly - that is what makes the loop continuous.
for (let c = 0; c < testiTotal; c++) {
  testiTrack.appendChild(testiCards[c].cloneNode(true));
}

let testiIndex = 0;
let testiTimer;
let testiMoving = false; // true while a slide animation is running

function moveTestimonials() {
  testiTrack.style.transform = "translateX(-" + testiIndex * 100 + "%)";
}

// Jump without animation - used to reset the loop invisibly
function snapTestimonials() {
  testiTrack.style.transition = "none";
  moveTestimonials();
  testiTrack.offsetWidth; // force a reflow so the jump happens immediately
}

function animateTestimonials() {
  testiMoving = true;
  testiTrack.style.transition = "transform 0.5s ease";
  moveTestimonials();
}

function nextTestimonial() {
  if (testiMoving) return; // ignore clicks until the current slide settles
  testiIndex = testiIndex + 1;
  animateTestimonials();
}

function prevTestimonial() {
  if (testiMoving) return;
  if (testiIndex === 0) {
    testiIndex = testiTotal; // last clone = same picture as the first card
    snapTestimonials();
  }
  testiIndex = testiIndex - 1;
  animateTestimonials();
}

// When the slide finishes: unlock, and quietly jump back to the matching real card
testiTrack.addEventListener("transitionend", function () {
  testiMoving = false;

  if (testiIndex >= testiTotal) {
    testiIndex = testiIndex - testiTotal;
    snapTestimonials();
  }
});

document.querySelector(".testi-next").addEventListener("click", function () {
  clearInterval(testiTimer);
  nextTestimonial();
  startTestiAuto();
});

document.querySelector(".testi-prev").addEventListener("click", function () {
  clearInterval(testiTimer);
  prevTestimonial();
  startTestiAuto();
});

function startTestiAuto() {
  clearInterval(testiTimer);
  testiTimer = setInterval(nextTestimonial, 5000);
}

let testiBox = document.querySelector(".testi-box");

testiBox.addEventListener("mouseenter", function () {
  clearInterval(testiTimer);
});

testiBox.addEventListener("mouseleave", function () {
  startTestiAuto();
});

startTestiAuto();

// 9. FAQ - the data lives here in an array, the page renders it
let faqData = [
  {
    question: "Do you offer delivery?",
    answer: "Yes, we deliver plants within 10 km of the shop for a small fee."
  },
  {
    question: "Do you have low-maintenance plants?",
    answer: "Yes, snake plants, pothos and succulents are great for beginners."
  },
  {
    question: "Can you help me choose the right plants?",
    answer: "Absolutely, our staff will match plants to your light and space."
  },
  {
    question: "Do you sell pots and soil?",
    answer: "Yes, we stock pots, potting soil and fertiliser for every kind of plant."
  }
];

let faqList = document.querySelector(".faq-list");

// Builds the questions from the array above
function renderFaq(items) {
  let html = "";

  for (let i = 0; i < items.length; i++) {
    html += '<details>' +
              '<summary>' + items[i].question + '</summary>' +
              '<p>' + items[i].answer + '</p>' +
            '</details>';
  }

  faqList.innerHTML = html;
}

renderFaq(faqData);

// Only one answer open at a time: opening one closes the others
faqList.addEventListener("click", function (event) {
  if (event.target.tagName !== "SUMMARY") return;

  let opened = event.target.parentElement;
  let allItems = faqList.querySelectorAll("details");

  for (let i = 0; i < allItems.length; i++) {
    if (allItems[i] !== opened) allItems[i].removeAttribute("open");
  }
});

// 10. ENQUIRE MODAL + TOAST (mock - nothing is sent)
let orderModal = document.getElementById("order-modal");
let orderImg = document.querySelector(".order-img");
let orderTitle = document.getElementById("order-title");
let orderPrice = document.getElementById("order-price");
let orderDesc = document.getElementById("order-desc");
let activeItemName = "";

// One listener for every "Enquire" button (event delegation)
document.addEventListener("click", function (event) {
  let btn = event.target.closest(".enquire-btn");
  if (!btn) return;

  let card = btn.closest(".menu-item");
  activeItemName = card.querySelector(".menu-head span").textContent;

  orderImg.src = card.querySelector("img").src;
  orderImg.alt = activeItemName;
  orderTitle.textContent = activeItemName;
  orderPrice.textContent = card.querySelector(".price").textContent;
  orderDesc.textContent = card.querySelector(".desc").textContent;

  orderModal.classList.add("open");
});

document.querySelector(".order-close").addEventListener("click", function () {
  orderModal.classList.remove("open");
});

// Click on the dark background also closes it
orderModal.addEventListener("click", function (event) {
  if (event.target === orderModal) orderModal.classList.remove("open");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") orderModal.classList.remove("open");
});

let toast = document.getElementById("toast");
let toastMsg = document.getElementById("toast-msg");
let toastTimer;

function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2500);
}

document.getElementById("order-confirm").addEventListener("click", function () {
  orderModal.classList.remove("open");
  showToast("Enquiry sent for " + activeItemName + "! We will reply by email.");
});

// 11. NEWSLETTER FORM (mock - nothing is sent)
document.getElementById("newsletter-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let input = document.getElementById("newsletter-email");
  let msg = document.getElementById("newsletter-msg");
  let valid = validateEmail(input.value.trim());

  msg.classList.toggle("msg-error", !valid);
  if (valid) {
    msg.textContent = "Thanks for subscribing! Plant tips are on the way. 🌿";
    input.value = "";
  } else {
    msg.textContent = "Please enter a valid email address.";
  }
});
