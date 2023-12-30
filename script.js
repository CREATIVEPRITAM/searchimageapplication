const accessKey = "VqIPoCsqpSfJmOIqKOXltTl_z3oWb5f4EktwxrbTesw";
const APIKey = "u2fxGPrXaLidNfNNIcoX83P9LzOPEUyzTiY8V1h8kXHcwICy91I8V3ds";
const formEl = document.querySelector("form");
const inputEl = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.querySelector("#show-more-button");

// console.log(showMoreBtn);
let InputData = "";
// let page = 1;

// const urfjk = https://api.unsplash.com/search/photos?query=canada&client_id=VqIPoCsqpSfJmOIqKOXltTl_z3oWb5f4EktwxrbTesw
async function searchImages() {
  try {
    InputData = inputEl.value;
    const URL = `https://api.unsplash.com/search/photos?query=${InputData}&client_id=${accessKey}`;
    const response = await fetch(URL);
    const data = await response.json();
    const results = data.results;
    console.log(response);
    if (!response.status === 2000) {
      throw new Error(`${response.message} ${response.error}`);
    }
    

    if (page === 1) {
      searchResults.innerHTML = "";
    }
    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });
    // page++;
    // if (page > 1) {
    //   showMoreBtn.style.display = "block";
    // }
  } catch (error) {

    searchResults.innerHTML = error;
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

// showMoreBtn.addEventListener("click", (event) => {
//   console.log("hello show more button");
//   searchImages();
// });
