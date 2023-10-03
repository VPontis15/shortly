"use strict";

const navBtn = document.querySelector(".navBtn");
const navbar = document.querySelector(".navbar");
const submit = document.getElementById("submit");
const linksContainer = document.querySelector(".links-container");
let url;
let links;

navBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

const api = async function (url) {
  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await response.json();
    let html = ` <div class="row links-rows">
            <p class="font-bold text-black">${data.result.original_link}</p>
            <div class="flex gap-4 items-center">
              <p class="link short-link">${data.result.short_link}</p>
              <button class="copy-btn bg-cyan">Copy</button>
            </div>
          </div>`;

    links = document.querySelectorAll(".links-rows");
    if (links.length < 3) {
      linksContainer.insertAdjacentHTML("afterbegin", html);
    } else {
      linksContainer.removeChild(links[2]);
      linksContainer.insertAdjacentHTML("afterbegin", html);
    }
    // console.log(links.length);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  url = document.getElementById("url").value;
  api(url);
});

linksContainer.addEventListener("click", (e) => {
  let copyBtn = document.querySelectorAll(".copy-btn ");
  let current;
  [...copyBtn].forEach((btn) => {
    if (e.target === btn) {
      current = e.target;

      let shortLink = current.nextSibling.parentElement.children[0].innerText;
      btn.textContent = "✔ Copied";
      navigator.clipboard.writeText(shortLink);
    }
  });
  {
  }
});
