"use strict";
const body = document.querySelector("body");
const modal = document.querySelector(".popup");
const closeButtons = document.querySelectorAll(".close__button");
const popupButton = document.querySelector(".popup__button");
const scrollDown = document.querySelector(".scroll__down");
let isOpened = false;

const openModal = () => {
  if (modal) {
    modal.classList.add("isActive");
    body.style.overflow = "hidden";
  }
};

const closeModal = () => {
  if (modal) {
    modal.classList.remove("isActive");
    body.style.overflow = "initial";
  }
};

// Open modal on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100 && !isOpened) {
    isOpened = true;
    if (scrollDown) scrollDown.style.display = "none";
    openModal();
  }
});

// Open modal on login link click
document.querySelectorAll("a[href='#']").forEach((link) => {
  if (link.textContent.toLowerCase().includes("log in")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      isOpened = true;
      openModal();
    });
  }
});

// Open modal on popup button click
if (popupButton) {
  popupButton.addEventListener("click", () => {
    isOpened = true;
    openModal();
  });
}

// Close modal on close button click
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    isOpened = false;
    closeModal();
  });
});
    