document.addEventListener("DOMContentLoaded", async () => {
  const authorSelect = document.getElementById("authorSelect");
  const imageGrid = document.getElementById("imageGrid");

  const fetchImages = async () => {
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createCard = (image) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${image.download_url}" alt="${image.author}">
            <h3>${image.author}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ante leo. Phasellus justo nulla, dictum ac dictum sed, mattis eu nisi</p>
        `;
    return card;
  };

  const populateDropdown = (authors) => {
    const uniqueAuthors = [...new Set(authors)];
    uniqueAuthors.forEach((author) => {
      const option = document.createElement("option");
      option.value = author;
      option.textContent = author;
      authorSelect.appendChild(option);
    });
  };

  const filterImagesByAuthor = (images, author) => {
    return images.filter((image) => author === "" || image.author === author);
  };

  const displayImages = (images) => {
    imageGrid.innerHTML = ""; // Clear existing images
    images.forEach((image) => {
      const card = createCard(image);
      imageGrid.appendChild(card);
    });
  };

  // Initial load of data
  const images = await fetchImages();
  const authors = images.map((image) => image.author);

  populateDropdown(authors);
  displayImages(images);

  // Add event listener for dropdown
  authorSelect.addEventListener("change", (event) => {
    const selectedAuthor = event.target.value;
    const filteredImages = filterImagesByAuthor(images, selectedAuthor);
    displayImages(filteredImages);
  });
});
