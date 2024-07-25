// version.js
const currentVersion = "1.27"; // Store the version number here

// Function to update HTML elements with the version number
function updateVersionInHTML() {
  const versionElements = document.querySelectorAll(".version-number");
  versionElements.forEach(element => {
    element.textContent = currentVersion;
  });
}

// Call the function to update the version when the page loads
window.onload = updateVersionInHTML;