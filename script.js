document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("random-button");
  const urlList = document.getElementById("url-list");
  let urls = [];

  fetch("urls.json")
    .then(response => response.json())
    .then(data => {
      urls = data;

      urls.forEach(url => {
        const urlElement = document.createElement("p");
        urlElement.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
        urlListDiv.appendChild(urlElement);
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
