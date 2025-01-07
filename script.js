document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("random-button");
  const urlList = document.getElementById("url-list");
  let urls = [];

  fetch("urls.json")
    .then(response => response.json())
    .then(data => {
      urls = data;

      urls.forEach(url => {
        displayImage(url);
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

  function displayImage(url) {
    const className = "cover";

    fetch("https://manga-image-fetcher.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, class_name: className })
    })
      .then(response => response.json())
      .then(data => {
        if (data.image_url) {
          const imgElement = document.createElement("img");
          imgElement.src = data.image_url;
          imgElement.alt = "image";
          imgElement.style.cursor = "pointer";

          imgElement.addEventListener("click", () => {
            window.location.href = url;
          });

          urlList.appendChild(imgElement);
        } else {
          alert("Image not found for this URL.");
        }
      })
      .catch(error => console.error("Error fetching image:", error));
  }
});
