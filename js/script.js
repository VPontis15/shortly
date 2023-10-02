"use strict";

const navBtn = document.querySelector(".navBtn");
const navbar = document.querySelector(".navbar");

navBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
