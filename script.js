document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("random-button");
  let urls = [];

  fetch("urls.json")
    .then(response => response.json())
    .then(data => {
      urls = data;
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
