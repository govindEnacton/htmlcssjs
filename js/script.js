// 1. CAROUSEL
import { galleryData, menuData, testiData, faqData } from "./data.js";

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
