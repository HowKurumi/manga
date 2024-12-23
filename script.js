document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("random-button");
  const urlList = document.getElementById("url-list");
  let urls = [];

  fetch("urls.json")
    .then(response => response.json())
    .then(data => {
      urls = data;

      urls.forEach(url => {
        fetchImage(url).then(imageUrl => {
          const urlElement = document.createElement("div");
          const img = document.createElement("img");
          img.src = imageUrl;
          img.alt = "Cover";
          img.style.width = "100%";
          img.style.height = "auto";

          urlElement.appendChild(img);
          urlList.appendChild(urlElement);
        }).catch(error => {
          console.error(`Error fetching image from ${url}:`, error);
        });
      });
    })
    .catch(error => console.error("Error loading URLs:", error));

  button.addEventListener("click", () => {
    if (urls.length > 0) {
      const randomIndex = Math.floor(Math.random() * urls.length);
      window.location.href = urls[randomIndex];
    } else {
      alert("No URLs available!");
    }
  });
});

async function fetchImage(url) {
  const response = await fetch(url);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const imgElements = doc.querySelectorAll("img");
  const imgElement = imgElements[1];

  if (imgElement) {
    return imgElement.src;
  } else {
    throw new Error("No image found at the specified index");
  }
}