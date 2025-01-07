document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("random-button");
  const urlList = document.getElementById("url-list");
  let urls = [];

  fetch("urls.json")
    .then(response => response.json())
    .then(data => {
      urls = data;

      urls.forEach(url => {
        const className = "cover";
        const imageUrl = fetchImage(url, className);

        imageUrl.then(imgUrl => {
          const imgElement = document.createElement("img");
          imgElement.src = imgUrl;
          imgElement.alt = "image";
          imgElement.style.width = "200px";
          imgElement.style.cursor = "pointer";

          imgElement.addEventListener("click", () => {
            window.location.href = url;
          });

          urlList.appendChild(imgElement);
        });
      });
    })
    .catch(error => console.error("Error loading URLs:", error));

  function fetchImage(url, className) {
    return fetch("https://manga-image-fetcher.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url, class_name: className })
    })
    .then(response => response.json())
    .then(data => {
      if (data.image_url) {
        return data.image_url;
      } else {
        throw new Error("Image not found");
      }
    })
    .catch(error => {
      console.error("Error fetching image:", error);
      return "";
    });
  }

  button.addEventListener("click", () => {
    if (urls.length > 0) {
      const randomIndex = Math.floor(Math.random() * urls.length);
      window.location.href = urls[randomIndex];
    } else {
      alert("No URLs available!");
    }
  });
});

